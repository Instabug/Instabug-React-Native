import React, { useEffect } from 'react';

import { NavigationContainer } from '@react-navigation/native';
import Instabug, { InvocationEvent, LogLevel } from 'instabug-reactnative';
import { NativeBaseProvider } from 'native-base';

import { RootTabNavigator } from './navigation/RootTab';
import { nativeBaseTheme } from './theme/nativeBaseTheme';
import { navigationTheme } from './theme/navigationTheme';

export const App: React.FC = () => {
  useEffect(() => {
    Instabug.init({
      token: 'deb1910a7342814af4e4c9210c786f35',
      invocationEvents: [InvocationEvent.FloatingButton],
      debugLogsLevel: LogLevel.Verbose,
    });
  }, []);

  return (
    <NativeBaseProvider theme={nativeBaseTheme}>
      <NavigationContainer onStateChange={Instabug.onStateChange} theme={navigationTheme}>
        <RootTabNavigator />
      </NavigationContainer>
    </NativeBaseProvider>
  );
};
