import { ApolloError } from '@apollo/client';
import {
  CityForecast,
  DeleteUserCitiesMutation,
  Exact,
  FetchCurrentWeatherByUserQuery,
  GetCityInput,
} from '@generated';
import { FETCH_CURRENT_WEATHER_BY_USER_QUERY } from '@graphql/queries/fetch-current-weather-by-user';
import client from '@lib/apollo/apollo-client';
import { showErrorMessage } from '@utils/show-error-message';

interface FilterData {
  name: string;
  latitude: number;
  longitude: number;
}

export function deleteCitiesParams(filter: FilterData) {
  const currentData = client.cache.readQuery({
    query: FETCH_CURRENT_WEATHER_BY_USER_QUERY,
  }) as FetchCurrentWeatherByUserQuery;

  const isSameCity = (cacheCity: CityForecast, filterCity: FilterData): boolean => {
    return (
      cacheCity.cityName === filterCity.name &&
      cacheCity.cityCoordinates.latitude === filterCity.latitude &&
      cacheCity.cityCoordinates.longitude === filterCity.longitude
    );
  };

  const optimisticResponse = (
    _vars: Exact<{ payload: GetCityInput | readonly GetCityInput[] }>,
  ): DeleteUserCitiesMutation => {
    client.cache.updateQuery({ query: FETCH_CURRENT_WEATHER_BY_USER_QUERY }, (data) => {
      return {
        weather: (data as FetchCurrentWeatherByUserQuery).weather?.filter((item) => !isSameCity(item.city, filter)),
      };
    });

    return { userCities: 1 };
  };

  const onError = (error: ApolloError): void => {
    const cityIndex = currentData.weather?.findIndex((item) => isSameCity(item.city, filter));

    client.cache.updateQuery({ query: FETCH_CURRENT_WEATHER_BY_USER_QUERY }, (data) => {
      if (cityIndex !== undefined && cityIndex > -1) {
        const currentWeatherCache = [...data.weather];
        currentWeatherCache.splice(cityIndex, 0, currentData.weather?.at(cityIndex));
        return { weather: currentWeatherCache };
      }

      return data;
    });

    showErrorMessage(error);
  };

  return {
    optimisticResponse,
    onError,
  };
}
