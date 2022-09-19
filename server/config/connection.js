// connect to mongo db
const mongoose = require('mongoose');
const db = mongoose.connection;
mongoose.connect(`mongodb://localhost:27017/${process.env.DB_NAME || 'codeSnippetsDB' }`, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

module.exports = db;