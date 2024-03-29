---
marp: true
theme: gaia
style: |
  section.lead h1 {
  text-align: center;
  }
  section.middle li{
  text-align: center;
  }
---
<!-- headingDivider: 2 -->
<!--
theme: gaia
class: lead
-->
# MERN Stack

## GraphQL
* GraphQL is a query language for APIs and a runtime for fulfilling those queries with your existing data.
* giving clients the power to ask for exactly what they need and nothing more. 

## Apollo
* Apollo Server is an open-source, spec-compliant GraphQL server that's compatible with any GraphQL client, including Apollo Client.

## React Router 
* React Router is a collection of navigational components that compose declaratively with your application, allowing you to make your single-page React applications behave more like multi-page applications.

## Concurrently
* Run multiple server and srvice from a single command-line interface.

## JWTs
* JSON Web Tokens, or JWTs, are an alternative to using session cookies for authentication.
* These tokens are signed by the server and can be verified by the server to ensure that they are not tampered with.
* they can also be encrypted to prevent the contents from being read by unauthorized parties. 

## JWT Decode
* jwt-decode is an npm package that helps decode JWTs from their Base64Url encoding.
  
## Faker
* The faker npm package allows you to generate massive amounts of fake data in the development environment of your Node.js applications.

## Nodemon
* The nodemon package simplifies your development environment by automatically restarting your Node.js applications when file changes in the directory are detected.

# GraphQL
A number of years ago, Facebook realized that it didn't matter how good their servers were at processing and handling data requests. If the people using their app didn't have a great network connection, like in an area with limited mobile data service, a lot of their data would never make it to the end user. Since they can't control the network their users make requests from, they came up with a new query language specification called `GraphQL` that allows them to control the data that's sent to the client.

## What is GraphQL?
<style scoped> 
  {
    font-size: 1.9em;
  }
</style>
* GraphQL, we essentially set up a single API endpoint where we can retrieve as much or as little data as we need from multiple resources such as databases, microservices, or even other third-party APIs, all in a single HTTP request.

* We declare exactly what data we want to receive from the server, and the server sends back only that data. 

* Instead of making multiple HTTP requests to different endpoints, we can make a single request to a single endpoint and receive all the data we need in a single response.


## Apollo Server
* GraphQL has its own language specification, that can work with any language or framework.
* One of the most popular GraphQL servers is Apollo Server, which is an open-source, spec-compliant GraphQL server that's compatible with any GraphQL client, including Apollo Client.

## Installation
`npm i apollo-server-express graphql`
* Apollo Server is a collection of packages that work together to create a GraphQL server.
* GraphQL is a peer dependency of Apollo Server, so we need to install it separately.

## Graphql CRUD break down
<style scoped> 
  {
    font-size: 1.9em;
  }
</style>
* Queries are used to fetch data from the server, mainly thr GET method.
  * `type Query { }`
* Mutations are used to create, update, and delete data on the server, mainly the POST, PUT, and DELETE methods.
  * `type Mutation { }`
* We either use queries or mutations to fetch or modify data on the server.
* these request involve two important parts 
  * `typeDefs` - defines the structure of the data we're fetching or modifying.defining the exact data and parameters that are tied to that endpoint.
  * `resolvers` - defines the logic/function for fetching or modifying the data.
* The two of these together form what's known as a schema. 

## typeDefs
* The typeDefs property is where we define the structure of the data we're fetching or modifying.
* gql` ` - gql is a tag function that allows us to write GraphQL code inside of a JavaScript template literal.
* The typeDefs property is where we define the structure of the data we're fetching or modifying.
```js
const { gql } = require('apollo-server-express');
const typeDefs = gql`
  type Query {
    hello: String
  }
`;
```
# resolvers
* The resolvers property is where we define the logic for fetching or modifying the data.
* `{ Query: { hello: () => 'Hello world!' } }` - The Query object is where we define the logic for fetching data. The hello property is the name of the query we're defining, and the value is the function that will be executed when the query is called.
```js
const resolvers = {
  Query: {
    hello: () => 'Hello world!',
  },
};
```

## Query type
* `type Query { }` - The Query type is where we define the logic for fetching data.
* `type NameOfTypeOfData { }` - The name of the type is the name of the query we're defining, and the properties of the type are the fields we want to return.
```js
const typeDefs = gql`
  type Query {
    users: [User]
    books: [Book]
  }
  type User {
    _id: ID
    username: String
    email: String
    bookCount: Int
    savedBooks: [Book]
  }
  type Book {
    bookId: ID
    authors: [String]
    description: String!
    title: String
    image: String
    link: String
  }
