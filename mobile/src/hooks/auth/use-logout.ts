import { useCallback } from 'react';
import { useLogoutMutation } from '@generated';
import { useNavigation } from '@react-navigation/native';
import { NavigationProps } from '@core/interfaces';
import { useMessage } from '@hooks/common/use-message';
import client from '@lib/apollo/apollo-client';
import { authenticated } from '@lib/apollo/apollo-constants';
import { showErrorMessage } from '@utils/show-error-message';

export const useLogout = () => {
  const { clearMessage } = useMessage();
  const [logoutMutation, { loading: isLogoutPerforming }] = useLogoutMutation({ onError: showErrorMessage });
  const navigation = useNavigation<NavigationProps>();

  const onLogoutCompleted = useCallback(() => {
    client.refetchQueries({ include: 'active' });
    authenticated(false);
    navigation.navigate('SignIn');
  }, [navigation]);

  const logout = useCallback(() => {
    clearMessage();
    logoutMutation({ onCompleted: onLogoutCompleted });
  }, [clearMessage, logoutMutation, onLogoutCompleted]);

  return {
    isLogoutPerforming,
    logout,
  };
};
