import React from 'react';

import Instabug, {
  BugReporting,
  InvocationOption,
  ReportType,
  ExtendedBugReportMode,
  WelcomeMessageMode,
} from 'instabug-reactnative';

import { ListTile } from '../components/ListTile';
import { Screen } from '../components/Screen';
import { useToast } from 'native-base';
import { Section } from '../components/Section';

export const BugReportingScreen: React.FC = () => {
  const toast = useToast();
  return (
    <Screen>
      <ListTile title="Show" onPress={() => Instabug.show()} />
      <ListTile title="Send Bug Report" onPress={() => BugReporting.show(ReportType.bug, [])} />
      <ListTile
        title="Send Feedback"
        onPress={() => BugReporting.show(ReportType.feedback, [InvocationOption.emailFieldHidden])}
      />
      <ListTile title="Ask a Question" onPress={() => BugReporting.show(ReportType.question, [])} />
      <ListTile
        title="Enable extended bug report with required fields"
        onPress={() =>
          BugReporting.setExtendedBugReportMode(ExtendedBugReportMode.enabledWithRequiredFields)
        }
      />
      <ListTile
        title="Enable extended bug report with optional fields"
        onPress={() =>
          BugReporting.setExtendedBugReportMode(ExtendedBugReportMode.enabledWithOptionalFields)
        }
      />
      <ListTile
        title="Disable session profiler"
        onPress={() => Instabug.setSessionProfilerEnabled(true)}
      />
      <ListTile
        title="Welcome message Beta"
        onPress={() => Instabug.showWelcomeMessage(WelcomeMessageMode.beta)}
      />
      <ListTile
        title="Welcome message Live"
        onPress={() => Instabug.showWelcomeMessage(WelcomeMessageMode.live)}
      />

      <Section title="Handlers">
        <ListTile
          title="On invocation add tag"
          onPress={() =>
            BugReporting.onInvokeHandler(function () {
              Instabug.appendTags(['Invocation Handler tag1']);
            })
          }
        />
        <ListTile
          title="On submission show toast message"
          onPress={() =>
            Instabug.onReportSubmitHandler(() => {
              toast.show({
                description: 'Submission succeeded',
              });
            })
          }
        />
        <ListTile
          title="On dismissing turn floating to red"
          onPress={() =>
            BugReporting.onSDKDismissedHandler(function () {
              Instabug.setPrimaryColor('#FF0000');
            })
          }
        />
      </Section>
    </Screen>
  );
};
