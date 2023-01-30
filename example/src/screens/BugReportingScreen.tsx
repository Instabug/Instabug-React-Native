import React from 'react';

import Instabug, { BugReporting } from 'instabug-reactnative';
import { Button, VStack } from 'native-base';

export const BugReportingScreen: React.FC = () => {
  return (
    <VStack alignItems="stretch" padding="8" space="4">
      <Button onPress={() => Instabug.show()}>Invoke</Button>
      <Button onPress={() => BugReporting.show(BugReporting.reportType.bug, [])}>
        Send Bug Report
      </Button>
      <Button
        onPress={() =>
          BugReporting.show(BugReporting.reportType.feedback, [
            BugReporting.option.emailFieldHidden,
          ])
        }>
        Send Feedback
      </Button>
      <Button onPress={() => BugReporting.show(BugReporting.reportType.question, [])}>
        Ask a Question
      </Button>
    </VStack>
  );
};
