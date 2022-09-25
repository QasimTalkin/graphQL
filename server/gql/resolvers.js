const { Users } = require('../models');
const { AuthenticationError } = require('apollo-server-express');
const { Reactions } = require('../models');


const resolvers = {
  Query: {
    sayHello: () => 'Hello World!',
    user: async () => {
      return Users.find();
    }
  }
}
module.exports = resolvers;