import React, { useEffect } from 'react';
import { StyleSheet } from 'react-native';

import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import Instabug, {
  CrashReporting,
  InvocationEvent,
  LogLevel,
  NetworkInterceptionMode,
  NetworkLogger,
  ReproStepsMode,
} from 'instabug-reactnative';
import { NativeBaseProvider } from 'native-base';

import { RootTabNavigator } from './navigation/RootTab';
import { nativeBaseTheme } from './theme/nativeBaseTheme';
import { navigationTheme } from './theme/navigationTheme';

// import { QueryClient } from 'react-query';
import { QueryClient, QueryClientProvider } from 'react-query';

const queryClient = new QueryClient();

//Setting up the handler

export const App: React.FC = () => {
  useEffect(() => {
    Instabug.init({
      // token: 'deb1910a7342814af4e4c9210c786f35',
      token: '0fcc87b8bf731164828cc411eccc802a',
      invocationEvents: [InvocationEvent.floatingButton],
      debugLogsLevel: LogLevel.verbose,
      networkInterceptionMode: NetworkInterceptionMode.native,
    }).then((_) => {
      // NetworkLogger.setNetworkDataObfuscationHandler(async (networkData) => {
      //   networkData.url = networkData.url + '/iOS/obfuscated';
      //   return networkData;
      // });
      NetworkLogger.setRequestFilterExpression(
        "network.requestHeaders['content-type'] === 'application/json'",
      );
    });
    CrashReporting.setNDKCrashesEnabled(true);

    Instabug.setReproStepsConfig({
      all: ReproStepsMode.enabled,
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
