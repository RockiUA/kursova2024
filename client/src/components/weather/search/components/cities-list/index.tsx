import { FC, memo } from 'react';
import { City } from '@generated';
import { ListItem } from '@mui/joy';
import { formatEmptyListItem } from './helpers/format-empty-list-item';
import { CityItem } from '../city-item';

interface CitiesListProps {
  cities: readonly City[] | null | undefined;
  closeList: () => void;
  loading: boolean;
}

export const CitiesList: FC<CitiesListProps> = ({ cities, loading, closeList }) => {
  return (
    <>
      {cities?.length ? (
        cities?.map((item) => <CityItem key={item.id} item={item} closeList={closeList} />)
      ) : (
        <ListItem>{formatEmptyListItem(loading)}</ListItem>
      )}
    </>
  );
};

export const MemoizedCityList = memo(CitiesList);
