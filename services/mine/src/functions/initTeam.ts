import TeamRepo from "@stores/teamRepo";
import { S3Adapter } from "@lefthoek/adapters";
import type { TeamAddedEvent } from "@lefthoek/types";
import { ServiceEventType } from "@service_types/enums";

const { DATALAKE_BUCKET: bucket_name } = process.env;

const initTeam = async (event: TeamAddedEvent) => {
  const team = event.detail;
  const adapter = new S3Adapter({ bucket_name });
  const teamRepo = new TeamRepo({ team, adapter });
  const detail = await teamRepo.init(event.detail);

  return {
    detailType: ServiceEventType.TEAM_REPO_INITIATED,
    detail,
  };
};

export default initTeam;
