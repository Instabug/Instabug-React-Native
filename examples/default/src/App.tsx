import React, { useEffect } from 'react';
import { StyleSheet } from 'react-native';

import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { NavigationContainer, useNavigationContainerRef } from '@react-navigation/native';
import type { SessionMetadata } from 'instabug-reactnative';
import Instabug, {
  CrashReporting,
  InvocationEvent,
  LaunchType,
  LogLevel,
  NetworkInterceptionMode,
  NetworkLogger,
  ReproStepsMode,
  SessionReplay,
} from 'instabug-reactnative';
import { NativeBaseProvider } from 'native-base';

import { RootTabNavigator } from './navigation/RootTab';
import { nativeBaseTheme } from './theme/nativeBaseTheme';
import { navigationTheme } from './theme/navigationTheme';

import { QueryClient, QueryClientProvider } from 'react-query';

const queryClient = new QueryClient();

export const App: React.FC = () => {
  const shouldSyncSession = (data: SessionMetadata) => {
    if (data.launchType === LaunchType.cold) {
      return true;
    }
    if (data.sessionDurationInSeconds > 20) {
      return true;
    }
    if (data.OS === 'OS Level 34') {
      return true;
    }
    return false;
  };

  const navigationRef = useNavigationContainerRef();

  const initializeInstabug = () => {
    try {
      SessionReplay.setSyncCallback((data) => shouldSyncSession(data));

      Instabug.init({
        token: 'deb1910a7342814af4e4c9210c786f35',
        invocationEvents: [InvocationEvent.floatingButton],
        debugLogsLevel: LogLevel.verbose,
        networkInterceptionMode: NetworkInterceptionMode.javascript,
        ignoreAndroidSecureFlag: true,
      });

      CrashReporting.setNDKCrashesEnabled(true);
      Instabug.setReproStepsConfig({ all: ReproStepsMode.enabled });
    } catch (error) {
      console.error('Instabug initialization failed:', error);
    }
  };

  useEffect(() => {
    initializeInstabug();
    NetworkLogger.setNetworkDataObfuscationHandler(async (networkData) => {
      networkData.url = `${networkData.url}/JS/Obfuscated`;
      return networkData;
    });
  });

  useEffect(() => {
    // @ts-ignore
    const unregisterListener = Instabug.setNavigationListener(navigationRef);

    return unregisterListener;
  }, [navigationRef]);

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
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
