import { useEffect } from 'react';
import { useReactiveVar } from '@apollo/client';
import { useMeLazyQuery } from '@generated';
import { authenticated } from '@lib/apollo/apollo-constants';

export const useCheckAuth = () => {
  const authenticatedVar = useReactiveVar(authenticated);
  const [fetchMe] = useMeLazyQuery({
    fetchPolicy: 'cache-and-network',
    onError: () => null,
  });

  useEffect(() => {
    const updateAuthenticatedVar = async () => {
      if (authenticatedVar === null) {
        const { data } = await fetchMe();
        authenticated(Boolean(data?.me));
      }
    };

    updateAuthenticatedVar();
  }, [authenticatedVar, fetchMe]);

  return {
    authState: authenticatedVar,
  };
};
