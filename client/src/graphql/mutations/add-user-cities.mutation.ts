import { gql } from '@apollo/client';

export const ADD_USER_CITIES_MUTATION = gql`
  mutation addUserCities($payload: [GetCityInput!]!) {
    userCities: addUserCities(payload: $payload) {
      userId
      cityId
    }
  }
`;
