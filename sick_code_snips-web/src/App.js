import React from 'react';
import Footer from './components/footer';
import Main from './components/main';
import Header from './components/header';
import { ApolloProvider, ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';

// establish link to graphql server
// instantiate ApolloClient
const client = new ApolloClient({
  link: createHttpLink({
    uri: '/graphql',
  }),
  cache: new InMemoryCache()
});


function App() {
  return (
    // background dark mode
    <ApolloProvider client={client}>
      <div className="bg-gray-900 text-white h-full">
      <Header />
      <Main />
      <Footer />
        </div>
    </ApolloProvider>
  );
}

export default App;
