const { Schema } = require('mongoose');

const reactionSchema = new Schema({
    reactionBody : {
      type: String,
      required: true
    }, 
    userName: {
      type: String,
      required: true
    }, 
    createAt: {
      type: Date,
      default: Date.now, 
      get: timestamp => dateFormat(timestamp)
    } 
  },
  {
    toJSON: {
      getters: true
    }
  }
);

module.exports = reactionSchema;