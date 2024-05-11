import { FC, memo } from 'react';
import { Weather } from '@generated';
import { Card, Typography } from '@mui/joy';
import { Maybe } from 'graphql/jsutils/Maybe';
import { formattedDate } from './helpers/formatted-date';
import { DetailedInfo } from '../../../detailed-info';
import styles from './card.module.css';

interface ForecastCardProps {
  data: Maybe<Weather>;
  index: number;
}

export const ForecastCard: FC<ForecastCardProps> = ({ data, index }) => {
  const temperature = Math.floor(data?.temperature ?? 0);

  return (
    <Card>
      <Typography level="body1" className={styles.forecastDate}>
        {formattedDate(index, data?.date)}
      </Typography>

      <div className={styles.forecastWeatherContainer}>
        <div className={styles.forecastWeatherInfo}>
          <Typography level="body1" color="neutral">
            {data?.weather}
          </Typography>

          <Typography level="h5" className={styles.center}>
            {temperature} °C
          </Typography>
        </div>

        <img src={data?.weatherIcon} alt="Forecast weather icon" />
      </div>

      <DetailedInfo data={data} />
    </Card>
  );
};

export const MemoizedForecastCard = memo(ForecastCard);
