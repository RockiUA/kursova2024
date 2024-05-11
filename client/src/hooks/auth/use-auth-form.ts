import { UseFormRegisterReturn, useForm } from 'react-hook-form';
import enLocale from '@public/locales/en.json';
import { emailRegex } from '@utils/regexes';

export const useAuthForm = () => {
  const { email, password } = enLocale.auth.form;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const registerEmail = (): UseFormRegisterReturn<'email'> => {
    return register('email', {
      required: email.errors.required,
      pattern: {
        value: emailRegex,
        message: email.errors.pattern,
      },
    });
  };

  const registerPassword = (): UseFormRegisterReturn<'password'> => {
    return register('password', {
      required: password.errors.required,
      minLength: { value: 8, message: password.errors.minLength },
      maxLength: { value: 64, message: password.errors.maxLength },
    });
  };

  return {
    handleSubmit,
    errors,
    registerEmail,
    registerPassword,
  };
};
