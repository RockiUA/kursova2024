import { FC } from 'react';
import { useFetchCurrentWeather } from '@hooks/weather/use-fetch-current-weather';
import { MemoizedCityCard } from '../city-card';
import styles from './cities-cards.module.css';

export const CitiesCards: FC = () => {
  const { weather } = useFetchCurrentWeather();

  return (
    <div className={styles.citiesCardsContainer}>
      {weather?.map((item, index) => (
        <MemoizedCityCard key={`${item.city.cityName}_${index}`} item={item} />
      ))}
    </div>
  );
};
