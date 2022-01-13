import { S3Adapter, serviceHandlerWrapper } from "@lefthoek/adapters";
import { TeamRepo } from "@lefthoek/stores";
import { TeamAddedEvent, TeamRepoInitiatedEvent } from "@service_types/events";
import { ServiceEventType } from "@service_types/enums";

const { RAW_DATA_BUCKET: bucket_name } = process.env;
const { TEAM_REPO_INITIATED } = ServiceEventType;

type IncomingEvent = TeamAddedEvent;
type OutgoingEvents = TeamRepoInitiatedEvent;

const initTeam: (event: IncomingEvent) => Promise<OutgoingEvents> = async (
  event
) => {
  const adapter = new S3Adapter({ bucket_name });
  const teamRepo = new TeamRepo({ adapter });
  const detail = await teamRepo.init(event.detail);

  return {
    detailType: TEAM_REPO_INITIATED,
    detail,
  };
};

export default serviceHandlerWrapper<IncomingEvent, OutgoingEvents>(initTeam);
