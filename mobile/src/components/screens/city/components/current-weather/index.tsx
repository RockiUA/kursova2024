import { FC } from 'react';
import { CurrentWeather as CurrentWeatherDescription } from '@generated';
import { DetailedView, MainView } from './components';

interface CurrentWeatherProps {
  item: CurrentWeatherDescription;
}

export const CurrentWeather: FC<CurrentWeatherProps> = ({ item }) => {
  return (
    <>
      <MainView item={item.weather} />
      <DetailedView item={item.weather} />
    </>
  );
};
