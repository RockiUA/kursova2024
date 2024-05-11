import { FC } from 'react';
import { View } from 'react-native';
import { CurrentWeather } from '@generated';
import { Title } from '@components/screens/city/components/title';
import enLocale from '@public/locales/en.json';
import { Card } from './components';
import { styles } from './styles';

interface DetailedViewProps {
  item: CurrentWeather['weather'];
}

export const DetailedView: FC<DetailedViewProps> = ({ item }) => {
  const { title } = enLocale.city.detailed;

  return (
    <View style={styles.container}>
      <Title>{title}:</Title>

      <View style={styles.cardContainer}>
        <Card title="Feels like" info={Math.round(item.temperatureFeelsLike)} />
        <Card title="Wind" info={item.windSpeed} />
      </View>

      <View style={styles.cardContainer}>
        <Card title="Humidity" info={item.humidity} />
        <Card title="Pressure" info={item.pressure} />
      </View>
    </View>
  );
};
