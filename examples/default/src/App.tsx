import React, { useEffect } from 'react';
import { StyleSheet } from 'react-native';

import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { NavigationContainer, useNavigationContainerRef } from '@react-navigation/native';
import { BugReporting, type SessionMetadata } from 'instabug-reactnative';
import Instabug, {
  CrashReporting,
  InvocationEvent,
  LaunchType,
  LogLevel,
  ReproStepsMode,
  SessionReplay,
} from 'instabug-reactnative';
import { NativeBaseProvider } from 'native-base';

import { RootTabNavigator } from './navigation/RootTab';
import { nativeBaseTheme } from './theme/nativeBaseTheme';
import { navigationTheme } from './theme/navigationTheme';

import { QueryClient, QueryClientProvider } from 'react-query';
import { createProactiveReportingConfig } from 'instabug-reactnative';

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

  useEffect(() => {
    SessionReplay.setSyncCallback((data) => shouldSyncSession(data));

    Instabug.init({
      token: 'deb1910a7342814af4e4c9210c786f35',
      invocationEvents: [InvocationEvent.floatingButton],
      debugLogsLevel: LogLevel.verbose,
    });
    CrashReporting.setNDKCrashesEnabled(true);

    Instabug.setCodePushVersion('33');

    Instabug.setCodePushVersion('33');

    Instabug.setReproStepsConfig({
      all: ReproStepsMode.enabled,
    });

    const config = createProactiveReportingConfig();

    BugReporting.setProactiveReportingConfigurations(config);
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
