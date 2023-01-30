import React from 'react';

import Instabug, { BugReporting } from 'instabug-reactnative';

import { Button } from '../components/Button';
import { Screen } from '../components/Screen';

export const BugReportingScreen: React.FC = () => {
  return (
    <Screen>
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
    </Screen>
  );
};
