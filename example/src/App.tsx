import React, { useEffect } from 'react';

import { NavigationContainer } from '@react-navigation/native';
import Instabug from 'instabug-reactnative';

import { RootTabNavigator } from './navigation/RootTab';

export const App: React.FC = () => {
  useEffect(() => {
    Instabug.init({
      token: '2c63627b9923e10eee2c8abf92e6925f',
      invocationEvents: [Instabug.invocationEvent.floatingButton],
    });
  }, []);

  return (
    <NavigationContainer onStateChange={Instabug.onStateChange}>
      <RootTabNavigator />
    </NavigationContainer>
  );
};
