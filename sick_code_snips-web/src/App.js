import React from 'react';
import Footer from './components/footer';
import Main from './components/main';
import Header from './components/header';
import { ApolloProvider, ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';


const client = new ApolloClient({
  link: createHttpLink({
    uri: 'http://localhost:4014/graphql',
  }),
  cache: new InMemoryCache()
});


function App() {
  return (
    // background dark mode
    <ApolloProvider client={client}>
      <div className="bg-gray-900 text-white">
      <Header />
      <Main />
      <Footer />
        </div>
    </ApolloProvider>
  );
}

export default App;
