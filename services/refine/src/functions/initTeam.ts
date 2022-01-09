import { S3Adapter } from "@lefthoek/adapters";
import { TeamRepo } from "@lefthoek/stores";
import type { TeamAddedEvent, TeamAuthenticatedEvent } from "@lefthoek/types";
import { LefthoekEventType } from "@lefthoek/types";

const { KNOWLEDGE_BASE_BUCKET: bucket_name } = process.env;
const { TEAM_ADDED } = LefthoekEventType;

const initTeam: (event: TeamAuthenticatedEvent) => Promise<TeamAddedEvent> =
  async (event) => {
    const adapter = new S3Adapter({ bucket_name });
    const teamRepo = new TeamRepo({ adapter });
    const detail = await teamRepo.init(event.detail);

    return {
      detailType: TEAM_ADDED,
      detail,
    };
  };

export default initTeam;
