import enLocale from '@public/locales/en.json';
import { AuthType, FormVariants } from './interfaces';
import { styles } from './styles';

export const formVariants: FormVariants = {
  [AuthType.SIGN_IN]: {
    title: enLocale.signIn.title,
    subtitle: enLocale.signIn.subtitle,
    email: {
      label: enLocale.signIn.form.email.label,
      placeholder: enLocale.signIn.form.email.placeholder,
    },
    password: {
      label: enLocale.signIn.form.password.label,
      placeholder: enLocale.signIn.form.password.placeholder,
    },
    submitButtonText: enLocale.signIn.form.submit.text,
    submitButtonColor: styles.signInButtonColor,
  },
  [AuthType.SIGN_UP]: {
    title: enLocale.signUp.title,
    subtitle: enLocale.signUp.subtitle,
    email: {
      label: enLocale.signUp.form.email.label,
      placeholder: enLocale.signUp.form.email.placeholder,
    },
    password: {
      label: enLocale.signUp.form.password.label,
      placeholder: enLocale.signUp.form.password.placeholder,
    },
    submitButtonText: enLocale.signUp.form.submit.text,
    submitButtonColor: styles.signUpButtonColor,
  },
};
