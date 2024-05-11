import { FC } from 'react';
import { TouchableHighlight, View } from 'react-native';
import { useReactiveVar } from '@apollo/client';
import { City } from '@generated';
import { IconButton, Text } from 'react-native-paper';
import { useSearchItem } from '@hooks/search/use-search-item';
import { userCitiesIds } from '@lib/apollo/apollo-constants';
import { styles } from './styles';

interface SearchItemProps {
  item: City;
}

export const SearchItem: FC<SearchItemProps> = ({ item }) => {
  const idsList = useReactiveVar(userCitiesIds);
  const isDisabled = idsList.includes(item.id);
  const { isAddCityPerforming, addUserCity } = useSearchItem();

  return (
    <TouchableHighlight
      underlayColor="#eaeaea"
      onPress={() => addUserCity(item)}
      style={[styles.touchable, isDisabled && styles.disabled]}
      disabled={isDisabled || isAddCityPerforming}
    >
      <View style={styles.item}>
        <Text variant="bodyLarge" style={styles.text}>
          {item.name}, {item.country}
        </Text>

        {isDisabled && <IconButton icon="check" size={18.5} style={styles.icon} />}
      </View>
    </TouchableHighlight>
  );
};
