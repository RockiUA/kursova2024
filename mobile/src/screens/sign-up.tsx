import React, { FC } from 'react';
import { StatusBar } from 'react-native';
import { SignUpScreen } from '@components/screens/sign-up';
import { mobileConfig } from '@config/mobile';

export const SignUp: FC = () => {
  const { signUp } = mobileConfig.statusbar;

  return (
    <>
      <StatusBar {...signUp} />
      <SignUpScreen />
    </>
  );
};
