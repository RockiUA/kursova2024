import { FC } from 'react';
import { SignInInput, SignUpInput } from '@generated';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { Button, FormControl, FormLabel, Input, Typography } from '@mui/joy';
import { ColorPaletteProp } from '@mui/joy';
import { Message } from '@components/common/message';
import { useAuthForm } from '@hooks/auth/use-auth-form';
import { usePasswordToggle } from '@hooks/common/use-password-toggle';
import enLocale from '@public/locales/en.json';
import { MemoizedModeSwitcher } from './components';
import { AuthProps } from './constants/constants';
import { visibilityIconStylesResolver } from './helpers/visibility-icon';
import { AuthTypes } from './interfaces/auth-types.interface';
import { SubmitFields } from './interfaces/submit-fields.interface';
import styles from './form.module.css';

interface FormProps {
  color: ColorPaletteProp;
  type: `${AuthTypes}`;
  hook: (body: SignInInput | SignUpInput) => void;
}

export const Form: FC<FormProps> = ({ color, type, hook }) => {
  const { label } = AuthProps[type];
  const { email, password } = enLocale.auth.form;
  const { passwordShown, togglePasswordVisibility } = usePasswordToggle(false);
  const { handleSubmit, errors, registerEmail, registerPassword } = useAuthForm();

  return (
    <form onSubmit={handleSubmit((data) => hook(data as SubmitFields))} className={styles.form}>
      <Message type="error" position="block" />

      <FormControl>
        <FormLabel>{email.label}</FormLabel>
        <Input {...registerEmail()} variant="soft" type="email" name="email" placeholder={email.placeholder} />

        <Typography level="body2" color="danger">
          {errors.email?.message as string}
        </Typography>
      </FormControl>

      <FormControl>
        <FormLabel>{password.label}</FormLabel>
        <Input
          {...registerPassword()}
          variant="soft"
          name="password"
          type={passwordShown ? 'text' : 'password'}
          placeholder={password.placeholder}
          endDecorator={
            <VisibilityIcon
              className={visibilityIconStylesResolver(passwordShown)}
              onClick={togglePasswordVisibility}
            />
          }
        />

        <Typography level="body2" color="danger">
          {errors.password?.message as string}
        </Typography>
      </FormControl>

      <Button type="submit" color={color} className={styles.submitButton}>
        {label}
      </Button>

      <MemoizedModeSwitcher type={type} />
    </form>
  );
};
