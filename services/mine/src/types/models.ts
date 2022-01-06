import { ProviderType } from "@lefthoek/types";

export type SlackChannelData = {
  id: string;
  is_archived: boolean;
};

export type TeamRepoMetaData = {
  provider_id: string;
  team_name?: string;
  provider_type: ProviderType;
};

export type ChannelRepoMetaData = TeamRepoMetaData & {
  latest_chunk?: string;
  channel_id: string;
};
