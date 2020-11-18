import { ApolloClient, InMemoryCache } from '@apollo/client';
const { REACT_APP_SERVER_URL } = process.env;

export const client = new ApolloClient({
	  uri: REACT_APP_SERVER_URL,
	  cache: new InMemoryCache(),
});
