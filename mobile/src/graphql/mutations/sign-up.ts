import { gql } from '@apollo/client';

export const SIGN_UP_MUTATION = gql`
  mutation signUp($input: SignUpInput!) {
    signUp(input: $input) {
      authenticated
    }
  }
`;
