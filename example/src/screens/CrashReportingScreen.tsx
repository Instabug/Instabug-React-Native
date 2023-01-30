import React from 'react';
import { Alert } from 'react-native';

import { CrashReporting } from 'instabug-reactnative';
import { Button, VStack } from 'native-base';

export const CrashReportingScreen: React.FC = () => {
  return (
    <VStack alignItems="stretch" padding="8" space="4">
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
    </VStack>
  );
};
