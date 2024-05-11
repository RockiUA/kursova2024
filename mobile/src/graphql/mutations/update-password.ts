import { gql } from '@apollo/client';

export const UPDATE_PASSWORD_MUTATION = gql`
  mutation updatePassword($payload: UpdatePasswordInput!) {
    user: updatePassword(payload: $payload) {
      id
      email
      cities {
        id
        name
        longitude
        latitude
      }
    }
  }
`;
