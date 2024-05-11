import React, { FC } from 'react';
import { Image, View } from 'react-native';
import Form from '@components/auth/form';
import { Message } from '@components/common/message';
import { styles } from '@components/screens/common/sign/styles';
import { useSignIn } from '@hooks/auth/use-sign-in';
import background from '@public/assets/auth/signin-background.jpg';

export const SignInScreen: FC = () => {
  const { login } = useSignIn();

  return (
    <View style={styles.container}>
      <Image source={background} style={styles.image} />
      <View style={styles.contentBody}>
        <Form type="sign-in" hook={login} />
        <Message type="error" />
      </View>
    </View>
  );
};
