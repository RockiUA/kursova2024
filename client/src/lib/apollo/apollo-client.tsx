import { ApolloClient, HttpLink, InMemoryCache, from } from '@apollo/client';
import { onError } from '@apollo/client/link/error';
import { authenticated } from './apollo-constants';
import { chainRequests } from './utils/token-refresh';

const authLink = onError(({ graphQLErrors, operation, forward }) => {
  if (graphQLErrors?.length && graphQLErrors[0].extensions?.statusCode === 401) {
    const body = operation.query.loc?.source.body;

    if (body && body.indexOf('refresh') > 0) {
      authenticated(false);
      return;
    }

    const observable = chainRequests(operation, forward);
    return observable;
  }

  return;
});

const link = new HttpLink({
  uri: `${process.env.NEXT_PUBLIC_DOMAIN_URL}/graphql`,
  credentials: 'include',
});

const client = new ApolloClient({
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          fetchCurrentWeatherByUser: {
            merge: (_existing, incoming) => incoming,
          },
        },
      },
    },
  }),
  link: from([authLink, link]),
});

export default client;
