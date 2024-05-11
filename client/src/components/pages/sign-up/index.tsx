import { FC } from 'react';
import { Sheet, Typography } from '@mui/joy';
import { Form } from '@components/auth/form';
import { useSignUp } from '@hooks/auth/use-sign-up';
import image from '@public/assets/signup-background.jpg';
import styles from './sign-up.module.css';

export const SignUpPage: FC = () => {
  const { register } = useSignUp();

  return (
    <div className={styles.container}>
      <div className={styles.backgroundImage} style={{ backgroundImage: `url(${image.src})` }} />

      <div className={styles.contentBody}>
        <Sheet className={styles.card} variant="plain">
          <Typography level="h4" component="h1">
            Welcome to Sunny Days
          </Typography>

          <Typography level="body1" color="neutral">
            Let&apos;s get started! Please enter your details.
          </Typography>

          <Form color="danger" type="sign-up" hook={register} />
        </Sheet>
      </div>
    </div>
  );
};
