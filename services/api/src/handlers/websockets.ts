import AWS from "aws-sdk";
import { makeExecutableSchema } from "@graphql-tools/schema";
import { makeServer } from "graphql-lambda-subscriptions";
import typeDefs from "../typeDefs";
import resolvers from "../resolvers";

const {
  WS_CONNECTIONS_TABLE: connections,
  WS_SUBSCRIPTIONS_TABLE: subscriptions,
} = process.env;

const ddb = new AWS.DynamoDB();

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

const testHandler = () => {
  return subscriptionServer.publish({
    topic: "COUNT_UPDATED",
    payload: {},
  });
};

const websockets = subscriptionServer.webSocketHandler;
export { websockets, testHandler };
