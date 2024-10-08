import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client';
import React from 'react';
import Login from './components/shared/Login';

const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        clients: {
          merge(existing, incoming) {
            return incoming;
          }
        },
        projects: {
          merge(existing, incoming) {
            return incoming;
          }
        }
      }
    }
  }
});


const client = new ApolloClient({
  uri: 'https://mrng-server.vercel.app/graphql',
  cache,
  // credentials: true
});
function App() {

  
  return (
    <>
        <ApolloProvider client={client}>
          <Login />
        </ApolloProvider >
    </>
  );
}



export default App;
