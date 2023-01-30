import React from 'react';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';

import { SettingsScreen } from '../screens/SettingsScreen';
import { HomeStackNavigator } from './HomeStack';

export type RootTabParamList = {
  HomeStack: undefined;
  Settings: undefined;
};

const RootTab = createBottomTabNavigator<RootTabParamList>();

export const RootTabNavigator: React.FC = () => {
  return (
    <RootTab.Navigator>
      <RootTab.Screen
        name="HomeStack"
        component={HomeStackNavigator}
        options={{
          tabBarLabel: 'Home',
          headerShown: false,
          // eslint-disable-next-line react/no-unstable-nested-components
          tabBarIcon: (props) => <Icon name="home" {...props} />,
        }}
      />
      <RootTab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          // eslint-disable-next-line react/no-unstable-nested-components
          tabBarIcon: (props) => <Icon name="settings" {...props} />,
        }}
      />
    </RootTab.Navigator>
  );
};
