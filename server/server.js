// set up express server
const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const { typeDefs, resolvers } = require('./gql');
const db = require('./config/connection');
const PORT = process.env.PORT || 4014;

const server = new ApolloServer({
  typeDefs,
  resolvers
});


const app = express();

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/', 
  (re, res) => { res.redirect('http://localhost:'+3000) }
);

// open connection to mongo db, once successful start server
// db.once('open', () => {
//   app.listen(PORT, () => {
//     console.log(`Server is running on PORT: ${PORT}`);
//   });
// });


const startApolloServer = async (typeDefs, resolvers) => {
  await server.start();
  server.applyMiddleware({ app });
  
  db.once('open', () => {
    app.listen(PORT, () => {
      console.log(`Server is running on PORT: ${PORT}`);
    });
  });
  console.log(`Server is running on PORT: ${server.graphqlPath}`);
}

startApolloServer(typeDefs, resolvers);