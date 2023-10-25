import React from 'react';
import { Alert, Platform } from 'react-native';

import { ListTile } from '../components/ListTile';
import { Screen } from '../components/Screen';
import { NativeExampleModule } from '../native';

export const CrashReportingScreen: React.FC = () => {
  return (
    <Screen>
      <ListTile
        title="Throw Handled Exception"
        onPress={() => {
          Alert.alert('Crash report Sent!');
          throw new Error('Handled Exception From Instabug Test App');
        }}
      />
      <ListTile
        title="Throw Unhandled NDK Exception"
        onPress={() => {
          console.log('Sending NDK Crash Report');
          if (Platform.OS === 'android') {
            NativeExampleModule.sendNDKCrash();
          } else {
            Alert.alert('NDK crashes are only available on Android.');
          }
        }}
      />
      <ListTile
        title="Reject an Unhandled Promise"
        onPress={() => {
          Promise.reject(new Error('Unhandled Promise Rejection from Instabug Test App'));
          Alert.alert('Crash report sent!');
        }}
      />
    </Screen>
  );
};
