import TeamRepo from "./teamRepo";
import S3Adapter from "./s3Adapter";
import {
  TeamAddedEvent,
  LefthoekEventType,
  StatusCodes,
  FSAdapter,
} from "./types";
import eventBus from "./eventBus";

const initTeam = async (event: TeamAddedEvent) => {
  const { DATALAKE_BUCKET: bucket_name } = process.env;
  const { team, platform_type } = event.detail;
  const adapter = new S3Adapter({ bucket_name });
  const teamRepo = new TeamRepo({ team_id: team.id, adapter, platform_type });
  const detail = await teamRepo.init(event.detail);

  return await eventBus.put({
    detailType: LefthoekEventType.TEAM_REPO_INITIATED,
    detail,
  });
};

export default initTeam;
