const { gql } = require('apollo-server-express');
const { Reactions } = require('../models');



const typeDefs = gql`
type User {
  userName: String
  email: String
  }
  
  type Query {
    sayHello: String
    user: [User]
  }
`;

module.exports = typeDefs;
