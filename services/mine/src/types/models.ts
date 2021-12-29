import { PlatformType } from "./enums";

export type SlackChannelData = {
  id: string;
  is_archived: boolean;
};

export type SlackOAuthData = {
  access_token?: string;
  team: {
    id: string;
    name: string;
  };
};

export type TeamRepoMetaData = {
  team_id: string;
  team_name?: string;
  platform_type: PlatformType;
};

export type ChannelRepoMetaData = TeamRepoMetaData & {
  latest_chunk?: string;
  channel_id: string;
};
