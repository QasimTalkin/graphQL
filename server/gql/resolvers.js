const { User } = require('../models');

const resolvers = {
  Query: {
    userName: () => 'John Doe',
    users: async () => { 
      const users = await User.find();
      return users;
    }
  },
  Mutation: {
    addUser: async (parent, args) => {
      const user = await User.create(args);
      return user;
    }
  }
}
module.exports = resolvers;