`;
```
## Create and login user JWT
* To perform any data manipulations we use mutations.
* `type Mutation { }` - The Mutation type is where we define the logic for modifying data.
```js
// typeDefs.js
const typeDefs = gql`
  // type Query { }
  type Mutation {
    createUser(username: String!, email: String!, password: String!): User
    login(email: String!, password: String!): User
  }
```

## mutation resolvers
* `createUser` - The createUser mutation is where we define the logic for creating a new user.
* `login` - The login mutation is where we define the logic for logging in a user.
```js
// resolvers.js
const resolvers = {
  // Query: { }
  Mutation: {
    createUser: async (parent, args) => {
      const user = await User.create(args);

      return { user };
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });
      if (!user) {
        throw new AuthenticationError('Incorrect credentials');
      }
      const correctPw = await user.isCorrectPassword(password);
      if (!correctPw) {
        throw new AuthenticationError('Incorrect credentials');
      }
      return { user };
    },
  },
};
```

## authentication - JWT
* The JWT is a token that's created when a user logs in and is sent back to the client.
  * all data is stored in a single string called a token.
  * no need to save session data on the server.
  * less use of server memory.
  * can be used anywhere, not just in a browser.
* `npm i jsonwebtoken` - The jsonwebtoken package is used to create and verify JSON web tokens.

## Sign a token
* `signToken` - The signToken function is used to sign a token.
* `secret` - The secret is a string that's used to sign the token.
* `expiresIn` - The expiresIn property is used to set the expiration time for the token.
```js
const jwt = require('jsonwebtoken');
const signToken = (user) => {
  return jwt.sign({ data: user }, secret, { expiresIn: '1h' });
};
```

## Verify a token
* `verifyToken` - The verifyToken function is used to verify a token.
* `secret` - The secret is a string that's used to verify the token.
```js
const jwt = require('jsonwebtoken');
const verifyToken = (token) => {
  return jwt.verify(token, secret, (err, decodedData) => {
    if (err) {
      console.log(err);
      return;
    }
    return decodedData;
  });
};
```
## Auth typeDefs
* `auth` - The auth type is where we define the structure of the data we're returning from the login mutation.
```js
const typeDefs = gql`
  type Auth {
    token: ID!
    user: User
  }

  type Mutation {
    login(email: String!, password: String!): Auth
  }
`;
```
## Client Side GQL Queries
* Install appollo client
  * `npm i @apollo/client graphql`

## Apollo Client Provider
* `ApolloProvider` - The ApolloProvider component is a wrapper component that we use to pass the Apollo Client instance to the React application.
  * `ApolloProvider` - react component to provide data to the rest of the app.
  * `ApolloClient` - the client that will be used to make requests to the server.
  * `InMemoryCache` - the cache that will be used to store the data.
  * `createHttpLink` - allows us control over the HTTP request that's made to the server, like a middleware.

## Apollo provide snippet
```js
import { ApolloClient, InMemoryCache, ApolloProvider, InMemoryCache, createHttpLink } from '@apollo/client';
 
const client = new ApolloClient({
  link: createHttpLink({
    uri: 'http://localhost:4014/graphql',
  }),
  cache: new InMemoryCache(),
});
 
ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById('root')
);
```
## Making a GQL request
* `useQuery` - The useQuery hook is used to make a request to the server.
* `gql` - The gql tag function is used to parse the query string into a query document.
```js
import { gql, useQuery } from '@apollo/client';

export const QUERY_POSTS = gql`
  posts {
    postSnippets
    userName
    upVotes
    reactions {
      userName
      reactionBody
    }
  }
`;
```

## useQuery snippet
* arguments - `QUERY_POSTS` - the query document.
* arguments - `variables` - the variables object.
* arguments - `fetchPolicy` - the fetch policy.
* arguments - `onCompleted` - the callback function that's executed when the request is completed.
* arguments - `onError` - the callback function that's executed when the request errors out.
```js
const { loading, data, error } = useQuery(QUERY_POSTS, {
  variables: { postId },
  fetchPolicy: 'network-only',
  onCompleted: (data) => {
    console.log(data);
  },
  onError: (error) => {
    console.log(error);
  },
});
```