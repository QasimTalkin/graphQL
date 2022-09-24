const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Query {
    userName: String,
    users: [User]
  },
  type Mutation {
    addUser(userName: String!, firstName: String, lastName: String, email: String, password: String!): User
  },
`;

module.exports = typeDefs;
