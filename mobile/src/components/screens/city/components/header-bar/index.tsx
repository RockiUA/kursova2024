import { FC } from 'react';
import { View } from 'react-native';
import { CurrentWeather } from '@generated';
import { Appbar, Menu, Text } from 'react-native-paper';
import { useCityPressActions } from '@hooks/city/use-city-press-actions';
import { useHeader } from '@hooks/common/use-header';
import enLocale from '@public/locales/en.json';
import { styles } from './styles';

interface CityHeaderBarProps {
  item: CurrentWeather;
}

export const CityHeaderBar: FC<CityHeaderBarProps> = ({ item }) => {
  const { visible, toggleVisibility, setInvisible } = useHeader();
  const { navigation, isDeletePerforming, onDeleteClick } = useCityPressActions({ closeMenu: setInvisible });
  const {
    delete: { title },
  } = enLocale.city.headerBar.menu;

  return (
    <View style={styles.container}>
      <View style={styles.cityDescription}>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Text variant="titleLarge">{item.city.cityName}</Text>
      </View>

      <Menu
        visible={visible}
        onDismiss={setInvisible}
        anchor={<Appbar.Action icon="dots-vertical" onPress={toggleVisibility} />}
        contentStyle={styles.menuContent}
      >
        <Menu.Item
          disabled={isDeletePerforming}
          onPress={() => onDeleteClick(item)}
          title={title}
          leadingIcon="delete"
        />
      </Menu>
    </View>
  );
};
