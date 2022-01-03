import awsLambdaFastify from "aws-lambda-fastify";
import { makeExecutableSchema } from "@graphql-tools/schema";
import cors from "fastify-cors";
import fastify from "fastify";
import mercurius from "mercurius";
import typeDefs from "@lefthoek/graphql-schema";
import resolvers from "../resolvers";
import { TeamStore } from "@lefthoek/stores";

const teamStore = new TeamStore();

const app = fastify();

app.register(cors, {
  origin: "*",
});

const schema = makeExecutableSchema({
  typeDefs,
});

const context = () => ({
  teamStore,
});

app.register(mercurius, { schema, resolvers, context });

const graphql = awsLambdaFastify(app);

export { graphql };
