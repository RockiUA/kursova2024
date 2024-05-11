import { FC, memo } from 'react';
import { Image, View } from 'react-native';
import { CurrentWeather } from '@generated';
import { Card, Text } from 'react-native-paper';
import { useCityCard } from '@hooks/home/use-city-card';
import { formattedDate } from './helpers';
import { styles } from './styles';

interface CityCardProps {
  item: CurrentWeather;
}

const CityCard: FC<CityCardProps> = ({ item }) => {
  const { openCard } = useCityCard();
  const temperature = Math.round(item.weather.temperature);

  return (
    <Card mode="contained" style={styles.card} onPress={() => openCard(item)}>
      <Card.Content>
        <View style={styles.container}>
          <View>
            <Text variant="titleMedium" style={styles.cityName}>
              {item.city.cityName}
            </Text>

            <Text variant="bodyMedium" style={styles.time}>
              {formattedDate()}
            </Text>

            <Text variant="headlineSmall" style={styles.temperature}>
              {temperature} °C
            </Text>
          </View>

          <Image source={{ uri: item.weather.weatherIcon }} style={styles.icon} alt="Weather for city" />
        </View>
      </Card.Content>
    </Card>
  );
};

export const MemoizedCityCard = memo(CityCard);
