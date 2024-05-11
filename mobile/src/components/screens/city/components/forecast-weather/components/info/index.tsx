import { FC } from 'react';
import { Image, View } from 'react-native';
import { Weather } from '@generated';
import { Text } from 'react-native-paper';
import { formattedDate } from './helpers';
import { styles } from './styles';

interface InfoProps {
  info: Omit<Weather, 'humidity' | 'pressure'>;
  index: number;
}

export const Info: FC<InfoProps> = ({ info, index }) => {
  return (
    <View style={styles.container}>
      <Text variant="bodyLarge" style={styles.date}>
        {formattedDate(index + 1)}
      </Text>

      <View style={styles.weather}>
        <Image source={{ uri: info.weatherIcon }} style={styles.image} />
        <Text variant="bodyLarge" style={styles.weatherText}>
          {info.weather}
        </Text>
      </View>

      <Text variant="bodyLarge" style={styles.temperature}>
        {Math.round(info.temperature)} °C
      </Text>
    </View>
  );
};
