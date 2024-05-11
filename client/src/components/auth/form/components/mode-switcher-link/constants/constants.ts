import enLocale from '@public/locales/en.json';
import { AuthTypes } from '../../../interfaces/auth-types.interface';

export const AuthLinkProps = {
  [AuthTypes.SIGN_IN]: {
    href: '/sign-up',
    label: enLocale.signIn.formSwitcher.link,
  },
  [AuthTypes.SIGN_UP]: {
    href: '/sign-in',
    label: enLocale.signUp.formSwitcher.link,
  },
};
