import awsLambdaFastify from "aws-lambda-fastify";
import cors from "fastify-cors";

import fastify from "fastify";
import mercurius from "mercurius";

const app = fastify();

app.register(cors, {
  origin: "*",
});

const schema = `
  type Query {
    add(x: Int, y: Int): Int
  }
  type Mutation {
    increase: Int
  }
`;

let x = 0;

const resolvers = {
  Query: {
    add: async (_: any, obj: { x: number; y: number }) => {
      const { x, y } = obj;
      return x * y;
    },
  },
  Mutation: {
    increase: async () => {
      return x + 1;
    },
  },
};

app.register(mercurius, {
  schema,
  resolvers,
});

app.get("/", async function (_req, reply) {
  const query = "{ add(x: 2, y: 2) }";
  return reply.graphql(query);
});

const graphql = awsLambdaFastify(app);

export { graphql };
