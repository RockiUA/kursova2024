import { CurrentWeather } from '@generated';
import { useNavigation } from '@react-navigation/native';
import { NavigationProps } from '@core/interfaces';
import { useDeleteUserCities } from '@hooks/weather/use-delete-user-cities';

interface UseCityPressActionsProps {
  closeMenu: () => void;
}

export const useCityPressActions = ({ closeMenu }: UseCityPressActionsProps) => {
  const navigation = useNavigation<NavigationProps>();
  const { isDeletePerforming, deleteUserCities } = useDeleteUserCities();

  const onDeleteClick = (item: CurrentWeather) => {
    closeMenu();
    deleteUserCities(item);
    navigation.navigate('Home');
  };

  return {
    navigation,
    isDeletePerforming,
    onDeleteClick,
  };
};
