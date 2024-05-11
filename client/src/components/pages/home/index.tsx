import { FC } from 'react';
import { Message } from '@components/common/message';
import { CitiesCards } from '@components/weather/cities-cards';
import { Search } from '@components/weather/search';
import styles from './home.module.css';

export const HomePage: FC = () => {
  return (
    <>
      <Message type="error" position="fixed" />

      <div className={styles.container}>
        <Search />
        <CitiesCards />
      </div>
    </>
  );
};
