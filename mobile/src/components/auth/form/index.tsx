import React, { FC } from 'react';
import { View } from 'react-native';
import { SignInInput, SignUpInput } from '@generated';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Button, Text, TextInput } from 'react-native-paper';
import { Input } from '@components/common/input';
import { useAuthForm } from '@hooks/auth/use-auth-form';
import { usePasswordToggle } from '@hooks/auth/use-password-toggle';
import { ModeSwitcher } from './components';
import { formVariants } from './constants';
import { AuthType, SubmitFields } from './interfaces';
import { styles } from './styles';

interface FormProps {
  type: `${AuthType}`;
  hook: (body: SignInInput | SignUpInput) => void;
}

const Form: FC<FormProps> = ({ type, hook }) => {
  const { isPasswordHidden, togglePasswordVisibility } = usePasswordToggle(true);
  const { registerEmail, registerPassword, handleSubmit } = useAuthForm();
  const { title, subtitle, email, password, submitButtonText, submitButtonColor } = formVariants[type];
  const { label: emailLabel, placeholder: emailPlaceholder } = email;
  const { label: passwordLabel, placeholder: passwordPlaceholder } = password;

  return (
    <KeyboardAwareScrollView>
      <View style={styles.formContainer}>
        <View>
          <Text variant="headlineMedium">{title}</Text>
          <Text style={styles.subtitle} variant="bodyLarge">
            {subtitle}
          </Text>
        </View>

        <Input {...registerEmail()} label={emailLabel} placeholder={emailPlaceholder} />

        <Input
          {...registerPassword()}
          label={passwordLabel}
          placeholder={passwordPlaceholder}
          secureTextEntry={isPasswordHidden}
          right={<TextInput.Icon onPress={togglePasswordVisibility} icon="eye" />}
        />

        <Button
          onPress={handleSubmit((data) => hook(data as SubmitFields))}
          mode="contained-tonal"
          style={[styles.submitButton, submitButtonColor]}
          textColor="#FFFFFF"
        >
          {submitButtonText}
        </Button>

        <ModeSwitcher type={type} />
      </View>
    </KeyboardAwareScrollView>
  );
};

export default Form;
