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

export enum LefthoekEventType {
  TEAM_ADDED = "TEAM_ADDED",
  CHANNEL_RAW_DATA_UPDATED = "CHANNEL_RAW_DATA_UPDATED",
  TEAM_REPO_INITIATED = "TEAM_REPO_INITIATED",
  CHANNEL_REPO_INITIATED = "CHANNEL_REPO_INITIATED",
  CHANNEL_REPOS_INITIATED = "CHANNEL_REPOS_INITIATED",
  CHANNEL_REPO_ALREADY_UPDATING = "CHANNEL_ALREADY_UPDATING",
}
