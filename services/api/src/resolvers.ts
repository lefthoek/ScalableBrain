import { subscribe } from "graphql-lambda-subscriptions";
import { Team, Resolvers } from "@lefthoek/types";

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
    team: async (_, args, { teamRepo }) => {
      console.log(args);
      return await teamRepo.fetch({ id: args.id });
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
        filter: (_, { team_id }: { team_id: string }) => ({
          team_id,
        }),
      }),
      resolve: ({ payload }: { payload: Team }) => {
        return payload;
      },
    },
  },
};

export default resolvers;
