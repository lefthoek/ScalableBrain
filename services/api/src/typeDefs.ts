const typeDefs = `
  type Query {
    add(x: Int, y: Int): Int
  }
  type Mutation {
    increase: Int
  }
  type Subscription {
    addedTeam: String!
    updatedTeam(id: String!): String!
  }
`;

export default typeDefs;
