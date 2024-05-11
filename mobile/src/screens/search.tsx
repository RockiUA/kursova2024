import { FC } from 'react';
import { StatusBar } from 'react-native';
import { SearchScreen } from '@components/screens/search';
import { mobileConfig } from '@config/mobile';

export const Search: FC = () => {
  const { search } = mobileConfig.statusbar;

  return (
    <>
      <StatusBar {...search} />
      <SearchScreen />
    </>
  );
};
