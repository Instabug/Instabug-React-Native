import React, { useEffect } from 'react';
import { StyleSheet } from 'react-native';

import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import Instabug, { InvocationEvent, LogLevel } from 'instabug-reactnative';
import { NativeBaseProvider } from 'native-base';

import { RootTabNavigator } from './navigation/RootTab';
import { nativeBaseTheme } from './theme/nativeBaseTheme';
import { navigationTheme } from './theme/navigationTheme';

import { QueryClient, QueryClientProvider } from 'react-query';

const queryClient = new QueryClient();

export const App: React.FC = () => {
  useEffect(() => {
    Instabug.init({
      token: '315f28620a2a59c3d9d170b2462f926e',
      invocationEvents: [InvocationEvent.floatingButton],
      debugLogsLevel: LogLevel.verbose,
    });
  }, []);

  return (
    <GestureHandlerRootView style={styles.root}>
      <NativeBaseProvider theme={nativeBaseTheme}>
        <QueryClientProvider client={queryClient}>
          <NavigationContainer onStateChange={Instabug.onStateChange} theme={navigationTheme}>
            <RootTabNavigator />
          </NavigationContainer>
        </QueryClientProvider>
      </NativeBaseProvider>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
});
