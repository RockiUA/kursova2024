import { useDeferredValue, useEffect } from 'react';
import { useCitiesLazyQuery } from '@generated';
import { showErrorMessage } from '@utils/show-error-message';

export const useSearchCities = (searchPrompt: string) => {
  const [fetchCities, { data, loading }] = useCitiesLazyQuery({
    fetchPolicy: 'cache-and-network',
    onError: showErrorMessage,
  });
  const deferredSearchPrompt = useDeferredValue(searchPrompt);

  useEffect(() => {
    fetchCities({ variables: { filter: { name: deferredSearchPrompt } } });
  }, [fetchCities, deferredSearchPrompt]);

  return {
    cities: data?.cities,
    loading,
  };
};
