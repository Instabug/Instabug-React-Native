import React, { useEffect } from 'react';

import { NavigationContainer } from '@react-navigation/native';
import Instabug from 'instabug-reactnative';
import { NativeBaseProvider } from 'native-base';

import { RootTabNavigator } from './navigation/RootTab';

export const App: React.FC = () => {
  useEffect(() => {
    Instabug.init({
      token: 'deb1910a7342814af4e4c9210c786f35',
      invocationEvents: [Instabug.invocationEvent.floatingButton],
    });
  }, []);

  return (
    <NativeBaseProvider>
      <NavigationContainer onStateChange={Instabug.onStateChange}>
        <RootTabNavigator />
      </NavigationContainer>
    </NativeBaseProvider>
  );
};
