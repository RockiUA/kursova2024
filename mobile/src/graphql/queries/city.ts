import { gql } from '@apollo/client';

export const CITY_QUERY = gql`
  query city($filter: GetCityInput!) {
    city: city(filter: $filter) {
      id
      name
      country
      latitude
      longitude
    }
  }
`;
