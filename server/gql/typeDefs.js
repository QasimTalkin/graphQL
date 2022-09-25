const { gql } = require('apollo-server-express');
const { Reactions } = require('../models');



const typeDefs = gql`
  type User {
    _id: ID
    userName: String
    email: String
    posts: [Post]
    following: [User]
    }
  
  type Reaction {
    _id: ID
    reactionBody: String
    userName: String
    createdAt: String
  }
  
  type Post {
    _id: ID
    title: String
    postSnippet: String
    upVotes: Int
    downVotes: Int
    userName: String
    reactions: [Reaction]
  }
  type Query {
    users: [User]
    user(id:ID): User
    
    posts: [Post]
    post(id: ID!): Post
    userPosts(userName: String): [Post]
  }
`;

module.exports = typeDefs;
