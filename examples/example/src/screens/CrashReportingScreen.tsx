import React from 'react';
import { Alert } from 'react-native';

import { CrashReporting } from 'instabug-reactnative';

import { ListTile } from '../components/ListTile';
import { Screen } from '../components/Screen';

export const CrashReportingScreen: React.FC = () => {
  return (
    <Screen>
      <ListTile
        title="Throw Handled Exception"
        onPress={() => {
          try {
            throw new Error('Handled Exception From Instabug Test App');
          } catch (err) {
            if (err instanceof Error) {
              CrashReporting.reportError(err);
              Alert.alert('Crash report Sent!');
            }
          }
        }}
      />
    </Screen>
  );
};
