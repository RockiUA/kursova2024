import React, { FC } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { CityHeaderBar } from '@components/screens/city/components';
import { HomeHeaderBar } from '@components/screens/home/components';
import { useCheckAuth } from '@hooks/auth/use-check-auth';
import { City } from '@screens/city';
import { Home } from '@screens/home';
import { Search } from '@screens/search';
import { SignIn } from '@screens/sign-in';
import { SignUp } from '@screens/sign-up';
import { StackParamList } from './interfaces';

export const Navigation: FC = () => {
  const { authState } = useCheckAuth();
  const Stack = createNativeStackNavigator<StackParamList>();

  const initialStart = authState || authState === null;
  const authorized = authState;
  const notAuthorized = !authState;

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {initialStart && (
          <Stack.Screen
            name="Home"
            options={{ header: HomeHeaderBar, headerTransparent: true, animation: 'fade' }}
            component={Home}
          />
        )}

        {notAuthorized && (
          <Stack.Screen name="SignIn" options={{ headerShown: false, animation: 'fade' }} component={SignIn} />
        )}

        {notAuthorized && (
          <Stack.Screen
            name="SignUp"
            options={{ headerShown: false, animation: 'slide_from_right' }}
            component={SignUp}
          />
        )}

        {authorized && (
          <Stack.Screen
            name="Search"
            options={{ headerShown: false, presentation: 'fullScreenModal', animation: 'slide_from_bottom' }}
            component={Search}
          />
        )}

        {authorized && (
          <Stack.Screen
            name="City"
            options={({ route: { params } }) => ({
              header: () => <CityHeaderBar item={params.currentWeather} />,
              headerTransparent: true,
              animation: 'fade_from_bottom',
            })}
            component={City}
          />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};
