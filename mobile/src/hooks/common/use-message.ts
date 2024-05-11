import { useCallback, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { NavigationProps } from '@core/interfaces';
import { message } from '@lib/apollo/apollo-constants';

export const useMessage = () => {
  const navigation = useNavigation<NavigationProps>();
  const clearMessage = useCallback(() => {
    message('');
  }, []);

  const clearMessageOnTimeout = (timeout: number) => {
    setTimeout(clearMessage, timeout);
  };

  useEffect(() => {
    message('');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navigation]);

  return {
    clearMessage,
    clearMessageOnTimeout,
  };
};
