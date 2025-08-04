import React, { useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet } from 'react-native';

import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { NavigationContainer, useNavigationContainerRef } from '@react-navigation/native';
import Instabug, {
  APM,
  CrashReporting,
  InvocationEvent,
  LaunchType,
  LogLevel,
  NetworkInterceptionMode,
  NetworkLogger,
  ReproStepsMode,
  type SessionMetadata,
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

  const initializeInstabug = () => {
    // Synchronous setup
    SessionReplay.setSyncCallback((data) => shouldSyncSession(data));

    // Start async initialization but don't block rendering
    Instabug.init({
      token: 'deb1910a7342814af4e4c9210c786f35',
      invocationEvents: [InvocationEvent.floatingButton],
      debugLogsLevel: LogLevel.verbose,
      networkInterceptionMode: NetworkInterceptionMode.javascript,
    })
    .then(() => {
      // Post-initialization setup
      NetworkLogger.setNetworkDataObfuscationHandler(async (networkData) => {
        networkData.url = `${networkData.url}/JS/Obfuscated`;
        return networkData;
      });
      APM.setScreenRenderEnabled(true);
      setIsInstabugInitialized(true);
    })
    .catch((error) => {
      console.error('Instabug initialization failed:', error);
      setIsInstabugInitialized(true); // Proceed even if initialization fails
    });

    // Synchronous configuration that doesn't depend on init completion
    CrashReporting.setNDKCrashesEnabled(true);
    Instabug.setReproStepsConfig({ all: ReproStepsMode.enabled });
    
    // Set initialized immediately to show UI - initialization continues in background
    setIsInstabugInitialized(true);
  };

  useEffect(() => {
    initializeInstabug();
  }, []);

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
