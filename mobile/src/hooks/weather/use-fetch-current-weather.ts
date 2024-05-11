import { useEffect } from 'react';
import { useFetchCurrentWeatherByUserLazyQuery } from '@generated';
import { showErrorMessage } from '@utils/show-error-message';
import { updateUserCitiesId } from '@utils/update-user-cities-id';

export const useFetchCurrentWeather = () => {
  const [fetchCurrent, { data, loading }] = useFetchCurrentWeatherByUserLazyQuery({
    fetchPolicy: 'cache-and-network',
    onCompleted: updateUserCitiesId,
    onError: showErrorMessage,
  });

  useEffect(() => {
    fetchCurrent();
  }, [fetchCurrent]);

  return {
    isFetchingCurrentPerforming: loading,
    fetchCurrent,
    weather: data?.weather,
  };
};
