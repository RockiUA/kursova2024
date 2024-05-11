import { StackParamList } from '@core/interfaces';
import { AuthType } from '../../interfaces';

interface ModeSwitcherVariant {
  text: string;
  screen: keyof Pick<StackParamList, 'SignIn' | 'SignUp'>;
  linkText: string;
}

export interface ModeSwitcherVariants extends Record<AuthType, ModeSwitcherVariant> {}
