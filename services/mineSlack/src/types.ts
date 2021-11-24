export type SlackOAuthQueryString = {
  queryStringParameters: {
    code: string;
  };
};

export type SlackOAuthData = {
  access_token?: string;
  team: {
    id: string;
    name: string;
  };
};

export enum PlatformType {
  SLACK = "SLACK",
}

export type SlackChannelData = {
  id: string;
  is_archived: boolean;
};

export interface Event {
  detailType: string;
  detail: any;
}

export interface EventBus<E extends Event> {
  put: (event: E) => Promise<E["detail"]>;
}
export enum LefthoekEventType {
  TEAM_ADDED = "TEAM_ADDED",
  CHANNEL_RAW_DATA_UPDATED = "CHANNEL_RAW_DATA_UPDATED",
  TEAM_REPO_INITIATED = "TEAM_REPO_INITIATED",
  CHANNEL_REPO_INITIATED = "CHANNEL_REPO_INITIATED",
  CHANNEL_REPOS_INITIATED = "CHANNEL_REPOS_INITIATED",
  CHANNEL_REPO_ALREADY_UPDATING = "CHANNEL_ALREADY_UPDATING",
}

export type TeamRepoMetaData = {
  team_id: string;
  team_name?: string;
  platform_type: PlatformType;
  access_token?: string;
};

export type ChannelRepoMetaData = TeamRepoMetaData & {
  latest_chunk?: string;
  channel_id: string;
};

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

export enum StatusCodes {
  SUCCESS = "success",
  INFO = "info",
  ERROR = "error",
}

export interface FSAdapter {
  touch: ({ path }: { path: string }) => Promise<string>;
  writeFile: ({ path, data }: { path: string; data?: any }) => Promise<string>;
  deleteFile: ({ path }: { path: string }) => Promise<string>;
  writeJSON: ({ path, data }: { path: string; data: any }) => Promise<string>;
  readJSON: ({ path }: { path: string }) => Promise<any>;
}

export type LefthoekEventBus = EventBus<LefthoekEvent>;
