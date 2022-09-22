import React from 'react';
import Instabug, {
  BugReporting,
  CrashReporting,
  FeatureRequests,
  Replies,
  Surveys,
} from 'instabug-reactnative';

import Button from '../components/Button';
import Screen from '../components/Screen';

function HomeScreen() {
  const invoke = () => Instabug.show();

  const showMultipleQuestionSurvey = () => Surveys.showSurvey('95s5cjU1i74m23h0M9t_Sg');

  const showNpsSurvey = () => Surveys.showSurvey('CHUJHGRx8s1qPcCSs85kFA');

  const showFeatureRequests = () => FeatureRequests.show();

  const sendBugReport = () => BugReporting.show(BugReporting.reportType.bug);

  const sendCrashReport = () => {
    try {
      throw new Error('Handled Exception From Instabug Test App');
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
    <Screen>
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

export default HomeScreen;
