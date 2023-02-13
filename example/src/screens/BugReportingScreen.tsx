import React from 'react';

import Instabug, { BugReporting, InvocationOption, ReportType } from 'instabug-reactnative';

import { ListTile } from '../components/ListTile';
import { Screen } from '../components/Screen';

export const BugReportingScreen: React.FC = () => {
  return (
    <Screen>
      <ListTile title="Show" onPress={() => Instabug.show()} />
      <ListTile title="Send Bug Report" onPress={() => BugReporting.show(ReportType.Bug, [])} />
      <ListTile
        title="Send Feedback"
        onPress={() => BugReporting.show(ReportType.Feedback, [InvocationOption.EmailFieldHidden])}
      />
      <ListTile title="Ask a Question" onPress={() => BugReporting.show(ReportType.Question, [])} />
    </Screen>
  );
};
