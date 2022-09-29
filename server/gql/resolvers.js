const { Users, Posts} = require('../models');
const { AuthenticationError } = require('apollo-server-express');
const { Reactions } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    users: async (p, args, context) => {    
      return (context.user) ? 
      await Users.find({})
        .select('-__v -password')
        .populate('posts')
        .populate('following') : 
      new AuthenticationError('You need to be logged in!');
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
      const user = await Users.create(args);

      return { user, token:signToken(user)};
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
      return { user, token:signToken(user)};
    },
    
    addPost: async (parent, args, context) => {
      return (context.user) ?
      await Posts.create({...args, userName: context.user.userName}) :
      new AuthenticationError('You need to be logged in!');
    },
    
    addReaction: async (parent, { postId, reactionBody }, context) => {
      return (context.user) ?
      await Posts.findOneAndUpdate( {_id: postId}, { $push: { reactions: { reactionBody, userName: context.user.userName } } }, { new: true, runValidators: true }) :
      new AuthenticationError('You need to be logged in!');
    },
    
    followUser: async (parent, { userName }, context) => {
      const userID = await Users.findOne({ userName });
      // if no user is found, send an error
      if (!userID) {
        throw new AuthenticationError('Cannot find a user with this username!');
      }
      const { _id } = userID;
      console.log(_id);

      return (context.user) ?
      await Users.findOneAndUpdate( {_id: context.user._id}, { $addToSet: { following: _id } }, { new: true, runValidators: true }).populate('following') :
      new AuthenticationError('You need to be logged in!');
    }
  }
}


module.exports = resolvers;