import enLocale from '@public/locales/en.json';
import { AuthTypes } from '../interfaces/auth-types.interface';

export const AuthProps = {
  [AuthTypes.SIGN_IN]: {
    label: enLocale.signIn.form.submitButton.label,
  },
  [AuthTypes.SIGN_UP]: {
    label: enLocale.signUp.form.submitButton.label,
  },
};
