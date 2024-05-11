import { FC } from 'react';
import { withGuard } from '@components/auth/guard';
import { withLayout } from '@components/layout';
import { HomePage } from '@components/pages/home';

const Home: FC = () => {
  return <HomePage />;
};

export default withGuard(withLayout(Home));
