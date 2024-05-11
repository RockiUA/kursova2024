import { useEffect, useState } from 'react';
import { CurrentWeather, useFetchForecastByCityLazyQuery } from '@generated';
import enLocale from '@public/locales/en.json';
import { showErrorMessage } from '@utils/show-error-message';

const { three, five } = enLocale.home.modal.forecasts.dayAmountButton;
const forecastDaysMapping: Record<string, { text: string; days: number }> = {
  '3': { text: five, days: 5 },
  '5': { text: three, days: 3 },
};

export const useFetchForecast = (item: CurrentWeather) => {
  const [days, setDays] = useState<number>(3);
  const [fetchForecast, { data }] = useFetchForecastByCityLazyQuery({
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

    fetchForecast({ variables: { filter, options: { days } } });
  }, [days, item, fetchForecast]);

  const setForecastDays = (days: number): void => setDays(forecastDaysMapping[String(days)].days);
  const showNextForecastDaysAmount = (days: number): string => forecastDaysMapping[String(days)].text;

  return {
    daysState: days,
    forecast: data?.forecast,
    setForecastDays,
    showNextForecastDaysAmount,
  };
};
