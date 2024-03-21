import React, { useEffect } from 'react';
import { StyleSheet } from 'react-native';

import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import Instabug, {
  CrashReporting,
  InvocationEvent,
  LogLevel,
  NetworkLogger,
  ReproStepsMode,
} from 'instabug-reactnative';
import { NativeBaseProvider } from 'native-base';

import { RootTabNavigator } from './navigation/RootTab';
import { nativeBaseTheme } from './theme/nativeBaseTheme';
import { navigationTheme } from './theme/navigationTheme';

import { QueryClient, QueryClientProvider } from 'react-query';

const queryClient = new QueryClient();

export const App: React.FC = () => {
  useEffect(() => {
    Instabug.init({
      token: '0fcc87b8bf731164828cc411eccc802a',
      invocationEvents: [InvocationEvent.floatingButton],
      debugLogsLevel: LogLevel.verbose,
    });
    // Instabug.setAppLaunchEnabled(false);
    // Instabug.setScreenLoadingEnabled(false);
    CrashReporting.setNDKCrashesEnabled(true);

    NetworkLogger.setNetworkDataObfuscationHandler(async (networkData) => {
      networkData.gqlQueryName = 'countries';
      console.log(networkData.gqlQueryName);
      return networkData;
    });

    Instabug.setReproStepsConfig({
      all: ReproStepsMode.enabled,
    });
  }, []);

  return (
    // <InstabugPerformance config={isAppLaunchEnabled: true, isScreenLoadingEnabled: true}>
    <GestureHandlerRootView style={styles.root}>
      <NativeBaseProvider theme={nativeBaseTheme}>
        <QueryClientProvider client={queryClient}>
          <NavigationContainer onStateChange={Instabug.onStateChange} theme={navigationTheme}>
            <RootTabNavigator />
          </NavigationContainer>
        </QueryClientProvider>
      </NativeBaseProvider>
    </GestureHandlerRootView>
    // </InstabugPerformance>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
});
