import { subscribe } from "graphql-lambda-subscriptions";
import { Team } from "@lefthoek/types/dist/models";
import { Resolvers } from "@lefthoek/graphql-schema";

const resolvers: Resolvers = {
  Team: {
    name: async ({ name }) => name.toUpperCase(),
    id: async ({ id }) => id,
  },
  Query: {
    team: async (_: any) => {
      return {
        name: "offcourse",
        id: "1233px",
      };
    },
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
