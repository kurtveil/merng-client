import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client';
import * as React from 'react';
import Login from './components/shared/Login';
import {
  Experimental_CssVarsProvider as CssVarsProvider,
  experimental_extendTheme as extendTheme,
} from '@mui/material/styles';
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
  uri: 'https://server-7z4h8ma9w-kurtveils-projects.vercel.app/graphql',
  cache,
  // credentials: true
});
const theme = extendTheme();
delete theme.colorSchemes.light;
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
