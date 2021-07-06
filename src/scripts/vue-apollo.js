import { ApolloClient } from "apollo-client";
import { createHttpLink } from "apollo-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";
import { ApolloLink } from "apollo-link";

const httpLink = createHttpLink({
  uri: process.env.VUE_APP_GRAPHQL_URL || "http://localhost:1337/graphql"
});

const cache = new InMemoryCache();

const authLink = new ApolloLink((operation, forward) => {
  const token = localStorage.getItem('jwt');
  operation.setContext({
    headers: {
      authorization: token ? `Bearer ${token}` : ''
    }
  });
  return forward(operation);
});

const apolloClient = new ApolloClient({
  link: authLink.concat(httpLink),
  cache
});

export default apolloClient;