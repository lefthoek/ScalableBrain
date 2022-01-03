import { subscribe } from "graphql-lambda-subscriptions";
import { Team } from "@lefthoek/types/dist/models";
import { Resolvers } from "@lefthoek/graphql-schema";

const teamStore = {
  get: async () => {
    return {
      name: "Leftcourse",
      id: "T01K2MPN0JU",
    };
  },
};

const resolvers: Resolvers = {
  Team: {
    name: async ({ name }) => name,
    id: async ({ id }) => id,
  },
  Query: {
    team: teamStore.get(),
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
