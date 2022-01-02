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
      subscribe: subscribe("TEAM_ADDED", {
        filter: (...args) => {
          console.log(JSON.stringify(args, null, 2));
          return true;
        },
      }),
      resolve: ({ payload }: any) => {
        return `${payload.name} has registered to lefthoek`;
      },
    },
  },
};

export default resolvers;
