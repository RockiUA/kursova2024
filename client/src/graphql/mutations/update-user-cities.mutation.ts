import { gql } from '@apollo/client';

export const UPDATE_USER_CITIES_MUTATION = gql`
  mutation updateUserCity($filter: GetCityInput!, $payload: GetCityInput!) {
    userCities: updateUserCity(filter: $filter, payload: $payload) {
      userId
      cityId
    }
  }
`;
