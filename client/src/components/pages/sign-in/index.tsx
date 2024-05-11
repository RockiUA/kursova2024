import { FC } from 'react';
import { Sheet, Typography } from '@mui/joy';
import { Form } from '@components/auth/form';
import { useSignIn } from '@hooks/auth/use-sign-in';
import image from '@public/assets/signin-background.jpg';
import enLocale from '@public/locales/en.json';
import styles from './sign-in.module.css';

export const SignInPage: FC = () => {
  const { title, subtitle } = enLocale.signIn;
  const { login } = useSignIn();

  return (
    <div className={styles.container}>
      <div className={styles.contentBody}>
        <Sheet className={styles.card} variant="plain">
          <Typography level="h4" component="h1">
            {title}
          </Typography>

          <Typography level="body1" color="neutral">
            {subtitle}
          </Typography>

          <Form color="primary" type="sign-in" hook={login} />
        </Sheet>
      </div>

      <div className={styles.backgroundImage} style={{ backgroundImage: `url(${image.src})` }} />
    </div>
  );
};
