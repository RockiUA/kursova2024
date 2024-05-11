import { useDeferredValue, useEffect } from 'react';
import { useCitiesLazyQuery } from '@generated';
import { showErrorMessage } from '@utils/show-error-message';

export const useSearchCities = (searchPrompt: string) => {
  const deferredSearchPrompt = useDeferredValue(searchPrompt);
  const [fetchCities, { data, loading }] = useCitiesLazyQuery({
    fetchPolicy: 'cache-and-network',
    onError: showErrorMessage,
  });

  useEffect(() => {
    fetchCities({ variables: { filter: { name: deferredSearchPrompt } } });
  }, [fetchCities, deferredSearchPrompt]);

  return {
    cities: data?.cities,
    loading,
  };
};
