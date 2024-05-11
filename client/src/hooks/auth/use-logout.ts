import { useCallback } from 'react';
import { useRouter } from 'next/router';
import { useLogoutMutation } from '@generated';
import { useMessage } from '@hooks/common/use-message';
import client from '@lib/apollo/apollo-client';
import { authenticated } from '@lib/apollo/apollo-constants';
import { showErrorMessage } from '@utils/show-error-message';

export const useLogout = () => {
  const { clearMessage } = useMessage();
  const [logoutMutation, { loading: isLogoutPerforming }] = useLogoutMutation({ onError: showErrorMessage });
  const router = useRouter();

  const onLogoutCompleted = useCallback(() => {
    client.refetchQueries({ include: 'active' });
    authenticated(false);
    router.push('/sign-in');
  }, [router]);

  const logout = useCallback(() => {
    clearMessage();
    logoutMutation({ onCompleted: onLogoutCompleted });
  }, [clearMessage, logoutMutation, onLogoutCompleted]);

  return {
    isLogoutPerforming,
    logout,
  };
};
