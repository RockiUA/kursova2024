import { useEffect } from 'react';
import { CurrentWeather, useFetchForecastByCityLazyQuery } from '@generated';
import { mobileConfig } from '@config/mobile';
import { showErrorMessage } from '@utils/show-error-message';

export const useFetchForecast = (item: CurrentWeather) => {
  const { forecastDays } = mobileConfig.city;
  const [fetchForecast, { data, loading }] = useFetchForecastByCityLazyQuery({
    fetchPolicy: 'cache-and-network',
    onError: showErrorMessage,
  });

  useEffect(() => {
    if (!item.city) {
      return;
    }

    const filter = {
      name: item.city?.cityName,
      latitude: item.city?.cityCoordinates.latitude,
      longitude: item.city?.cityCoordinates.longitude,
    };

    fetchForecast({ variables: { filter, options: { days: forecastDays } } });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [item, fetchForecast]);

  return {
    isForecastLoading: loading,
    forecast: data?.forecast,
  };
};
