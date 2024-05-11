import { KeyboardEvent, SyntheticEvent, useCallback, useState } from 'react';
import { CurrentWeather, useDeleteUserCitiesMutation } from '@generated';
import { deleteUserCitiesOptions } from '@helpers/delete-user-cities-options';
import { showErrorMessage } from '@utils/show-error-message';

export const useCityCard = () => {
  const [isModalOpened, setModalOpened] = useState<boolean>(false);
  const [deleteUserCities, { loading: isDeletePerforming }] = useDeleteUserCitiesMutation({
    onError: showErrorMessage,
  });

  const openCard = useCallback(() => setModalOpened(true), []);
  const closeCard = useCallback(() => setModalOpened(false), []);

  const openCardOnKey = useCallback((event: KeyboardEvent) => {
    if (event.code === 'Enter' || event.code === 'Space') {
      setModalOpened(true);
    }
  }, []);

  const deleteCard = (event: SyntheticEvent, item: CurrentWeather): void => {
    event.stopPropagation();

    const filter = {
      name: item.city.cityName,
      latitude: item.city.cityCoordinates.latitude,
      longitude: item.city.cityCoordinates.longitude,
    };

    const { optimisticResponse, onError } = deleteUserCitiesOptions(filter);
    deleteUserCities({ variables: { payload: [filter] }, optimisticResponse, onError });
  };

  const deleteCardOnKey = (event: KeyboardEvent, item: CurrentWeather): void => {
    if (event.code === 'Enter' || event.code === 'Space') {
      deleteCard(event, item);
    }
  };

  return {
    isModalOpened,
    isDeletePerforming,
    openCard,
    openCardOnKey,
    closeCard,
    deleteCard,
    deleteCardOnKey,
  };
};
