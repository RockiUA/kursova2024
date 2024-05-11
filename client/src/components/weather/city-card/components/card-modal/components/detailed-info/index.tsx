import { FC } from 'react';
import { Weather } from '@generated';
import AirIcon from '@mui/icons-material/Air';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import { Card, Typography } from '@mui/joy';
import enLocale from '@public/locales/en.json';
import styles from './detailed-info.module.css';

interface DetailedInfoProps {
  data?: Weather | null;
}

export const DetailedInfo: FC<DetailedInfoProps> = ({ data }) => {
  const { feelsLike: feelsLikeText, windSpeed: windSpeedText } = enLocale.home.modal.current;
  const temperatureFeelsLike = Math.floor(data?.temperatureFeelsLike ?? 0);
  const windSpeed = Math.floor(data?.windSpeed ?? 0);

  return (
    <Card color="primary" variant="soft" className={styles.container}>
      <Typography level="body1" startDecorator={<EmojiEmotionsIcon />}>
        {feelsLikeText}: {temperatureFeelsLike} °C
      </Typography>

      <Typography level="body1" startDecorator={<AirIcon />}>
        {windSpeedText}: {windSpeed} m/s
      </Typography>
    </Card>
  );
};
