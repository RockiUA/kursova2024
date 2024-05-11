import { SignUpInput, useSignUpMutation } from '@generated';
import { useNavigation } from '@react-navigation/native';
import { NavigationProps } from '@core/interfaces';
import { useMessage } from '@hooks/common/use-message';
import client from '@lib/apollo/apollo-client';
import { authenticated } from '@lib/apollo/apollo-constants';
import { showErrorMessage } from '@utils/show-error-message';

export const useSignUp = () => {
  const { clearMessage } = useMessage();
  const navigation = useNavigation<NavigationProps>();
  const [signUpLocalMutation] = useSignUpMutation({ onError: showErrorMessage });

  const onSignUpCompleted = (): void => {
    client.refetchQueries({ include: 'active' });
    authenticated(true);
    navigation.navigate('Home');
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
