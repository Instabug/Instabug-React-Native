import React from 'react';

import type { BottomTabNavigationOptions } from '@react-navigation/bottom-tabs';
import type { RouteProp } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';

import type { RootStackParamList } from '../App';

interface TabBarIconProps {
  route: RouteProp<RootStackParamList>;
  focused: boolean;
  color: string;
  size: number;
}

export const createTabBarIcon = (
  route: RouteProp<RootStackParamList>,
): BottomTabNavigationOptions['tabBarIcon'] => {
  return (props) => <TabBarIcon {...props} route={route} />;
};

export const TabBarIcon: React.FC<TabBarIconProps> = ({ route, focused, color, size }) => {
  let name = route.name.toLowerCase();
  if (!focused) {
    name += '-outline';
  }

  return <Icon name={name} color={color} size={size} />;
};
