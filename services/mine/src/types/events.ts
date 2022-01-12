import { ServiceEventType } from "./enums";
import type { Event, Team } from "@lefthoek/types";

import { TeamRepoMetaData, ChannelRepoMetaData } from "./models";

export type ServiceEventPayload =
  | Team
  | TeamRepoMetaData
  | ChannelRepoMetaData
  | Record<string, unknown>;

export type SEvent = Event<ServiceEventType, ServiceEventPayload>;

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
  detail: Record<string, unknown>;
}

export interface ChannelReposInitiatedEvent extends SEvent {
  detailType: ServiceEventType.CHANNEL_REPOS_INITIATED;
  detail: Record<string, unknown>;
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
