import awsLambdaFastify from "aws-lambda-fastify";
import { makeExecutableSchema } from "@graphql-tools/schema";
import cors from "fastify-cors";
import fastify from "fastify";
import mercurius from "mercurius";
import typeDefs from "@lefthoek/graphql-schema";
import resolvers from "../resolvers";

const app = fastify();

app.register(cors, {
  origin: "*",
});

const schema = makeExecutableSchema({
  typeDefs,
});

app.register(mercurius, { schema, resolvers });

const graphql = awsLambdaFastify(app);

export { graphql };
