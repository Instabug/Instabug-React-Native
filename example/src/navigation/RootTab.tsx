import React from 'react';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { createTabBarIcon } from '../components/TabBarIcon';
import { SettingsScreen } from '../screens/SettingsScreen';
import { HomeStackNavigator } from './HomeStack';

export type RootTabParamList = {
  Home: undefined;
  Settings: undefined;
};

const RootTab = createBottomTabNavigator<RootTabParamList>();

export const RootTabNavigator: React.FC = () => {
  return (
    <RootTab.Navigator
      screenOptions={({ route }) => ({
        headerShown: route.name === 'Settings',
        tabBarIcon: createTabBarIcon(route),
      })}>
      <RootTab.Screen name="Home" component={HomeStackNavigator} />
      <RootTab.Screen name="Settings" component={SettingsScreen} />
    </RootTab.Navigator>
  );
};
