import { FC } from 'react';
import { withLayout } from '@components/layout';
import { SignUpPage } from '@components/pages/sign-up';

const SignUp: FC = () => {
  return <SignUpPage />;
};

export default withLayout(SignUp);
