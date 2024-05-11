import { gql } from '@apollo/client';

export const FETCH_FORECAST_BY_CITY_QUERY = gql`
  query fetchForecastByCity($filter: GetCityInput!, $options: FetchForecastInput) {
    forecast: fetchForecastByCity(filter: $filter, options: $options) {
      forecasts {
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
