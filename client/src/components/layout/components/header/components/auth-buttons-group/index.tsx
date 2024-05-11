import { FC } from 'react';
import { useMeQuery } from '@generated';
import { useCheckAuth } from '@hooks/auth/use-check-auth';
import { Logout } from '../logout';
import { ModeButtons } from '../mode-buttons';

export const AuthButtonsGroup: FC = () => {
  const { authState } = useCheckAuth();
  const { data } = useMeQuery({ fetchPolicy: 'cache-only' });

  if (authState === null) {
    return null;
  }

  if (authState) {
    return <Logout me={data?.me} />;
  }

  return <ModeButtons />;
};
