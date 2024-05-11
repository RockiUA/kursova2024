import { gql } from '@apollo/client';

export const FETCH_CURRENT_WEATHER_BY_USER_QUERY = gql`
  query fetchCurrentWeatherByUser {
    weather: fetchCurrentWeatherByUser {
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
        id
        cityName
        cityCoordinates {
          latitude
          longitude
        }
      }
    }
  }
`;
