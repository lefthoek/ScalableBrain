import TeamRepo from "@stores/teamRepo";
import { S3Adapter } from "@lefthoek/adapters";
import type { TeamAddedEvent } from "@lefthoek/types";
import { ServiceEventType } from "@service_types/enums";

const { RAW_DATA_BUCKET: bucket_name } = process.env;
const { TEAM_REPO_INITIATED } = ServiceEventType;

const initTeam = async (event: TeamAddedEvent) => {
  const team = event.detail;
  const adapter = new S3Adapter({ bucket_name });
  const teamRepo = new TeamRepo({ team, adapter });
  const detail = await teamRepo.init(event.detail);

  return {
    detailType: TEAM_REPO_INITIATED,
    detail,
  };
};

export default initTeam;
