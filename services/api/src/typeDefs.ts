const typeDefs = `
  type Query {
    add(x: Int, y: Int): Int
  }
  type Mutation {
    increase: Int
  }
  type Subscription {
    count: Int
  }
`;

export default typeDefs;
