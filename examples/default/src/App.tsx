import React, { useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet } from 'react-native';

import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import Instabug, {
  CrashReporting,
  InvocationEvent,
  LogLevel,
  NetworkInterceptionMode,
  ReproStepsMode,
} from 'instabug-reactnative';
import { NativeBaseProvider } from 'native-base';

import { RootTabNavigator } from './navigation/RootTab';
import { nativeBaseTheme } from './theme/nativeBaseTheme';
import { navigationTheme } from './theme/navigationTheme';

import { QueryClient, QueryClientProvider } from 'react-query';

const queryClient = new QueryClient();

export const App: React.FC = () => {
  const [isInstabugInitialized, setIsInstabugInitialized] = useState(false);

  useEffect(() => {
    const initializeInstabug = async () => {
      try {
        await Instabug.init({
          token: '0fcc87b8bf731164828cc411eccc802a',
          invocationEvents: [InvocationEvent.floatingButton],
          debugLogsLevel: LogLevel.verbose,
          networkInterceptionMode: NetworkInterceptionMode.native,
        });

        CrashReporting.setNDKCrashesEnabled(true);
        Instabug.setReproStepsConfig({ all: ReproStepsMode.enabled });

        setIsInstabugInitialized(true); // Set to true after initialization
      } catch (error) {
        console.error('Instabug initialization failed:', error);
        setIsInstabugInitialized(true); // Proceed even if initialization fails
      }
    };

    initializeInstabug();
  }, []);

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
