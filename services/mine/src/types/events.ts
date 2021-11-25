import { PlatformType, LefthoekEventType } from "./enums";

import {
  SlackOAuthData,
  TeamRepoMetaData,
  ChannelRepoMetaData,
} from "./models";

export interface Event {
  detailType: string;
  detail: any;
}

export type LefthoekEventPayload =
  | SlackOAuthData
  | TeamRepoMetaData
  | ChannelRepoMetaData
  | {};

export interface LHEvent extends Event {
  detailType: LefthoekEventType;
  detail: LefthoekEventPayload;
}

export interface TeamAddedEvent extends LHEvent {
  detailType: LefthoekEventType.TEAM_ADDED;
  detail: SlackOAuthData & { platform_type: PlatformType };
}

export interface ChannelRawDataUpdatedEvent extends LHEvent {
  detailType: LefthoekEventType.CHANNEL_RAW_DATA_UPDATED;
  detail: ChannelRepoMetaData;
}

export interface TeamRepoInitiatedEvent extends LHEvent {
  detailType: LefthoekEventType.TEAM_REPO_INITIATED;
  detail: TeamRepoMetaData;
}

export interface ChannelRepoAlreadyUpdatingEvent extends LHEvent {
  detailType: LefthoekEventType.CHANNEL_REPO_ALREADY_UPDATING;
  detail: {};
}

export interface ChannelReposInitiatedEvent extends LHEvent {
  detailType: LefthoekEventType.CHANNEL_REPOS_INITIATED;
  detail: {};
}

export interface ChannelRepoInitiatedEvent extends LHEvent {
  detailType: LefthoekEventType.CHANNEL_REPO_INITIATED;
  detail: ChannelRepoMetaData;
}

export type LefthoekEvent =
  | TeamAddedEvent
  | TeamRepoInitiatedEvent
  | ChannelRepoInitiatedEvent
  | ChannelReposInitiatedEvent
  | ChannelRawDataUpdatedEvent
  | ChannelRepoAlreadyUpdatingEvent;
