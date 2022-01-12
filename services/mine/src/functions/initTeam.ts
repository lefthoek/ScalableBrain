import { S3Adapter } from "@lefthoek/adapters";
import { TeamRepo } from "@lefthoek/stores";
import type { TeamAddedEvent } from "@lefthoek/types";
import { TeamRepoInitiatedEvent } from "@service_types/events";
import { ServiceEventType } from "@service_types/enums";

const { RAW_DATA_BUCKET: bucket_name } = process.env;
const { TEAM_REPO_INITIATED } = ServiceEventType;

const initTeam: (event: TeamAddedEvent) => Promise<TeamRepoInitiatedEvent> =
  async (event) => {
    const adapter = new S3Adapter({ bucket_name });
    const teamRepo = new TeamRepo({ adapter });
    const detail = await teamRepo.init(event.detail);

    return {
      detailType: TEAM_REPO_INITIATED,
      detail,
    };
  };

export default initTeam;
