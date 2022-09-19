const {schema, model } = require('mongoose');

const postSchema = new schema(
   {
      title: {type: String, required: true},
      postSnippet: {type: String, required: true},
      upVotes: {type: Number, required: true},
      downVotes: {type: Number, required: true}, 
      language: {type: String, required: true},
      createdAt: {type: Date, default: Date.now, get: (timestamp) => dateFormat(timestamp)},
      userName
   }
);  


const Post = model('Post', postSchema);

modules.exports = Post;
