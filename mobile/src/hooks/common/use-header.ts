import { useCallback, useState } from 'react';

export const useHeader = () => {
  const [visible, setVisible] = useState<boolean>(false);

  const toggleVisibility = useCallback(() => setVisible((prev) => !prev), []);
  const setInvisible = useCallback(() => setVisible(false), []);

  return {
    visible,
    toggleVisibility,
    setInvisible,
  };
};
