import { subscribe } from "graphql-lambda-subscriptions";

let x = 0;

const resolvers = {
  Query: {
    add: async (_: any, obj: { x: number; y: number }) => {
      const { x, y } = obj;
      return x * y;
    },
  },
  Mutation: {
    increase: async () => {
      return (x += 1);
    },
  },
  Subscription: {
    count: {
      subscribe: subscribe("COUNT_UPDATED"),
      resolve: () => {
        return (x += 1);
      },
    },
  },
};

export default resolvers;
