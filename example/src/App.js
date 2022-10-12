import React, { useEffect } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import Instabug from 'instabug-reactnative';
import { createTabBarIcon } from './components/TabBarIcon';
import { HomeScreen } from './screens/HomeScreen';
import { SettingsScreen } from './screens/SettingsScreen';

const Tab = createBottomTabNavigator();

export function App() {
  useEffect(() => {
    Instabug.start('2c63627b9923e10eee2c8abf92e6925f', [Instabug.invocationEvent.floatingButton]);
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
}
