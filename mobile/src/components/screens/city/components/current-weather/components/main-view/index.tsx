import { FC } from 'react';
import { Image, View } from 'react-native';
import { Weather } from '@generated';
import { Text } from 'react-native-paper';
import { Title } from '@components/screens/city/components/title';
import enLocale from '@public/locales/en.json';
import { styles } from './styles';

interface MainViewProps {
  item: Weather;
}

export const MainView: FC<MainViewProps> = ({ item }) => {
  const { title } = enLocale.city.current;
  return (
    <>
      <Title>{title}:</Title>

      <View style={styles.main}>
        <Image source={{ uri: item.weatherIcon }} style={styles.image} />

        <View style={styles.content}>
          <Text variant="bodyLarge" style={styles.weatherDescription}>
            {item.weather}
          </Text>

          <Text variant="headlineMedium" style={styles.temperature}>
            {Math.round(item?.temperature ?? 0)} °C
          </Text>
        </View>
      </View>
    </>
  );
};
