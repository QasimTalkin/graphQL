const {Schema, model } = require('mongoose');
const reactionSchema = require('./Reactions');

const postSchema = new Schema(
   {
      title: {type: String, required: true},
      postSnippet: {type: String, required: true},
      upVotes: {type: Number, required: true},
      downVotes: {type: Number, required: true}, 
      language: {type: String, required: true},
      createdAt: {type: Date, default: Date.now, get: (timestamp) => dateFormat(timestamp)},
      userName: {
        type: String, 
        required: true
      },
      reactions: [reactionSchema]
   }
);  


const Post = model('Post', postSchema);

module.exports = Post;
