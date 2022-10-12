import React from 'react';
import { Alert, StyleSheet, Text } from 'react-native';
import Instabug, {
  BugReporting,
  CrashReporting,
  FeatureRequests,
  Replies,
  Surveys,
} from 'instabug-reactnative';

import { Button } from '../components/Button';
import { Screen } from '../components/Screen';

export function HomeScreen() {
  const invoke = () => Instabug.show();

  const showMultipleQuestionSurvey = () => Surveys.showSurvey('95s5cjU1i74m23h0M9t_Sg');

  const showNpsSurvey = () => Surveys.showSurvey('CHUJHGRx8s1qPcCSs85kFA');

  const showFeatureRequests = () => FeatureRequests.show();

  const sendBugReport = () => BugReporting.show(BugReporting.reportType.bug);

  const sendCrashReport = () => {
    try {
      throw new Error('Handled Exception From Instabug Test App');
    } catch (err) {
      CrashReporting.reportJSException(err);
      Alert.alert('Crash report Sent!');
    }
  };

  const sendFeedback = () =>
    BugReporting.show(BugReporting.reportType.feedback, [BugReporting.option.emailFieldHidden]);

  const startNewConversation = () => BugReporting.show(BugReporting.reportType.question);

  const showUnreadMessagesCount = () =>
    Replies.getUnreadRepliesCount((count) => Alert.alert('Messages: ' + count));

  return (
    <Screen>
      <Text style={styles.heading}>Welcome to Instabug!</Text>
      <Text style={styles.details}>
        Hello Instabug's awesome user! The purpose of this application is to show you the different
        options for customizing the SDK and how easy it is to integrate it to your existing app
      </Text>

      <Button onPress={invoke}>Invoke</Button>
      <Button onPress={sendBugReport}>Send Bug Report</Button>
      <Button onPress={sendFeedback}>Send Feedback</Button>
      <Button onPress={startNewConversation}>Ask a Question</Button>
      <Button onPress={sendCrashReport}>Throw Handled Exception</Button>
      <Button onPress={showNpsSurvey}>Show NPS Survey</Button>
      <Button onPress={showMultipleQuestionSurvey}>Show Multiple Question Survey</Button>
      <Button onPress={showFeatureRequests}>Show Feature Requests</Button>
      <Button onPress={showUnreadMessagesCount}>Get Unread Messages Count</Button>
    </Screen>
  );
}

const styles = StyleSheet.create({
  heading: {
    fontSize: 25,
    textAlign: 'center',
    fontWeight: 'bold',
    marginBottom: 10,
  },
  details: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 25,
  },
});
