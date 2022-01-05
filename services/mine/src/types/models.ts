import { PlatformType } from "@lefthoek/types";

export type SlackChannelData = {
  id: string;
  is_archived: boolean;
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
