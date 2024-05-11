import { FC, memo } from 'react';
import { Sheet, Typography } from '@mui/joy';
import enLocale from '@public/locales/en.json';
import { modeSwitcherText } from './constants/constants';
import { ModeSwitcherLink } from '../mode-switcher-link';
import { AuthTypes } from '../../interfaces/auth-types.interface';
import styles from './mode-switcher.module.css';

interface ModeSwitcherProps {
  type: `${AuthTypes}`;
}

const ModeSwitcher: FC<ModeSwitcherProps> = ({ type }) => {
  const text = modeSwitcherText[type];

  return (
    <Sheet className={styles.modeSwitcher} variant="outlined">
      <Typography endDecorator={<ModeSwitcherLink type={type} />} fontSize="sm" sx={{ alignSelf: 'center' }}>
        {text}
      </Typography>
    </Sheet>
  );
};

export const MemoizedModeSwitcher = memo(ModeSwitcher);
