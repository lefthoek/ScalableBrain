import {
  Team as TeamGen,
  TeamProvider as TeamProviderGen,
} from "@lefthoek/graphql-schema";

export type SlackOAuthData = {
  access_token: string;
  team: {
    id: string;
    name: string;
  };
};

export type Team = TeamGen;
export type TeamProvider = TeamProviderGen;
