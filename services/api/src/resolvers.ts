import { subscribe } from "graphql-lambda-subscriptions";
import { Team } from "@lefthoek/types/dist/models";

const resolvers = {
  Query: {
    team: async (_: any) => {
      return {
        name: "offcourse",
        id: "1233px",
      };
    },
  },
  Subscription: {
    updatedTeam: {
      subscribe: subscribe("TEAM_ADDED"),
      resolve: ({ payload }: { payload: Team }) => {
        return payload;
      },
    },
    addedTeams: {
      subscribe: subscribe("TEAM_UPDATED", {
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
