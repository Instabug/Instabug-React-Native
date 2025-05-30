import React, { type Dispatch, type SetStateAction, useState } from 'react';

import Instabug, {
  BugReporting,
  InvocationOption,
  ReportType,
  ExtendedBugReportMode,
  WelcomeMessageMode,
  InvocationEvent,
} from 'instabug-reactnative';

import { ListTile } from '../../components/ListTile';
import { Screen } from '../../components/Screen';
import {
  useToast,
  Checkbox,
  Box,
  Text,
  VStack,
  Button,
  ScrollView,
  HStack,
  Divider,
  Spacer,
} from 'native-base';
import { Section } from '../../components/Section';
import { InputField } from '../../components/InputField';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { HomeStackParamList } from '../../navigation/HomeStack';
import { BugReportingState } from './BugReportingStateScreen';

export const BugReportingScreen: React.FC<
  NativeStackScreenProps<HomeStackParamList, 'BugReporting'>
> = ({ navigation }) => {
  const toast = useToast();
  const [reportTypes, setReportTypes] = useState<string[]>([]);
  const [invocationOptions, setInvocationOptions] = useState<string[]>([]);
  const [isBugReportingEnabled, setIsBugReportingEnabled] = useState<boolean>(true);

  const [disclaimerText, setDisclaimerText] = useState<string>('');

  const toggleCheckbox = (value: string, setData: Dispatch<SetStateAction<string[]>>) => {
    setData((prev) =>
      prev.includes(value) ? prev.filter((item) => item !== value) : [...prev, value],
    );
  };

  const handleSetReportTypesButtonPress = () => {
    const selectedEnums: ReportType[] = reportTypes.map((val) => {
      switch (val) {
        case 'bug':
          return ReportType.bug;
        case 'feedback':
          return ReportType.feedback;
        case 'question':
          return ReportType.question;
        default:
          throw new Error('Invalid report type selected');
      }
    });
    BugReporting.setReportTypes(selectedEnums);
  };
  const handleSetInvocationOptionsButtonPress = () => {
    const selectedEnums: InvocationEvent[] = invocationOptions.map((val) => {
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
          throw new Error('Invalid report type selected');
      }
    });
    BugReporting.setInvocationEvents(selectedEnums);
  };

  const handleSetDisclamirTextPress = () => {
    BugReporting.setDisclaimerText(disclaimerText);
    setDisclaimerText('');
  };

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

        <Divider my={5} />

        <ListTile title="Show" onPress={() => Instabug.show()} testID="id_br_show_button" />
        <ListTile title="Send Bug Report" onPress={() => BugReporting.show(ReportType.bug, [])} />
        <ListTile
          title="Send Feedback"
          onPress={() =>
            BugReporting.show(ReportType.feedback, [InvocationOption.emailFieldHidden])
          }
        />
        <ListTile
          title="Ask a Question"
          onPress={() => BugReporting.show(ReportType.question, [])}
        />

        <Divider my={5} />

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

        <Box justifyContent="center" alignItems="center" p={4} bg="coolGray.100" marginY={2}>
          <Text fontSize="md" mb={4} bold alignSelf="start" textAlign="start">
            Bug Reporting Types
          </Text>

          <VStack space={2} w="90%">
            <HStack space={6} justifyContent="center">
              <Checkbox
                isChecked={reportTypes.includes('bug')}
                onChange={() => toggleCheckbox('bug', setReportTypes)}
                value="bug"
                accessible={true}
                testID="id_br_report_type_bug"
                size="md">
                Bug
              </Checkbox>

              <Checkbox
                isChecked={reportTypes.includes('feedback')}
                onChange={() => toggleCheckbox('feedback', setReportTypes)}
                value="feedback"
                testID="id_br_report_type_feedback"
                size="md">
                Feedback
              </Checkbox>

              <Checkbox
                isChecked={reportTypes.includes('question')}
                onChange={() => toggleCheckbox('question', setReportTypes)}
                value="question"
                testID="id_br_report_type_question"
                size="md">
                Question
              </Checkbox>
            </HStack>

            <Button
              onPress={handleSetReportTypesButtonPress}
              mt={4}
              colorScheme="primary"
              accessible={true}
              testID="id_br_report_type_btn">
              Set Bug Reporting Types
            </Button>
          </VStack>
        </Box>

        <Box justifyContent="center" alignItems="center" p={4} bg="coolGray.100" marginY={2}>
          <Text fontSize="md" mb={4} bold alignSelf="start" textAlign="start">
            Set the disclaimer text
          </Text>

          <VStack space={2} w="90%">
            <InputField
              placeholder="disclaimer text"
              onChangeText={setDisclaimerText}
              testID="id_br_disclaimer_input"
              value={disclaimerText}
            />

            <Button
              onPress={handleSetDisclamirTextPress}
              mt={4}
              colorScheme="primary"
              testID="id_br_disclaimer_btn"
              accessible={true}>
              Set Disclaimer text
            </Button>
          </VStack>
        </Box>

        <Box justifyContent="center" alignItems="center" p={4} bg="coolGray.100" marginY={2}>
          <Text fontSize="md" mb={4} bold alignSelf="start" textAlign="start">
            Invocation Events
          </Text>

          <VStack space={2} w="90%">
            <HStack space={6} justifyContent="center">
              <Checkbox
                isChecked={invocationOptions.includes('floatingButton')}
                onChange={() => toggleCheckbox('floatingButton', setInvocationOptions)}
                value="floatingButton"
                testID="id_br_invoicetion_options_floatingButton"
                accessible={true}
                size="md">
                Floating button
              </Checkbox>

              <Checkbox
                isChecked={invocationOptions.includes('twoFingersSwipe')}
                onChange={() => toggleCheckbox('twoFingersSwipe', setInvocationOptions)}
                value="twoFingersSwipe"
                testID="id_br_invoicetion_options_twoFingersSwipe"
                accessible={true}
                size="md">
                Two Fingers Swipe
              </Checkbox>
            </HStack>
            <HStack space={6} justifyContent="center">
              <Checkbox
                isChecked={invocationOptions.includes('screenshot')}
                onChange={() => toggleCheckbox('screenshot', setInvocationOptions)}
                value="screenshot"
                testID="id_br_invoicetion_options_screenshot"
                accessible={true}
                size="md">
                Screenshot
              </Checkbox>
              <Checkbox
                isChecked={invocationOptions.includes('shake')}
                onChange={() => toggleCheckbox('shake', setInvocationOptions)}
                testID="id_br_invoicetion_options_shake"
                accessible={true}
                value="shake"
                size="md">
                Shake
              </Checkbox>
            </HStack>

            <Button
              onPress={handleSetInvocationOptionsButtonPress}
              mt={4}
              colorScheme="primary"
              testID="id_br_invoicetion_options_btn"
              accessible={true}>
              Set Invocation Events
            </Button>
          </VStack>
        </Box>

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
            testID="id_br_submission_show_toast_btn"
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
    </ScrollView>
  );
};
