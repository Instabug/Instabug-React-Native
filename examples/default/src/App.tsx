import React, { useEffect } from 'react';
import { StyleSheet } from 'react-native';

import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { NavigationContainer, useNavigationContainerRef } from '@react-navigation/native';
import Instabug, { InvocationEvent, LogLevel, ReproStepsMode } from 'instabug-reactnative';
import { NativeBaseProvider } from 'native-base';

import { RootTabNavigator } from './navigation/RootTab';
import { nativeBaseTheme } from './theme/nativeBaseTheme';
import { navigationTheme } from './theme/navigationTheme';

import { QueryClient, QueryClientProvider } from 'react-query';

const queryClient = new QueryClient();

export const App: React.FC = () => {
  const navigationRef = useNavigationContainerRef();
  useEffect(() => {
    Instabug.init({
      token: 'deb1910a7342814af4e4c9210c786f35',
      invocationEvents: [InvocationEvent.floatingButton],
      debugLogsLevel: LogLevel.verbose,
    });
    Instabug.setReproStepsConfig({
      all: ReproStepsMode.enabled,
      bug: ReproStepsMode.enabledWithNoScreenshots,
      allCrashes: ReproStepsMode.enabledWithNoScreenshots,
      anr: ReproStepsMode.enabledWithNoScreenshots,
      appHangs: ReproStepsMode.enabledWithNoScreenshots,
      sessionReplay: ReproStepsMode.enabledWithNoScreenshots,
      fatalCrash: ReproStepsMode.enabledWithNoScreenshots,
      nonFatalCrash: ReproStepsMode.enabledWithNoScreenshots,
      forceRestart: ReproStepsMode.enabledWithNoScreenshots,
      outOfMemory: ReproStepsMode.enabled,
    });
  }, []);

  useEffect(() => {
    const unregisterListener = Instabug.setNavigationListener(navigationRef);

    return unregisterListener;
  }, [navigationRef]);

  return (
    <GestureHandlerRootView style={styles.root}>
      <NativeBaseProvider theme={nativeBaseTheme}>
        <QueryClientProvider client={queryClient}>
          <NavigationContainer theme={navigationTheme} ref={navigationRef}>
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
