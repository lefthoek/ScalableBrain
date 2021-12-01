import TeamRepo from "@stores/teamRepo";
import S3Adapter from "@adapters/s3Adapter";
import { LefthoekEventType } from "@service_types/enums";

import type { TeamAddedEvent } from "@service_types/events";

const { DATALAKE_BUCKET: bucket_name } = process.env;

const initTeam = async (event: TeamAddedEvent, services: any) => {
  const { team, platform_type } = event.detail;
  const adapter = new S3Adapter({ bucket_name });
  const teamRepo = new TeamRepo({ team_id: team.id, adapter, platform_type });

  const detail = await teamRepo.init(event.detail);

  return await services.eventBus.put({
    detailType: LefthoekEventType.TEAM_REPO_INITIATED,
    detail,
  });
};

export default initTeam;
