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
      let result = await Posts.find()
                    .populate('reactions')
    },
    post: async (parent, { id, userName }) => {
      let params = id ? { _id: id } : userName ? { userName } : null
      return Posts.findOne(params).populate('reactions');
    }
  }
}
module.exports = resolvers;