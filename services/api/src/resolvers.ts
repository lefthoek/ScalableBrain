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
    count: {
      subscribe: subscribe("TEAM_ADDED"),
      resolve: () => {
        return "A NEW TEAM HAS REGISTERED TO LEFTHOEK";
      },
    },
  },
};

export default resolvers;
