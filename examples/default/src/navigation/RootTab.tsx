import React from 'react';

import {
  BottomTabNavigationOptions,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';

import { SettingsScreen } from '../screens/SettingsScreen';
import { HomeStackNavigator } from './HomeStack';
import { Platform } from 'react-native';

export type RootTabParamList = {
  HomeStack: undefined;
  Settings: undefined;
};

const RootTab = createBottomTabNavigator<RootTabParamList>();

const createTabBarIcon = (name: string): BottomTabNavigationOptions['tabBarIcon'] => {
  return (props) => <Icon name={name} {...props} />;
};

export const RootTabNavigator: React.FC = () => {
  return (
    <RootTab.Navigator screenOptions={{ tabBarHideOnKeyboard: Platform.OS !== 'ios' }}>
      <RootTab.Screen
        name="HomeStack"
        component={HomeStackNavigator}
        options={{
          tabBarLabel: 'Home',
          headerShown: false,
          tabBarIcon: createTabBarIcon('home'),
        }}
      />
      <RootTab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          tabBarIcon: createTabBarIcon('settings'),
        }}
      />
    </RootTab.Navigator>
  );
};
