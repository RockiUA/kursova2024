import { ChangeEvent, Dispatch, SetStateAction, useState, KeyboardEvent, useCallback } from 'react';

export const useSearchList = (setSearchPrompt: Dispatch<SetStateAction<string>>) => {
  const [listOpened, setListOpened] = useState<boolean>(false);

  const closeList = useCallback(() => setListOpened(false), []);

  const onSearchInputChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setListOpened(true);
      setSearchPrompt(e.target.value);
    },
    [setSearchPrompt],
  );

  const onKeyDown = useCallback((event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Escape') {
      setListOpened(false);
    }
  }, []);

  const onKeyDownInput = useCallback((event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      setListOpened((value) => !value);
    }
  }, []);

  const toggleListOpenedState = useCallback(() => {
    setListOpened((value) => !value);
  }, []);

  return {
    listOpened,
    closeList,
    toggleListOpenedState,
    onSearchInputChange,
    onKeyDown,
    onKeyDownInput,
  };
};
