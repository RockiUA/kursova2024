import { gql } from '@apollo/client';

export const FETCH_CURRENT_WEATHER_BY_CITY_QUERY = gql`
  query fetchCurrentWeatherByCity($filter: GetCityInput!) {
    weather: fetchCurrentWeatherByCity(filter: $filter) {
      weather {
        date
        temperature
        temperatureFeelsLike
        weather
        weatherDescription
        weatherIcon
        windSpeed
        humidity
        pressure
      }
      city {
        cityName
        cityCoordinates {
          latitude
          longitude
        }
      }
    }
  }
`;
