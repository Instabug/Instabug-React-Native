import React from 'react';
import { ScrollView, View, Text, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import Instabug, {
  BugReporting,
  CrashReporting,
  FeatureRequests,
  Replies,
  Surveys,
} from 'instabug-reactnative';

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
        <TouchableOpacity style={styles.button} onPress={invoke}>
          <Text style={styles.text}> INVOKE </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={sendBugReport}>
          <Text style={styles.text}> SEND BUG REPORT </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={sendFeedback}>
          <Text style={styles.text}> SEND FEEDBACK </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={startNewConversation}>
          <Text style={styles.text}> ASK A QUESTION </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={sendCrashReport}>
          <Text style={styles.text}> THROW HANDLED EXCEPTION </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={showNpsSurvey}>
          <Text style={styles.text}> SHOW NPS SURVEY </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={showMultipleQuestionSurvey}>
          <Text style={styles.text}> SHOW MULTIPLE QUESTION SURVEY </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={showFeatureRequests}>
          <Text style={styles.text}> SHOW FEATURE REQUESTS </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={showUnreadMessagesCount}>
          <Text style={styles.text}> GET UNREAD MESSAGES COUNT </Text>
        </TouchableOpacity>
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
  text: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: 'bold',
  },
  button: {
    marginTop: 10,
    backgroundColor: '#1D82DC',
    padding: 10,
    alignItems: 'center',
    borderRadius: 5,
  },
  contentContainer: {
    padding: 10,
  },
});

export default HomeScreen;
