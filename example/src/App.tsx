import React, { useEffect } from 'react';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import Instabug from 'instabug-reactnative';

import { createTabBarIcon } from './components/TabBarIcon';
import { HomeScreen } from './screens/HomeScreen';
import { SettingsScreen } from './screens/SettingsScreen';

export type RootStackParamList = {
  Home: undefined;
  Settings: undefined;
};

const Tab = createBottomTabNavigator<RootStackParamList>();

export const App: React.FC = () => {
  useEffect(() => {
    Instabug.init({
      token: '2c63627b9923e10eee2c8abf92e6925f',
      invocationEvents: [Instabug.invocationEvent.floatingButton],
    });
  }, []);

  return (
    <NavigationContainer onStateChange={Instabug.onStateChange}>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: createTabBarIcon(route),
        })}>
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Settings" component={SettingsScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};
