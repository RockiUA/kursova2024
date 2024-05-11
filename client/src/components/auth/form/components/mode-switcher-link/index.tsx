import { FC } from 'react';
import Link from 'next/link';
import { AuthLinkProps } from './constants/constants';
import { AuthTypes } from '../../interfaces/auth-types.interface';
import styles from './mode-switcher-link.module.css';

interface ModeSwitcherLinkProps {
  type: `${AuthTypes}`;
}

export const ModeSwitcherLink: FC<ModeSwitcherLinkProps> = ({ type }) => {
  const { href, label } = AuthLinkProps[type];

  return (
    <Link className={styles.link} href={href}>
      {label}
    </Link>
  );
};
