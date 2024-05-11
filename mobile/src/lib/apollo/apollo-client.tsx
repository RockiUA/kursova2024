import { ApolloClient, FetchResult, from, HttpLink, InMemoryCache, Observable } from '@apollo/client';
import { onError } from '@apollo/client/link/error';
import { REFRESH_MUTATION } from '@graphql/mutations/refresh';
import { authenticated } from './apollo-constants';

const authLink = onError(({ graphQLErrors, operation, forward }) => {
  if (graphQLErrors?.length && graphQLErrors[0].extensions?.statusCode === 401) {
    const body = operation.query.loc?.source.body;

    if (body && body.indexOf('refresh') > 0) {
      authenticated(false);
      return;
    }

    const observable = new Observable<FetchResult>((subscriber) => {
      (async () => {
        await client
          .mutate({
            mutation: REFRESH_MUTATION,
          })
          .catch(() => null);

        forward(operation).subscribe(subscriber);
      })();
    });

    return observable;
  }

  return;
});

const link = new HttpLink({
  uri: `${process.env.EXPO_PUBLIC_DOMAIN_URL}/graphql`,
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
