const typeDefs = `
  type Query {
    add(x: Int, y: Int): Int
  }
  type Mutation {
    increase: Int
  }
`;

export default typeDefs;
