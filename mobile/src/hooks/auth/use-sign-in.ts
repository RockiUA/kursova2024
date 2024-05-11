import { SignInInput, useSignInMutation } from '@generated';
import { useNavigation } from '@react-navigation/native';
import { NavigationProps } from '@core/interfaces';
import { useMessage } from '@hooks/common/use-message';
import client from '@lib/apollo/apollo-client';
import { authenticated } from '@lib/apollo/apollo-constants';
import { showErrorMessage } from '@utils/show-error-message';

export const useSignIn = () => {
  const { clearMessage } = useMessage();
  const navigation = useNavigation<NavigationProps>();
  const [signInLocalMutation] = useSignInMutation({ onError: showErrorMessage });

  const onSignInCompleted = (): void => {
    client.refetchQueries({ include: 'active' });
    authenticated(true);
    navigation.navigate('Home');
  };

  const login = (body: SignInInput): void => {
    clearMessage();

    signInLocalMutation({
      variables: {
        input: {
          email: body.email,
          password: body.password,
        },
      },
      onCompleted: onSignInCompleted,
    });
  };

  return {
    login,
  };
};
