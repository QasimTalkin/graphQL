const { Users, Posts} = require('../models');
const { AuthenticationError } = require('apollo-server-express');
const { Reactions } = require('../models');


const resolvers = {
  Query: {
    users: async () => {
      let result = await Users.find()
                    .select('-__v -password')
                    .populate('posts')
                    .populate('following')
      return result
    },
    userPosts: async (parent, { userName }) => {
      let params = userName ? {userName} : {}
      return Posts.find(params).sort({ createdAt: -1})
    },
    user: async (parent, { id, userName }) => {
      let params = id ? { _id: id } : userName ? { userName } : null
      let result = await Users.findOne(params)
                    .select('-__v -password')
                    .populate('posts')
                    .populate('following')
      return result
    },
    
    posts: async () => {
      let result = await Posts.find();
      
      return result
    },
    post: async (parent, { id, userName }) => {
      let params = id ? { _id: id } :  null
      return Posts.findOne(params).populate('reactions');
    }
  },
  
  Mutation: {
    createUser: async (parent, args) => {
      const createdUser = await Users.create(args);
      // const token = createdUser.signToken();
      return createdUser 
    },
    
    login: async (parent, { email, password }) => {
      const user = await Users.findOne({ email });
      if (!user) {
        throw new AuthenticationError('Incorrect Credentials');
      }
      
      const correctPw = await user.isCorrectPassword(password);
      
      if (!correctPw) {
        throw new AuthenticationError('Incorrect Credentials');
      }
      
      return user;
    }
  }
}


module.exports = resolvers;