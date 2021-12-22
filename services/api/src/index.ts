import awsLambdaFastify from "aws-lambda-fastify";
import { makeServer } from "graphql-lambda-subscriptions";
import AWS from "aws-sdk";
import app from "./graphql";

const proxy = awsLambdaFastify(app);
const ddb = new AWS.DynamoDB();

exports.graphql = proxy;

const {
  WS_CONNECTIONS_TABLE: connections,
  WS_SUBSCRIPTIONS_TABLE: subscriptions,
} = process.env;

const schema = `
  type Query {
    add(x: Int, y: Int): Int
  }
`;

const subscriptionServer = makeServer({
  dynamodb: ddb,
  schema,
  tableNames: {
    connections,
    subscriptions,
  },
});
exports.websockets = subscriptionServer.webSocketHandler;
