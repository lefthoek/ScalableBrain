import AWS from "aws-sdk";
import { makeExecutableSchema } from "@graphql-tools/schema";
import { makeServer } from "graphql-lambda-subscriptions";

const {
  WS_CONNECTIONS_TABLE: connections,
  WS_SUBSCRIPTIONS_TABLE: subscriptions,
} = process.env;

const ddb = new AWS.DynamoDB();

const typeDefs = `
  type Query {
    add(x: Int, y: Int): Int
  }
`;

const resolvers = {
  Query: {
    add: async (_: any, obj: { x: number; y: number }) => {
      const { x, y } = obj;
      return x * y;
    },
  },
};

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

const subscriptionServer = makeServer({
  dynamodb: ddb,
  schema,
  onConnect: ({ event }) => {
    console.log(JSON.stringify(event, null, 2));
  },
  onDisconnect: ({ event }) => {
    console.log(JSON.stringify(event, null, 2));
  },
  onConnectionInit: ({ message }) => {
    console.log(JSON.stringify(message, null, 2));
    return message;
  },
  tableNames: {
    connections,
    subscriptions,
  },
});

const websockets = subscriptionServer.webSocketHandler;
export { websockets };
