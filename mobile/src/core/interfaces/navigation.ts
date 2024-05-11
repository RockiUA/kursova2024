import { CurrentWeather } from '@generated';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

export interface StackParamList extends Record<string, object | undefined> {
  SignIn: undefined;
  SignUp: undefined;
  Home: undefined;
  Search: undefined;
  City: {
    currentWeather: CurrentWeather;
  };
}

export type NavigationProps = NativeStackNavigationProp<StackParamList>;
