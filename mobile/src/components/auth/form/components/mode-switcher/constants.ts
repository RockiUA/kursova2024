import enLocale from '@public/locales/en.json';
import { ModeSwitcherVariants } from './interfaces';
import { AuthType } from '../../interfaces';

export const modeSwitcherVariants: ModeSwitcherVariants = {
  [AuthType.SIGN_IN]: {
    text: enLocale.signIn.form.modeSwitch.text,
    screen: 'SignUp',
    linkText: enLocale.signIn.form.modeSwitch.linkText,
  },
  [AuthType.SIGN_UP]: {
    text: enLocale.signUp.form.modeSwitch.text,
    screen: 'SignIn',
    linkText: enLocale.signUp.form.modeSwitch.linkText,
  },
};
