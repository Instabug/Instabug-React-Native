import React from 'react';

import Instabug, { BugReporting, InvocationOption, ReportType } from 'instabug-reactnative';

import { ListTile } from '../components/ListTile';
import { Screen } from '../components/Screen';

export const BugReportingScreen: React.FC = () => {
  return (
    <Screen>
      <ListTile title="Show" onPress={() => Instabug.show()} />
      <ListTile title="Send Bug Report" onPress={() => BugReporting.show(ReportType.bug, [])} />
      <ListTile
        title="Send Feedback"
        onPress={() => BugReporting.show(ReportType.feedback, [InvocationOption.emailFieldHidden])}
      />
      <ListTile title="Ask a Question" onPress={() => BugReporting.show(ReportType.question, [])} />
    </Screen>
  );
};
