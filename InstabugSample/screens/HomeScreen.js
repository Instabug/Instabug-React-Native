import React, { Component } from 'react';
import { ScrollView, View, Text, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import Instabug, {
  BugReporting,
  CrashReporting,
  FeatureRequests,
  Replies,
  Surveys,
} from 'instabug-reactnative';

class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      switchValue: true,
      colorTheme: 'Light',
    };
  }

  render() {
    return (
      <View testID="welcome" style={styles.container}>
        <ScrollView contentContainerStyle={styles.contentContainer}>
          <Text style={styles.details}>
            Hello Instabug's awesome user! The purpose of this application is to show you the
            different options for customizing the SDK and how easy it is to integrate it to your
            existing app
          </Text>
          <TouchableOpacity style={styles.button} onPress={() => this.invoke()}>
            <Text style={styles.text}> INVOKE </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => this.sendBugReport()}>
            <Text style={styles.text}> SEND BUG REPORT </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => this.sendFeedback()}>
            <Text style={styles.text}> SEND FEEDBACK </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => this.startNewConversation()}>
            <Text style={styles.text}> ASK A QUESTION </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => this.sendCrashReport()}>
            <Text style={styles.text}> THROW HANDLED EXCEPTION </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => this.showNpsSurvey()}>
            <Text style={styles.text}> SHOW NPS SURVEY </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => this.showMultipleQuestionSurvey()}>
            <Text style={styles.text}> SHOW MULTIPLE QUESTION SURVEY </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => this.showFeatureRequests()}>
            <Text style={styles.text}> SHOW FEATURE REQUESTS </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => this.showUnreadMessagesCount()}>
            <Text style={styles.text}> GET UNREAD MESSAGES COUNT </Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    );
  }

  invoke() {
    Instabug.show();
  }

  showMultipleQuestionSurvey() {
    Surveys.showSurvey('ZAKSlVz98QdPyOx1wIt8BA');
  }

  showNpsSurvey() {
    Surveys.showSurvey('pcV_mE2ttqHxT1iqvBxL0w');
  }

  showFeatureRequests() {
    FeatureRequests.show();
  }

  sendBugReport() {
    BugReporting.show(BugReporting.reportType.bug);
  }

  sendCrashReport() {
    try {
      throw new Error('Text Handled Exception From Instabug Test App');
    } catch (Exception) {
      CrashReporting.reportJSException(Exception);
      alert('Crash report Sent!');
    }
  }

  sendFeedback() {
    BugReporting.show(BugReporting.reportType.feedback, [BugReporting.option.emailFieldHidden]);
  }

  startNewConversation() {
    BugReporting.show(BugReporting.reportType.question);
  }

  showUnreadMessagesCount() {
    Replies.getUnreadRepliesCount(count => {
      alert('Messages: ' + count);
    });
  }
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
