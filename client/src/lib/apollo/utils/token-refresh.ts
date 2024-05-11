import { FetchResult, NextLink, Observable, Operation } from '@apollo/client';
import { REFRESH_MUTATION } from '@graphql/mutations/refresh.mutation';
import client from '../apollo-client';

export function chainRequests(operation: Operation, forward: NextLink): Observable<FetchResult> {
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
