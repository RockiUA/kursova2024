import { gql } from '@apollo/client';

export const SIGN_IN_MUTATION = gql`
  mutation signIn($input: SignInInput!) {
    signIn(input: $input) {
      authenticated
    }
  }
`;
