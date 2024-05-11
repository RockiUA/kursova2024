import { StyleProp, ViewStyle } from 'react-native';
import { AuthType } from './auth-type';

interface FormVariant {
  title: string;
  subtitle: string;
  email: {
    label: string;
    placeholder: string;
  };
  password: {
    label: string;
    placeholder: string;
  };
  submitButtonText: string;
  submitButtonColor: StyleProp<ViewStyle>;
}

export interface FormVariants extends Record<AuthType, FormVariant> {}
