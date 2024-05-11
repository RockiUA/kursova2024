import { FC, memo } from 'react';
import { Maybe, Weather } from '@generated';
import { CircularProgress } from '@mui/joy';
import { ForecastCard } from '../card';
import styles from './cards.module.css';

interface ForecastCardsProps {
  forecast: ReadonlyArray<Maybe<Weather>> | undefined;
}

export const ForecastCards: FC<ForecastCardsProps> = ({ forecast }) => {
  return (
    <>
      {forecast?.length ? (
        forecast.map((item, index) => <ForecastCard key={`${item?.date}`} data={item} index={index} />)
      ) : (
        <CircularProgress className={styles.progress} />
      )}
    </>
  );
};

export const MemoizedForecastCards = memo(ForecastCards);
