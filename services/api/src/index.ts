import awsLambdaFastify from "aws-lambda-fastify";
import app from "./graphql";

const proxy = awsLambdaFastify(app);

exports.graphql = proxy;

const {
  WS_CONNECTIONS_TABLE: connections,
  WS_SUBSCRIPTIONS_TABLE: subscriptions,
} = process.env;

exports.websockets = async () => {
  console.log(connections, subscriptions);
  return {
    statusCode: 200,
    body: JSON.stringify(process.env, null, 2),
  };
};
