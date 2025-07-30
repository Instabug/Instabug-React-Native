import React, { useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet } from 'react-native';

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

  const [isInstabugInitialized, setIsInstabugInitialized] = useState(false);

  const initializeInstabug = async () => {
    try {
      SessionReplay.setSyncCallback((data) => shouldSyncSession(data));

      await Instabug.init({
        token: '85f60fbf3d9170336499829dd78dad31',
        invocationEvents: [InvocationEvent.floatingButton],
        debugLogsLevel: LogLevel.verbose,
        networkInterceptionMode: NetworkInterceptionMode.javascript,
      });

      CrashReporting.setNDKCrashesEnabled(true);
      Instabug.setReproStepsConfig({ all: ReproStepsMode.enabled });

      setIsInstabugInitialized(true); // Set to true after initialization
    } catch (error) {
      console.error('Instabug initialization failed:', error);
      setIsInstabugInitialized(true); // Proceed even if initialization fails
    }
  };

  useEffect(() => {
    initializeInstabug().then(() => {
      NetworkLogger.setNetworkDataObfuscationHandler(async (networkData) => {
        networkData.url = `${networkData.url}/JS/Obfuscated`;
        return networkData;
      });
      // NetworkLogger.setRequestFilterExpression('false');
    });
  });

  useEffect(() => {
    // @ts-ignore
    const unregisterListener = Instabug.setNavigationListener(navigationRef);

    return unregisterListener;
  }, [navigationRef]);

  if (!isInstabugInitialized) {
    return <ActivityIndicator size="large" color="#0000ff" style={styles.loading} />;
  }

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
