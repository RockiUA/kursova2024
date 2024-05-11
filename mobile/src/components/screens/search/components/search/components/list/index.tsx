import { FC } from 'react';
import { View } from 'react-native';
import { City, Maybe } from '@generated';
import { formatEmptyList } from './helpers';
import { styles } from './styles';
import { SearchItem } from '../item';

interface SearchListProps {
  cities?: Maybe<ReadonlyArray<City>>;
  loading: boolean;
}

export const SearchList: FC<SearchListProps> = ({ cities, loading }) => {
  const loadingItem = formatEmptyList(loading);

  return (
    <View style={styles.list}>
      {cities?.length ? cities?.map((item) => <SearchItem key={item.id} item={item} />) : loadingItem}
    </View>
  );
};
