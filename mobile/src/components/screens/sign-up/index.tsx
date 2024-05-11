import React, { FC } from 'react';
import { Image, View } from 'react-native';
import Form from '@components/auth/form';
import { Message } from '@components/common/message';
import { styles } from '@components/screens/common/sign/styles';
import { useSignUp } from '@hooks/auth/use-sign-up';
import background from '@public/assets/auth/signup-background.jpg';

export const SignUpScreen: FC = () => {
  const { register } = useSignUp();

  return (
    <View style={styles.container}>
      <Image source={background} style={styles.image} />
      <View style={styles.contentBody}>
        <Form type="sign-up" hook={register} />
        <Message type="error" />
      </View>
    </View>
  );
};
