import { GetCityInput, useAddUserCitiesMutation, useFetchCurrentWeatherByUserLazyQuery } from '@generated';
import { showErrorMessage } from '@utils/show-error-message';

interface UseSearchItemListArgs {
  closeList: () => void;
}

export const useSearchItemList = ({ closeList }: UseSearchItemListArgs) => {
  const [addUserCities, { loading: isAddCityPerforming }] = useAddUserCitiesMutation({ onError: showErrorMessage });
  const [fetchCurrent] = useFetchCurrentWeatherByUserLazyQuery({
    fetchPolicy: 'cache-and-network',
    onError: showErrorMessage,
  });

  const onAddUserCitiesCompleted = () => {
    closeList();
    fetchCurrent();
  };

  const addUserCity = (item: GetCityInput) => {
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
