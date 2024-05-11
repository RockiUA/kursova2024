import { FC } from 'react';
import { Message } from '@components/common/message';
import { Heading, Search } from './components';

export const SearchScreen: FC = () => {
  return (
    <>
      <Heading />
      <Search />
      <Message type="error" />
    </>
  );
};
