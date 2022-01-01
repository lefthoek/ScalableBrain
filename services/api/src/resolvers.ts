import { subscribe } from "graphql-lambda-subscriptions";

const resolvers = {
  Query: {
    add: async (_: any, obj: { x: number; y: number }) => {
      const { x, y } = obj;
      return x * y;
    },
  },
  Mutation: {
    increase: async () => {
      return 1;
    },
  },
  Subscription: {
    addedTeam: {
      subscribe: subscribe("TEAM_ADDED"),
      resolve: ({ payload }: any) => {
        return `${payload} NEW TEAM HAS REGISTERED TO LEFTHOEK`;
      },
    },
  },
};

export default resolvers;
