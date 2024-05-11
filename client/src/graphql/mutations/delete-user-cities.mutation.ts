import { gql } from '@apollo/client';

export const DELETE_USER_CITIES_MUTATION = gql`
  mutation deleteUserCities($payload: [GetCityInput!]!) {
    userCities: deleteUserCities(payload: $payload)
  }
`;
