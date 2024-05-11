import { Keyboard } from 'react-native';
import { GetCityInput, useAddUserCitiesMutation, useFetchCurrentWeatherByUserLazyQuery } from '@generated';
import { useNavigation } from '@react-navigation/native';
import { NavigationProps } from '@core/interfaces';
import { showErrorMessage } from '@utils/show-error-message';

export const useSearchItem = () => {
  const navigation = useNavigation<NavigationProps>();
  const [addUserCities, { loading: isAddCityPerforming }] = useAddUserCitiesMutation({ onError: showErrorMessage });
  const [fetchCurrent] = useFetchCurrentWeatherByUserLazyQuery({
    fetchPolicy: 'cache-and-network',
    onError: showErrorMessage,
  });

  const onAddUserCitiesCompleted = () => {
    navigation.goBack();
    fetchCurrent();
  };

  const addUserCity = (item: GetCityInput) => {
    Keyboard.dismiss();

    const filter = {
      name: item.name,
      latitude: item.latitude,
      longitude: item.longitude,
    };

    addUserCities({ variables: { payload: [filter] }, onCompleted: onAddUserCitiesCompleted });
  };

  return {
    isAddCityPerforming,
    addUserCity,
  };
};
