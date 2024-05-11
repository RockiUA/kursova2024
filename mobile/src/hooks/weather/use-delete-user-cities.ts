import { CurrentWeather, useDeleteUserCitiesMutation } from '@generated';
import { deleteCitiesParams } from '@helpers/delete-cities-params';
import { showErrorMessage } from '@utils/show-error-message';

export const useDeleteUserCities = () => {
  const [deleteCities, { loading: isDeletePerforming }] = useDeleteUserCitiesMutation({
    onError: showErrorMessage,
  });

  const deleteUserCities = (item: CurrentWeather): void => {
    const filter = {
      name: item.city.cityName,
      latitude: item.city.cityCoordinates.latitude,
      longitude: item.city.cityCoordinates.longitude,
    };

    const { optimisticResponse, onError } = deleteCitiesParams(filter);
    deleteCities({ variables: { payload: [filter] }, optimisticResponse, onError });
  };

  return {
    isDeletePerforming,
    deleteUserCities,
  };
};
