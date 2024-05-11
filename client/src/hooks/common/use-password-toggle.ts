import { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/router';

export const usePasswordToggle = (initialState: boolean) => {
  const [passwordShown, setPasswordShown] = useState<boolean>(initialState);
  const router = useRouter();

  useEffect(() => {
    setPasswordShown(false);
  }, [router.pathname]);

  const togglePasswordVisibility = useCallback(() => setPasswordShown((value) => !value), []);

  return {
    passwordShown,
    togglePasswordVisibility,
  };
};
