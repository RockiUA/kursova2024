import { useRouter } from 'next/router';
import { SignUpInput, useSignUpMutation } from '@generated';
import { useMessage } from '@hooks/common/use-message';
import client from '@lib/apollo/apollo-client';
import { authenticated } from '@lib/apollo/apollo-constants';
import { showErrorMessage } from '@utils/show-error-message';

export const useSignUp = () => {
  const { clearMessage } = useMessage();
  const [signUpLocalMutation] = useSignUpMutation({ onError: showErrorMessage });
  const router = useRouter();

  const onSignUpCompleted = (): void => {
    client.refetchQueries({ include: 'active' });
    authenticated(true);
    router.push('/');
  };

  const register = (body: SignUpInput): void => {
    clearMessage();

    signUpLocalMutation({
      variables: {
        input: {
          email: body.email,
          password: body.password,
        },
      },
      onCompleted: onSignUpCompleted,
    });
  };

  return {
    register,
  };
};
