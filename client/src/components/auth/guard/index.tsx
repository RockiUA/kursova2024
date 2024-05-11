import { FC, PropsWithChildren, useEffect } from 'react';
import { useRouter } from 'next/router';
import { CircularProgress } from '@mui/joy';
import { useCheckAuth } from '@hooks/auth/use-check-auth';
import client from '@lib/apollo/apollo-client';
import styles from './guard.module.css';

const Guard: FC<PropsWithChildren> = ({ children }) => {
  const { authState } = useCheckAuth();
  const router = useRouter();

  useEffect(() => {
    if (authState === false) {
      router.push('/sign-in');
      client.restore({});
    }
  }, [router, authState]);

  return <>{authState ? children : <CircularProgress className={styles.progress} color="primary" />}</>;
};

export const withGuard = <T extends Record<string, unknown>>(Component: FC<T>) => {
  return function withGuardComponent(props: T): JSX.Element {
    return (
      <Guard>
        <Component {...props} />
      </Guard>
    );
  };
};
