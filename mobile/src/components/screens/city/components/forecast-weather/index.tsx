import { FC } from 'react';
import { View } from 'react-native';
import { CurrentWeather } from '@generated';
import { Title } from '@components/screens/city/components/title';
import { useFetchForecast } from '@hooks/weather/use-fetch-forecast';
import enLocale from '@public/locales/en.json';
import { Infos } from './components';

interface ForecastWeatherProps {
  item: CurrentWeather;
}

export const ForecastWeather: FC<ForecastWeatherProps> = ({ item }) => {
  const { isForecastLoading, forecast } = useFetchForecast(item);
  const { title } = enLocale.city.forecast;

  return (
    <View>
      <Title>{title}:</Title>
      <Infos forecast={forecast?.at(0)?.forecasts} loading={isForecastLoading} />
    </View>
  );
};
