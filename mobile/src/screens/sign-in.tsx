import React, { FC } from 'react';
import { StatusBar } from 'react-native';
import { SignInScreen } from '@components/screens/sign-in';
import { mobileConfig } from '@config/mobile';

export const SignIn: FC = () => {
  const { signIn } = mobileConfig.statusbar;

  return (
    <>
      <StatusBar {...signIn} />
      <SignInScreen />
    </>
  );
};
