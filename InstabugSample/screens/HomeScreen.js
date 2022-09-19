import React from 'react';
import { ScrollView, View, Text, StyleSheet, Platform } from 'react-native';
import Instabug, {
  BugReporting,
  CrashReporting,
  FeatureRequests,
  Replies,
  Surveys,
} from 'instabug-reactnative';

import Button from '../components/Button';

function HomeScreen() {
  const invoke = () => Instabug.show();

  const showMultipleQuestionSurvey = () => Surveys.showSurvey('ZAKSlVz98QdPyOx1wIt8BA');

  const showNpsSurvey = () => Surveys.showSurvey('pcV_mE2ttqHxT1iqvBxL0w');

  const showFeatureRequests = () => FeatureRequests.show();

  const sendBugReport = () => BugReporting.show(BugReporting.reportType.bug);

  const sendCrashReport = () => {
    try {
      throw new Error('Text Handled Exception From Instabug Test App');
    } catch (Exception) {
      CrashReporting.reportJSException(Exception);
      alert('Crash report Sent!');
    }
  };

  const sendFeedback = () =>
    BugReporting.show(BugReporting.reportType.feedback, [BugReporting.option.emailFieldHidden]);

  const startNewConversation = () => BugReporting.show(BugReporting.reportType.question);

  const showUnreadMessagesCount = () =>
    Replies.getUnreadRepliesCount(count => alert('Messages: ' + count));

  return (
    <View testID="welcome" style={styles.container}>
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <Text style={styles.details}>
          Hello Instabug's awesome user! The purpose of this application is to show you the
          different options for customizing the SDK and how easy it is to integrate it to your
          existing app
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
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  details: {
    textAlign: 'center',
    color: '#333333',
    margin: 20,
    marginTop: Platform.OS === 'ios' ? 40 : 20,
  },
  contentContainer: {
    padding: 10,
  },
});

export default HomeScreen;
