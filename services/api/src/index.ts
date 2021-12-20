import awsLambdaFastify from "aws-lambda-fastify";
import app from "./graphql";

const proxy = awsLambdaFastify(app);

exports.graphql = proxy;
