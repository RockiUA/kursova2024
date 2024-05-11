import { gql } from '@apollo/client';

export const FETCH_FORECAST_BY_USER_QUERY = gql`
  query fetchForecastByUser($options: FetchForecastInput) {
    forecast: fetchForecastByUser(options: $options) {
      forecasts {
        date
        temperature
        temperatureFeelsLike
        weather
        weatherDescription
        weatherIcon
        windSpeed
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
