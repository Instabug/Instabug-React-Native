import React, { useState } from 'react';

import Instabug, {
  BugReporting,
  InvocationOption,
  ReportType,
  ExtendedBugReportMode,
  WelcomeMessageMode,
  InvocationEvent,
  Replies,
} from 'instabug-reactnative';

import { ListTile } from '../../components/ListTile';
import { Screen } from '../../components/Screen';
import { useToast, ScrollView, Divider } from 'native-base';
import { Section } from '../../components/Section';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { HomeStackParamList } from '../../navigation/HomeStack';
import { BugReportingState } from './BugReportingStateScreen';
import { ExtendedBugReportState } from './ExtendedBugReportStateScreen';
import { useCallbackHandlers } from '../../contexts/callbackContext';

export const BugReportingScreen: React.FC<
  NativeStackScreenProps<HomeStackParamList, 'BugReporting'>
> = ({ navigation }) => {
  const toast = useToast();
  const [reportTypes, setReportTypes] = useState<ReportType[]>([
    ReportType.bug,
    ReportType.feedback,
    ReportType.question,
  ]);
  const [invocationEvents, setInvocationEvents] = useState<string[]>(['floatingButton']);
  const [invocationOptions, setInvocationOptions] = useState<string[]>([]);
  const [isBugReportingEnabled, setIsBugReportingEnabled] = useState<boolean>(true);
  const [extendedBugReportState, setExtendedBugReportState] = useState<ExtendedBugReportState>(
    ExtendedBugReportState.Disabled,
  );
  const [disclaimerText, setDisclaimerText] = useState<string>('');
  const [isSessionProfilerEnabled, setIsSessionProfilerEnabled] = useState<boolean>(true);
  const [isViewHierarchyEnabled, setIsViewHierarchyEnabled] = useState<boolean>(false);
  const [isRepliesEnabled, setIsRepliesEnabled] = useState<boolean>(true);
  const { addItem } = useCallbackHandlers();

  return (
    <ScrollView flex={1} bg="gray.100">
      <Screen>
        <ListTile
          title="Bug Reporting State"
          subtitle={isBugReportingEnabled ? 'Enabled' : 'Disabled'}
          onPress={() => {
            navigation.navigate('BugReportingState', {
              state: isBugReportingEnabled ? BugReportingState.Enabled : BugReportingState.Disabled,
              setState: (newState: BugReportingState) => {
                const isEnabled = newState === BugReportingState.Enabled;
                setIsBugReportingEnabled(isEnabled);
                BugReporting.setEnabled(isEnabled);
                navigation.goBack();
              },
            });
          }}
          testID="id_br_state"
        />

        <ListTile
          title="Extended Bug Report State"
          subtitle={extendedBugReportState}
          onPress={() => {
            navigation.navigate('ExtendedBugReportState', {
              state: extendedBugReportState,
              setState: (newState: ExtendedBugReportState) => {
                setExtendedBugReportState(newState);
                switch (newState) {
                  case ExtendedBugReportState.Disabled:
                    BugReporting.setExtendedBugReportMode(ExtendedBugReportMode.disabled);
                    break;
                  case ExtendedBugReportState.EnabledWithRequiredFields:
                    BugReporting.setExtendedBugReportMode(
                      ExtendedBugReportMode.enabledWithRequiredFields,
                    );
                    break;
                  case ExtendedBugReportState.EnabledWithOptionalFields:
                    BugReporting.setExtendedBugReportMode(
                      ExtendedBugReportMode.enabledWithOptionalFields,
                    );
                    break;
                }
                navigation.goBack();
              },
            });
          }}
          testID="id_extended_br_state"
        />

        <ListTile
          title="Bug Reporting Types"
          subtitle={reportTypes.length > 0 ? reportTypes.join(', ') : 'None selected'}
          onPress={() => {
            navigation.navigate('BugReportingTypes', {
              selectedTypes: reportTypes,
              setSelectedTypes: (types: ReportType[]) => {
                setReportTypes(types);
                BugReporting.setReportTypes(types);
                navigation.goBack();
              },
            });
          }}
          testID="id_br_types"
        />

        <ListTile
          title="Disclaimer Text"
          subtitle={disclaimerText || 'Not set'}
          truncateSubtitle={true}
          onPress={() => {
            navigation.navigate('DisclaimerText', {
              initialText: disclaimerText,
              setText: (text: string) => {
                setDisclaimerText(text);
              },
            });
          }}
          testID="id_disclaimer_text"
        />

        <ListTile
          title="Invocation Events"
          subtitle={invocationEvents.length > 0 ? invocationEvents.join(', ') : 'None selected'}
          onPress={() => {
            navigation.navigate('InvocationEvents', {
              selectedEvents: invocationEvents,
              setSelectedEvents: (events: string[]) => {
                setInvocationEvents(events);
                const selectedEnums: InvocationEvent[] = events.map((val) => {
                  switch (val) {
                    case 'floatingButton':
                      return InvocationEvent.floatingButton;
                    case 'twoFingersSwipe':
                      return InvocationEvent.twoFingersSwipe;
                    case 'screenshot':
                      return InvocationEvent.screenshot;
                    case 'shake':
                      return InvocationEvent.shake;
                    default:
                      throw new Error('Invalid invocation event selected');
                  }
                });
                BugReporting.setInvocationEvents(selectedEnums);
                navigation.goBack();
              },
            });
          }}
          testID="id_invocation_events"
        />

        <ListTile
          title="Invocation Options"
          subtitle={invocationOptions.length > 0 ? invocationOptions.join(', ') : 'None selected'}
          onPress={() => {
            navigation.navigate('InvocationOptions', {
              selectedOptions: invocationOptions,
              setSelectedOptions: (options: string[]) => {
                setInvocationOptions(options);
                const selectedEnums: InvocationOption[] = options.map((val) => {
                  switch (val) {
                    case 'commentFieldRequired':
                      return InvocationOption.commentFieldRequired;
                    case 'emailFieldHidden':
                      return InvocationOption.emailFieldHidden;
                    case 'emailFieldOptional':
                      return InvocationOption.emailFieldOptional;
                    case 'disablePostSendingDialog':
                      return InvocationOption.disablePostSendingDialog;
                    default:
                      throw new Error('Invalid invocation option selected');
                  }
                });
                BugReporting.setOptions(selectedEnums);
                navigation.goBack();
              },
            });
          }}
          testID="id_invocation_options"
        />

        <ListTile
          title="Session Profiler"
          subtitle={isSessionProfilerEnabled ? 'Enabled' : 'Disabled'}
          onPress={() => {
            navigation.navigate('SessionProfiler', {
              isEnabled: isSessionProfilerEnabled,
              setIsEnabled: (enabled: boolean) => {
                setIsSessionProfilerEnabled(enabled);
                Instabug.setSessionProfilerEnabled(enabled);
                navigation.goBack();
              },
            });
          }}
          testID="id_session_profiler"
        />

        <ListTile
          title="View Hierarchy"
          subtitle={isViewHierarchyEnabled ? 'Enabled' : 'Disabled'}
          onPress={() => {
            navigation.navigate('ViewHierarchy', {
              isEnabled: isViewHierarchyEnabled,
              setIsEnabled: (enabled: boolean) => {
                setIsViewHierarchyEnabled(enabled);
                BugReporting.setViewHierarchyEnabled(enabled);
                navigation.goBack();
              },
            });
          }}
          testID="id_view_hierarchy"
        />

        <ListTile
          title="Replies"
          subtitle={isRepliesEnabled ? 'Enabled' : 'Disabled'}
          onPress={() => {
            navigation.navigate('RepliesState', {
              isEnabled: isRepliesEnabled,
              setIsEnabled: (enabled: boolean) => {
                setIsRepliesEnabled(enabled);
                Replies.setEnabled(enabled);
                navigation.goBack();
              },
            });
          }}
          testID="id_replies"
        />

        <ListTile
          title="User Consent"
          onPress={() => navigation.navigate('UserConsent')}
          testID="id_user_consent"
        />

        <Divider my={5} />

        <ListTile title="Show" onPress={() => Instabug.show()} testID="id_show_button" />
        <ListTile
          title="Send Bug Report"
          onPress={() => BugReporting.show(ReportType.bug, [])}
          testID="id_send_bug_report"
        />
        <ListTile
          title="Send Feedback"
          onPress={() =>
            BugReporting.show(ReportType.feedback, [InvocationOption.emailFieldHidden])
          }
          testID="id_send_feedback"
        />
        <ListTile
          title="Ask a Question"
          onPress={() => BugReporting.show(ReportType.question, [])}
          testID="id_send_question"
        />

        <ListTile
          title="Welcome message Beta"
          onPress={() => Instabug.showWelcomeMessage(WelcomeMessageMode.beta)}
        />
        <ListTile
          title="Welcome message Live"
          onPress={() => Instabug.showWelcomeMessage(WelcomeMessageMode.live)}
        />

        <Divider my={5} />

        <Section title="Handlers">
          <ListTile
            testID="enable_on_invoke_handler"
            title="Enable on Invoke Callback Handler"
            onPress={() =>
              BugReporting.onInvokeHandler(function () {
                toast.show({
                  description: 'Invoke Callback Handler',
                });

                addItem('Invoke Handler', {
                  id: `event-${Math.random()}`,
                  fields: [{ key: 'Date', value: new Date().toLocaleString() }],
                });
              })
            }
          />

          <ListTile
            testID="disable_on_invoke_handler"
            title="Disable on Invoke Callback Handler"
            onPress={() => BugReporting.onInvokeHandler(function () {})}
          />

          <ListTile
            testID="crash_on_invoke_handler"
            title="Crashing on Invoke Callback Handler"
            onPress={() =>
              BugReporting.onInvokeHandler(function () {
                addItem('Invoke Handler', {
                  id: `event-${Math.random()}`,
                  fields: [{ key: 'Date', value: new Date().toLocaleString() }],
                });
                throw new Error('💥 Crash inside onInvokeHandler');
              })
            }
          />
          <ListTile
            testID="enable_on_dismiss_handler"
            title="Enable on Did-Dismiss Callback Handler"
            onPress={() =>
              BugReporting.onSDKDismissedHandler(function () {
                toast.show({
                  description: 'onSDKDismissedHandler Callback Handler',
                });
                addItem('onSDKDismissedHandler', {
                  id: `event-${Math.random()}`,
                  fields: [{ key: 'Date', value: new Date().toLocaleString() }],
                });
              })
            }
          />

          <ListTile
            testID="disable_on_dismiss_handler"
            title="Disable on Did-Dismiss Callback Handler"
            onPress={() => BugReporting.onSDKDismissedHandler(function () {})}
          />

          <ListTile
            testID="crashing_on_dismiss_handler"
            title="Crashing on Did-Dismiss Callback Handler"
            onPress={() =>
              BugReporting.onSDKDismissedHandler(function () {
                addItem('onSDKDismissedHandler', {
                  id: `event-${Math.random()}`,
                  fields: [{ key: 'Date', value: new Date().toLocaleString() }],
                });

                throw new Error('💥 Crash inside onSDKDismissedHandler');
              })
            }
          />
        </Section>
      </Screen>
    </ScrollView>
  );
};
