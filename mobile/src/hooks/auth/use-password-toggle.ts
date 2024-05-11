import { useCallback, useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { NavigationProps } from '@core/interfaces';

export const usePasswordToggle = (initialState: boolean) => {
  const [isPasswordHidden, setIsPasswordHidden] = useState<boolean>(initialState);
  const navigation = useNavigation<NavigationProps>();

  useEffect(() => {
    setIsPasswordHidden(true);
  }, [navigation]);

  const togglePasswordVisibility = useCallback(() => setIsPasswordHidden((value) => !value), []);

  return {
    isPasswordHidden,
    togglePasswordVisibility,
  };
};
