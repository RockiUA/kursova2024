import { FC } from 'react';
import { ScrollView } from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';
import { Message } from '@components/common/message';
import { StackParamList } from '@core/interfaces';
import { CurrentWeather, ForecastWeather } from './components';
import { styles } from './styles';

export const CityScreen: FC = () => {
  const {
    params: { currentWeather },
  } = useRoute<RouteProp<StackParamList, 'City'>>();

  return (
    <>
      <ScrollView contentContainerStyle={styles.contentContainer} style={styles.container}>
        <CurrentWeather item={currentWeather} />
        <ForecastWeather item={currentWeather} />
      </ScrollView>

      <Message type="error" />
    </>
  );
};
