import { useForm } from 'react-hook-form';
import { emailRegex } from '@utils/regexes';

export const useAuthForm = () => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const registerEmail = () => {
    return {
      control,
      ...register('email'),
      rules: {
        required: 'Email is required!',
        pattern: {
          value: emailRegex,
          message: 'Email address is invalid!',
        },
      },
      errors: errors.email,
    };
  };

  const registerPassword = () => {
    return {
      control,
      ...register('password'),
      rules: {
        required: 'Password is required!',
        minLength: { value: 8, message: 'Password must have at least 8 symbols!' },
        maxLength: { value: 64, message: 'Password must be shorter than 64 symbols!' },
      },
      errors: errors.password,
    };
  };

  return {
    handleSubmit,
    registerEmail,
    registerPassword,
  };
};
