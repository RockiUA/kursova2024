import { FC } from 'react';
import { CurrentWeather as CurrentWeatherOutput } from '@generated';
import { Card, Divider, Typography } from '@mui/joy';
import enLocale from '@public/locales/en.json';
import { DetailedInfo } from '../detailed-info';
import styles from './current-weather.module.css';

interface CurrentWeatherProps {
  item: CurrentWeatherOutput;
}

export const CurrentWeather: FC<CurrentWeatherProps> = ({ item }) => {
  const { title } = enLocale.home.modal.current;

  return (
    <Card color="neutral" variant="plain" className={styles.container}>
      <Typography level="h5">{title}</Typography>

      <img src={item.weather?.weatherIcon} alt="Weather icon for city modal" />

      <Typography level="h2" className={styles.center}>
        {Math.floor(item.weather?.temperature ?? 0)} °C
      </Typography>

      <Divider className={styles.divider} />

      <DetailedInfo data={item.weather} />
    </Card>
  );
};
