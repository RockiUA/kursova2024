import enLocale from '@public/locales/en.json';
import { AuthTypes } from '../../../interfaces/auth-types.interface';

export const modeSwitcherText = {
  [AuthTypes.SIGN_IN]: enLocale.signIn.formSwitcher.text,
  [AuthTypes.SIGN_UP]: enLocale.signUp.formSwitcher.text,
};
