import { FC, useState } from 'react';
import { ClickAwayListener } from '@mui/base';
import SearchIcon from '@mui/icons-material/Search';
import { Input, List } from '@mui/joy';
import { useSearchList } from '@hooks/common/use-search-list';
import { useSearchCities } from '@hooks/weather/use-search-cities';
import enLocale from '@public/locales/en.json';
import { MemoizedCityList } from './components';
import styles from './search.module.css';

export const Search: FC = () => {
  const { placeholder } = enLocale.home.search;
  const [searchPrompt, setSearchPrompt] = useState<string>('');
  const { cities, loading } = useSearchCities(searchPrompt);
  const { listOpened, closeList, toggleListOpenedState, onSearchInputChange, onKeyDown, onKeyDownInput } =
    useSearchList(setSearchPrompt);

  return (
    <ClickAwayListener onClickAway={closeList} mouseEvent="onMouseDown" touchEvent="onTouchStart">
      <div className={styles.searchContainer} onKeyDown={onKeyDown}>
        <Input
          onClick={toggleListOpenedState}
          value={searchPrompt}
          onChange={onSearchInputChange}
          onKeyDown={onKeyDownInput}
          placeholder={placeholder}
          variant="plain"
          startDecorator={<SearchIcon />}
        />

        {listOpened ? (
          <List variant="plain" className={styles.list}>
            <MemoizedCityList cities={cities} closeList={closeList} loading={loading} />
          </List>
        ) : null}
      </div>
    </ClickAwayListener>
  );
};
