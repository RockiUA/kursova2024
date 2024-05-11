import { FC } from 'react';
import Link from 'next/link';
import { Button, Typography } from '@mui/joy';
import enLocale from '@public/locales/en.json';
import styles from './mode-buttons.module.css';

export const ModeButtons: FC = () => {
  const { signIn, or, signUp } = enLocale.header.auth;

  return (
    <div className={styles.authButtonGroup}>
      <Link href="/sign-in">
        <Button color="primary" variant="soft" className={styles.button}>
          {signIn}
        </Button>
      </Link>

      <Typography level="body2" color="neutral">
        {or}
      </Typography>

      <Link href="/sign-up">
        <Button color="danger" variant="soft" className={styles.button}>
          {signUp}
        </Button>
      </Link>
    </div>
  );
};
