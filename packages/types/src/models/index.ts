import {
  Team as TeamGen,
  TeamProvider as TeamProviderGen,
} from "@lefthoek/graphql-schema";
import { ProviderType } from "enums";

export type SlackOAuthData = {
  access_token: string;
  team: {
    id: string;
    name: string;
  };
};

export type AuthLookupData = {
  provider_id: string;
  team_id: string;
  access_token: string;
  provider_type: ProviderType;
};

export type Team = TeamGen;
export type TeamProvider = TeamProviderGen;
