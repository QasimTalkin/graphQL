const { gql } = require('apollo-server-express');
const { Reactions } = require('../models');



const typeDefs = gql`
  type User {
    _id: ID
    userName: String
    email: String
    posts: [Post]
    following: [User]
    friendCount: Int
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
    createdAt: String
    reactions: [Reaction]
  }
  
  type Query {
    users: [User]
    user(id:ID, userName: String): User
    
    posts: [Post]
    post(id: ID!): Post
    userPosts(userName: String): [Post]
  }
  
  type Auth {
    token: ID!
    user: User
  }  
  type Mutation{
    createUser(userName:String!, email:String!, password:String!): Auth
    updateUser(userName:String!, email:String, password:String): Auth
    deleteUser(userName:String!, password:String): Auth
    
    addPost(title:String!, postSnippet:String!, language:String!): Post
    addReaction(postId:ID!, reactionBody:String!): Post
    followUser(userName:String!): User
    login(email:String!, password:String!): Auth
  }
`;

module.exports = typeDefs;
