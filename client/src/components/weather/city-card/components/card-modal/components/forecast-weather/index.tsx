import { FC } from 'react';
import { CurrentWeather } from '@generated';
import { Button, Card, Typography } from '@mui/joy';
import { useFetchForecast } from '@hooks/weather/use-fetch-forecast';
import enLocale from '@public/locales/en.json';
import { MemoizedForecastCards } from './components';
import styles from './forecast-weather.module.css';

interface ForecastWeatherProps {
  item: CurrentWeather;
}

export const ForecastWeather: FC<ForecastWeatherProps> = ({ item }) => {
  const { title } = enLocale.home.modal.forecasts;
  const { daysState, forecast, setForecastDays, showNextForecastDaysAmount } = useFetchForecast(item);

  return (
    <Card color="neutral" variant="plain" className={styles.container}>
      <div className={styles.forecastHeader}>
        <Typography level="h5" className={styles.start}>
          {title}
        </Typography>

        <Button color="primary" variant="soft" onClick={() => setForecastDays(daysState)}>
          {showNextForecastDaysAmount(daysState)}
        </Button>
      </div>

      <div className={styles.forecastContainer}>
        <MemoizedForecastCards forecast={forecast?.at(0)?.forecasts} />
      </div>
    </Card>
  );
};
