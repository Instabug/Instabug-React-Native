/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TouchableOpacity
} from 'react-native';

import Instabug from'instabug-reactnative';


const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' +
    'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

export default class App extends Component<{}> {

  constructor(props) {
    super(props);
    Instabug.setReportCategories("Performance","UI","Flow","Other");
    Instabug.setPromptOptionsEnabled(true, true, true);
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.details}>
          Hello Instabug awesome user! The purpose of this application is to show you the different
          options for customizing the SDK and how easy it is to integrate it to your existing app
        </Text>
        <TouchableOpacity style={styles.button} onPress={()=>this.showIntroMessage()}>
          <Text style={styles.text}> SHOW INTRO MESSAGE </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={()=>this.invoke()}>
          <Text style={styles.text}> INVOKE </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={()=>this.sendBugReport()}>
          <Text style={styles.text}> SEND BUG REPORT </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={()=>this.sendFeedback()}>
          <Text style={styles.text}> SEND FEEDBACK </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={()=>this.startNewConversation()}>
          <Text style={styles.text}> START A NEW CONVERSATION </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={()=>this.showUnreadMessagesCount()}>
          <Text style={styles.text}> GET UNREAD MESSAGES COUNT </Text>
        </TouchableOpacity>
      </View>
    );
  }

  showIntroMessage() {
    Instabug.showIntroMessage();
  }

  invoke() {
    Instabug.invoke();
  }

  sendBugReport() {
    Instabug.invokeWithInvocationMode(Instabug.invocationMode.newBug);
  }

  sendFeedback() {
    Instabug.invokeWithInvocationMode(Instabug.invocationMode.newFeedback);
  }

  startNewConversation() {
    Instabug.invokeWithInvocationMode(Instabug.invocationMode.newChat);
  }

  showUnreadMessagesCount() {
    Instabug.getUnreadMessagesCount((count) => {
      alert("Messages: " + count);
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
    margin: 20
  },
  text: {
    color: '#FFFFFF'
  },
  button: {
    marginTop: 10,
    backgroundColor: "#1D82DC",
    padding: 10,
    alignItems: 'center',
    borderRadius: 5
  }
});
