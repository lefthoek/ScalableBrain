import { subscribe } from "graphql-lambda-subscriptions";
import { Team, Resolvers, PlatformType } from "@lefthoek/types";

const teamStore = {
  get: async () => {
    return {
      name: "Leftcourse",
      id: "T01K2MPN0JU",
      providers: [
        {
          type: PlatformType.Slack,
          name: "Leftcourse",
          id: "T01K2MPN0JU",
          access_token: "",
        },
      ],
    };
  },
};

const resolvers: Resolvers = {
  TeamProvider: {
    type: async ({ type }) => type,
    name: async ({ name }) => name,
    id: async ({ id }) => id,
    access_token: async () => "NONE OF YOUR BUSINESS",
  },
  Team: {
    name: async ({ name }) => name,
    id: async ({ id }) => id,
    providers: async ({ providers }) => providers,
  },
  Query: {
    team: async () => await teamStore.get(),
  },
  Subscription: {
    addedTeams: {
      subscribe: subscribe("TEAM_ADDED"),
      resolve: ({ payload }: { payload: Team }) => {
        return payload;
      },
    },
    updatedTeam: {
      subscribe: subscribe("TEAM_ADDED", {
        filter: (_, { id }: { id: string }) => ({
          id,
        }),
      }),
      resolve: ({ payload }: { payload: Team }) => {
        return payload;
      },
    },
  },
};

export default resolvers;
