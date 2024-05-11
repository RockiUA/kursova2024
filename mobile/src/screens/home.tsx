import { FC } from 'react';
import { StatusBar } from 'react-native';
import { HomeScreen } from '@components/screens/home';
import { mobileConfig } from '@config/mobile';

export const Home: FC = () => {
  const { home } = mobileConfig.statusbar;

  return (
    <>
      <StatusBar {...home} />
      <HomeScreen />
    </>
  );
};
