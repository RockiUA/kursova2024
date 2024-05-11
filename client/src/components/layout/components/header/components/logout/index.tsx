import { FC } from 'react';
import { MeQuery } from '@generated';
import { Button, Typography } from '@mui/joy';
import { useLogout } from '@hooks/auth/use-logout';
import enLocale from '@public/locales/en.json';
import styles from './logout.module.css';

interface LogoutProps {
  me?: MeQuery['me'];
}

export const Logout: FC<LogoutProps> = ({ me }) => {
  const { greeting, logoutButton } = enLocale.header.logout;
  const { isLogoutPerforming, logout } = useLogout();

  return (
    <div className={styles.container}>
      <Typography level="body1">
        {greeting}, {me?.email}!
      </Typography>

      <Button disabled={isLogoutPerforming} onClick={logout} color="primary" variant="soft">
        {logoutButton}
      </Button>
    </div>
  );
};
