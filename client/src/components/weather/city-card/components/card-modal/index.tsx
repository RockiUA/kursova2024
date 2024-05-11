import { FC } from 'react';
import { CurrentWeather as CurrentWeatherOutput } from '@generated';
import { Modal, ModalClose, ModalDialog, Typography } from '@mui/joy';
import enLocale from '@public/locales/en.json';
import { CurrentWeather } from './components/current-weather';
import { ForecastWeather } from './components/forecast-weather';
import styles from './card-modal.module.css';

interface CardModalProps {
  open: boolean;
  item: CurrentWeatherOutput;
  close(): void;
}

export const CardModal: FC<CardModalProps> = ({ open, close, item }) => {
  const { title } = enLocale.home.modal;
  return (
    <Modal open={open} onClose={close}>
      <ModalDialog>
        <ModalClose />

        <Typography level="h5" className={styles.cityName}>
          {title} {item.city?.cityName}
        </Typography>

        <div className={styles.container}>
          <CurrentWeather item={item} />
          <ForecastWeather item={item} />
        </div>
      </ModalDialog>
    </Modal>
  );
};
