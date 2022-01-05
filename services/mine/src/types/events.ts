import { ServiceEventType } from "./enums";
import { ProviderType } from "@lefthoek/types";
import type { Event, Team } from "@lefthoek/types";

import { TeamRepoMetaData, ChannelRepoMetaData } from "./models";

export type ServiceEventPayload =
  | Team
  | TeamRepoMetaData
  | ChannelRepoMetaData
  | {};

export interface SEvent extends Event {
  detailType: ServiceEventType;
  detail: ServiceEventPayload;
}

export interface TeamRepoInitiatedEvent extends SEvent {
  detailType: ServiceEventType.TEAM_REPO_INITIATED;
  detail: Team;
}
export interface ChannelRawDataUpdatedEvent extends SEvent {
  detailType: ServiceEventType.CHANNEL_RAW_DATA_UPDATED;
  detail: ChannelRepoMetaData;
}

export interface ChannelRepoAlreadyUpdatingEvent extends SEvent {
  detailType: ServiceEventType.CHANNEL_REPO_ALREADY_UPDATING;
  detail: {};
}

export interface ChannelReposInitiatedEvent extends SEvent {
  detailType: ServiceEventType.CHANNEL_REPOS_INITIATED;
  detail: {};
}

export interface ChannelRepoInitiatedEvent extends SEvent {
  detailType: ServiceEventType.CHANNEL_REPO_INITIATED;
  detail: ChannelRepoMetaData;
}

export type ServiceEvent =
  | TeamRepoInitiatedEvent
  | ChannelRepoInitiatedEvent
  | ChannelReposInitiatedEvent
  | ChannelRawDataUpdatedEvent
  | ChannelRepoAlreadyUpdatingEvent;
