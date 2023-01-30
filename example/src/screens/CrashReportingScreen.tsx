import React from 'react';
import { Alert } from 'react-native';

import { CrashReporting } from 'instabug-reactnative';

import { Button } from '../components/Button';
import { Screen } from '../components/Screen';

export const CrashReportingScreen: React.FC = () => {
  return (
    <Screen>
      <Button
        onPress={() => {
          try {
            throw new Error('Handled Exception From Instabug Test App');
          } catch (err) {
            if (err instanceof Error) {
              CrashReporting.reportError(err);
              Alert.alert('Crash report Sent!');
            }
          }
        }}>
        Throw Handled Exception
      </Button>
    </Screen>
  );
};
