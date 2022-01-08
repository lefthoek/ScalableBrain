import awsLambdaFastify from "aws-lambda-fastify";
import { makeExecutableSchema } from "@graphql-tools/schema";
import cors from "fastify-cors";
import fastify from "fastify";
import mercurius from "mercurius";
import typeDefs from "@lefthoek/graphql-schema";
import resolvers from "../resolvers";
import { TeamRepo } from "@lefthoek/stores";
import { S3Adapter } from "@lefthoek/adapters";

const { TEAM_STORE: bucket_name } = process.env;

const adapter = new S3Adapter({ bucket_name });
const teamRepo = new TeamRepo({ adapter });

const app = fastify();

app.register(cors, {
  origin: "*",
});

const schema = makeExecutableSchema({
  typeDefs,
});

const context = () => ({
  teamRepo,
});

app.register(mercurius, { schema, resolvers, context });

const graphql = awsLambdaFastify(app);

export { graphql };
