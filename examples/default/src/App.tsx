import React, { useEffect } from 'react';
import { StyleSheet } from 'react-native';

import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import Instabug, { InvocationEvent, LogLevel, ReproStepsMode } from 'instabug-reactnative';
import { NativeBaseProvider } from 'native-base';

import { RootTabNavigator } from './navigation/RootTab';
import { nativeBaseTheme } from './theme/nativeBaseTheme';
import { navigationTheme } from './theme/navigationTheme';

export const App: React.FC = () => {
  useEffect(() => {
    Instabug.init({
      token: 'deb1910a7342814af4e4c9210c786f35',
      invocationEvents: [InvocationEvent.floatingButton],
      debugLogsLevel: LogLevel.verbose,
    });
    Instabug.setReproStepsConfig({
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

  return (
    <GestureHandlerRootView style={styles.root}>
      <NativeBaseProvider theme={nativeBaseTheme}>
        <NavigationContainer onStateChange={Instabug.onStateChange} theme={navigationTheme}>
          <RootTabNavigator />
        </NavigationContainer>
      </NativeBaseProvider>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
});
