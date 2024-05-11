import { FC, memo } from 'react';
import { CurrentWeather } from '@generated';
import { Card, Typography } from '@mui/joy';
import { useCityCard } from '@hooks/weather/use-city-card';
import { CardControls, CardModal } from './components';
import { formattedDate } from './helpers/formatted-time';
import styles from './city-card.module.css';

interface CityCardProps {
  item: CurrentWeather;
}

export const CityCard: FC<CityCardProps> = ({ item }) => {
  const { isModalOpened, openCard, openCardOnKey, closeCard } = useCityCard();
  const temperature = Math.floor(item.weather.temperature);

  return (
    <>
      <Card
        tabIndex={0}
        variant="soft"
        color="neutral"
        onClick={openCard}
        onKeyDown={openCardOnKey}
        className={styles.cityCard}
      >
        <CardControls item={item} />

        <div className={styles.dataContainer}>
          <div className={styles.cityCardText}>
            <Typography level="h6">{item.city.cityName}</Typography>
            <Typography level="body2">{formattedDate()}</Typography>

            <Typography level="h5" className={styles.cityCardTemperature}>
              {temperature} °C
            </Typography>
          </div>

          <img src={item.weather.weatherIcon} className={styles.cityWeatherIcon} alt="Weather for city" />
        </div>
      </Card>

      <CardModal open={isModalOpened} close={closeCard} item={item} />
    </>
  );
};

export const MemoizedCityCard = memo(CityCard);
