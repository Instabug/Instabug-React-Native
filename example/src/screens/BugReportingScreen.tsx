import React from 'react';

import Instabug, { BugReporting } from 'instabug-reactnative';
import { Screen } from 'react-native-screens';

import { ListTile } from '../components/ListTile';

export const BugReportingScreen: React.FC = () => {
  return (
    <Screen>
      <ListTile title="Invoke" onPress={() => Instabug.show()} />
      <ListTile
        title="Send Bug Report"
        onPress={() => BugReporting.show(BugReporting.reportType.bug, [])}
      />
      <ListTile
        title="Send Feedback"
        onPress={() =>
          BugReporting.show(BugReporting.reportType.feedback, [
            BugReporting.option.emailFieldHidden,
          ])
        }
      />
      <ListTile
        title="Ask a Question"
        onPress={() => BugReporting.show(BugReporting.reportType.question, [])}
      />
    </Screen>
  );
};
