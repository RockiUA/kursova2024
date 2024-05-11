import { FC } from 'react';
import { ApolloProvider } from '@apollo/client';
import { PaperProvider } from 'react-native-paper';
import client from '@lib/apollo/apollo-client';
import { Navigation } from './navigation';

export const App: FC = () => {
  return (
    <ApolloProvider client={client}>
      <PaperProvider theme={{ dark: false, mode: 'adaptive' }}>
        <Navigation />
      </PaperProvider>
    </ApolloProvider>
  );
};
