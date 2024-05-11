import { FC } from 'react';
import { StatusBar } from 'react-native';
import { CityScreen } from '@components/screens/city';
import { mobileConfig } from '@config/mobile';

export const City: FC = () => {
  const { city } = mobileConfig.statusbar;

  return (
    <>
      <StatusBar {...city} />
      <CityScreen />
    </>
  );
};
