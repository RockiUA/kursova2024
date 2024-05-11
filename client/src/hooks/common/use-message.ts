import { useCallback, useEffect } from 'react';
import { useRouter } from 'next/router';
import { message } from '@lib/apollo/apollo-constants';

export const useMessage = () => {
  const router = useRouter();

  const clearMessage = useCallback(() => {
    message('');
  }, []);

  useEffect(() => {
    message('');
  }, [router.pathname]);

  return {
    clearMessage,
  };
};
