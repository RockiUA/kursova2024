import { StatusBarProps } from 'react-native';

export interface MobileConfig {
  statusbar: {
    city: StatusBarProps;
    home: StatusBarProps;
    search: StatusBarProps;
    signIn: StatusBarProps;
    signUp: StatusBarProps;
  };
  city: {
    forecastDays: number;
  };
}
