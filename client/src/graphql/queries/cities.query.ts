import { gql } from '@apollo/client';

export const CITIES_QUERY = gql`
  query cities($filter: GetCityInput, $parameters: GetCityParametersInput) {
    cities: cities(filter: $filter, parameters: $parameters) {
      id
      name
      country
      latitude
      longitude
    }
  }
`;
