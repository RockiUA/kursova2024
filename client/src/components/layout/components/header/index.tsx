import { FC } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Typography } from '@mui/joy';
import { clientConfig } from '@config/client.config';
import logo from '@public/assets/logo.svg';
import { AuthButtonsGroup } from './components';
import styles from './header.module.css';

export const Header: FC = () => {
  const { appName } = clientConfig;

  return (
    <header className={styles.headerContainer}>
      <div className={styles.headerBody}>
        <Link href="/" className={styles.logo}>
          <Image src={logo.src} alt="Logo" width={50} height={50} />
          <Typography level="h4" className={styles.logoHeading}>
            {appName}
          </Typography>
        </Link>

        <AuthButtonsGroup />
      </div>
    </header>
  );
};
