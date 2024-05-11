import { FC, PropsWithChildren } from 'react';
import { CssVarsProvider } from '@mui/joy';
import { Header } from './components';

const Layout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <CssVarsProvider>
      <Header />
      <main>{children}</main>
    </CssVarsProvider>
  );
};

export const withLayout = <T extends Record<string, unknown>>(Component: FC<T>) => {
  return function withLayoutComponent(props: T): JSX.Element {
    return (
      <Layout>
        <Component {...props} />
      </Layout>
    );
  };
};
