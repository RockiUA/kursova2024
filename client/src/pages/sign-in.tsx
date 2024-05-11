import { FC } from 'react';
import { withLayout } from '@components/layout';
import { SignInPage } from '@components/pages/sign-in';

const SignIn: FC = () => {
  return <SignInPage />;
};

export default withLayout(SignIn);
