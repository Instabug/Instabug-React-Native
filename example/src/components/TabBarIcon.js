import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';

export function createTabBarIcon(route) {
  return (props) => {
    <TabBarIcon route={route} {...props} />;
  };
}

export function TabBarIcon({ route, focused, color, size }) {
  let name = route.name.toLowerCase();
  if (!focused) {
    name += '-outline';
  }

  return <Icon name={name} focused color={color} size={size} />;
}
