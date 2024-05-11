import { CurrentWeather } from '@generated';
import { useNavigation } from '@react-navigation/native';
import { NavigationProps } from '@core/interfaces';

export const useCityCard = () => {
  const navigation = useNavigation<NavigationProps>();

  const openCard = (item: CurrentWeather): void => {
    navigation.navigate('City', { currentWeather: item });
  };

  return {
    openCard,
  };
};
