import { gql } from '@apollo/client';

export const UPDATE_USER_MUTATION = gql`
  mutation updateUser($payload: UpdateUserInput!) {
    user: updateUser(payload: $payload) {
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
