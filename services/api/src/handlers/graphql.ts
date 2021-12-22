import awsLambdaFastify from "aws-lambda-fastify";
import cors from "fastify-cors";

import fastify from "fastify";
import mercurius from "mercurius";
import typeDefs from "../typeDefs";
import resolvers from "../resolvers";

const app = fastify();

app.register(cors, {
  origin: "*",
});

app.register(mercurius, {
  schema: typeDefs,
  resolvers,
});

app.get("/", async function (_req, reply) {
  const query = "{ add(x: 2, y: 2) }";
  return reply.graphql(query);
});

const graphql = awsLambdaFastify(app);

export { graphql };
