const typeDefs = `
  type Query {
    add(x: Int, y: Int): Int
  }
  type Mutation {
    increase: Int
  }
  type Subscription {
    addedTeam(teamId: String!): String!
  }
`;

export default typeDefs;
