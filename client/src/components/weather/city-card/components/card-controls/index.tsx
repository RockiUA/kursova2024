import { FC } from 'react';
import { CurrentWeather } from '@generated';
import DeleteIcon from '@mui/icons-material/Delete';
import { IconButton } from '@mui/joy';
import { useCityCard } from '@hooks/weather/use-city-card';
import styles from './card-controls.module.css';

interface CardControlsProps {
  item: CurrentWeather;
}

export const CardControls: FC<CardControlsProps> = ({ item }) => {
  const { isDeletePerforming, deleteCard, deleteCardOnKey } = useCityCard();

  return (
    <div className={styles.controls}>
      <IconButton
        variant="plain"
        color="danger"
        size="sm"
        disabled={isDeletePerforming}
        onClick={(e) => deleteCard(e, item)}
        onKeyDown={(e) => deleteCardOnKey(e, item)}
      >
        <DeleteIcon />
      </IconButton>
    </div>
  );
};
