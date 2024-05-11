import classNames from 'classnames';
import styles from '../form.module.css';

export function visibilityIconStylesResolver(passwordShown: boolean): string {
  return classNames({ [styles.active]: !passwordShown, [styles.disabled]: passwordShown });
}
