import type { AppProps } from 'next/app';
import Head from 'next/head';
import { ApolloProvider } from '@apollo/client';
import { clientConfig } from '@config/client.config';
import client from '@lib/apollo/apollo-client';
import '@styles/globals.css';

export default function App({ Component, pageProps }: AppProps) {
  const title = `${clientConfig.appName} - weather forecast`;

  return (
    <>
      <Head>
        <title>{title}</title>
        <link rel="icon" href="/assets/logo.svg" />
        <meta property="og:locale" content="en_US" />
      </Head>
      <ApolloProvider client={client}>
        <Component {...pageProps} />
      </ApolloProvider>
    </>
  );
}
