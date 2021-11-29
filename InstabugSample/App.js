/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  processColor,
  Switch,
  ScrollView,
} from 'react-native';

import Instabug, {
  BugReporting,
  FeatureRequests,
  Surveys,
  Chats,
  CrashReporting,
  Replies,
  APM,
  NetworkLogger,
} from 'instabug-reactnative';

import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import { ApolloClient, HttpLink, ApolloLink, InMemoryCache, from } from 'apollo-boost';
import gql from 'graphql-tag';
const httpLink = new HttpLink({ uri: 'https://graphqlzero.almansi.me/api' });
const IBGApolloLink = new ApolloLink(NetworkLogger.apolloLinkRequestHandler);

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: from([IBGApolloLink, httpLink]),
});
const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

class Home extends Component<{}> {
  constructor(props) {
    super(props);
    this.state = {
      switchValue: true,
      colorTheme: 'Light',
    };

    Instabug.start('APP_TOKEN', [ Instabug.invocationEvent.floatingButton]);
    APM.setEnabled(true);
  }

  render() {
    return (
      <View testID="welcome" style={styles.container}>
        <ScrollView contentContainerStyle={styles.contentContainer}>
          <Text style={styles.details}>
            Hello {"Instabug's"} awesome user! The purpose of this application
            is to show you the different options for customizing the SDK and how
            easy it is to integrate it to your existing app
          </Text>
          <TouchableOpacity style={styles.button} onPress={() => this.invoke()}>
            <Text style={styles.text}> INVOKE </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => this.sendBugReport()}>
            <Text style={styles.text}> SEND BUG REPORT </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => this.sendFeedback()}>
            <Text style={styles.text}> SEND FEEDBACK </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => this.startNewConversation()}>
            <Text style={styles.text}> ASK A QUESTION </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => this.sendCrashReport()}>
            <Text style={styles.text}> THROW HANDLED EXCEPTION </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => this.showNpsSurvey()}>
            <Text style={styles.text}> SHOW NPS SURVEY </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => this.showMultipleQuestionSurvey()}>
            <Text style={styles.text}> SHOW MULTIPLE QUESTION SURVEY </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => this.showFeatureRequests()}>
            <Text style={styles.text}> SHOW FEATURE REQUESTS </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => this.showUnreadMessagesCount()}>
            <Text style={styles.text}> GET UNREAD MESSAGES COUNT </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => this.normalHttp()}>
            <Text style={styles.text}> NORMAL HTTP REQUEST </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => this.graphQLRequest()}>
            <Text style={styles.text}> GRAPHQL REQUEST </Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    );
  }

  showIntroMessage() {
    Instabug.showIntroMessage();
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
    BugReporting.showWithOptions(BugReporting.reportType.bug);
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
    BugReporting.showWithOptions(BugReporting.reportType.feedback, [
      BugReporting.option.emailFieldHidden,
    ]);
  }

  startNewConversation() {
    BugReporting.showWithOptions(BugReporting.reportType.question);
  }

  showUnreadMessagesCount() {
    Replies.getUnreadRepliesCount(count => {
      alert('Messages: ' + count);
    });
  }

  normalHttp() {
    fetch('https://jsonplaceholder.typicode.com/todos/1');
  }

  graphQLRequest() {
    client.query({
      query: gql`
        query GetUser {
          user(id: 1) {
            id
            name
          }
        }
      `,
    });
  }
}
class Settings extends Component<{}> {
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
            Hello {"Instabug's"} awesome user! The purpose of this application
            is to show you the different options for customizing the SDK and how
            easy it is to integrate it to your existing app
          </Text>
          {this.invocationEvent()}
          <Text style={styles.textColor}> Set primary color </Text>
          <View style={styles.rowView}>
            <TouchableOpacity
              style={buttonColor('#FF0000')}
              onPress={() => this.setPrimaryColor('#FF0000')}
            />
            <TouchableOpacity
              style={buttonColor('#00FF00')}
              onPress={() => this.setPrimaryColor('#00FF00')}
            />
            <TouchableOpacity
              style={buttonColor('#0000FF')}
              onPress={() => this.setPrimaryColor('#0000FF')}
            />
            <TouchableOpacity
              style={buttonColor('#FFFF00')}
              onPress={() => this.setPrimaryColor('#FFFF00')}
            />
          </View>
          <View style={styles.switchView}>
            <Text style={styles.textSwitchStyle}>
              Color Theme: {this.state.colorTheme}
            </Text>
            <Switch
              onValueChange={this.toggleSwitch}
              value={this.state.switchValue}
            />
          </View>
        </ScrollView>
      </View>
    );
  }

  invocationEvent() {
    return (
      <View>
        <Text style={styles.textColor}> Change Invocation Event </Text>
        <View style={styles.rowView}>
          <TouchableOpacity
            style={styles.buttonColor}
            onPress={() => this.changeInvocationEvent('Shake')}>
            <Text style={styles.textInvoke}> SHAKE </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.buttonColor}
            onPress={() => this.changeInvocationEvent('Screenshot')}>
            <Text style={styles.textInvoke}> SCREENSHOT </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.buttonColor}
            onPress={() => this.changeInvocationEvent('twoFingersSwipe')}>
            <Text style={styles.textInvoke}> TWO FINGERS SWIPE LEFT</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.buttonColor}
            onPress={() => this.changeInvocationEvent('Button')}>
            <Text style={styles.textInvoke}> FLOATING BUTTON </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.buttonColor}
            onPress={() => this.changeInvocationEvent('None')}>
            <Text style={styles.textInvoke}> NONE </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  toggleSwitch = value => {
    this.setState({switchValue: value});
    if (value) {
      this.setState({colorTheme: 'Light'});
      Instabug.setColorTheme(Instabug.colorTheme.light);
    } else {
      this.setState({colorTheme: 'Dark'});
      Instabug.setColorTheme(Instabug.colorTheme.dark);
    }
  };

  setPrimaryColor(color) {
    Instabug.setPrimaryColor(color);
  }

  changeInvocationEvent(invocationEvent) {
    if (invocationEvent === 'Shake')
      BugReporting.setInvocationEvents([BugReporting.invocationEvent.shake]);
    if (invocationEvent === 'Button')
      BugReporting.setInvocationEvents([
        BugReporting.invocationEvent.floatingButton,
      ]);
    if (invocationEvent === 'Screenshot')
      BugReporting.setInvocationEvents([
        BugReporting.invocationEvent.screenshot,
      ]);
    if (invocationEvent === 'twoFingersSwipe')
      BugReporting.setInvocationEvents([
        BugReporting.invocationEvent.twoFingersSwipe,
      ]);
    if (invocationEvent === 'None')
      BugReporting.setInvocationEvents([BugReporting.invocationEvent.none]);
  }
}
buttonColor = function (myColor) {
  return {
    marginTop: 10,
    padding: 20,
    paddingRight: 40,
    alignItems: 'center',
    borderRadius: 5,
    marginRight: 5,
    backgroundColor: myColor,
  };
};
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
  rowView: {
    flexDirection: 'row',
    marginTop: 10,
    maxWidth: '100%',
    flexGrow: 1,
    flexWrap: 'wrap',
  },
  textColor: {
    fontSize: 14,
    fontWeight: 'bold',
    marginTop: 10,
    color: 'black',
  },
  buttonColor: {
    marginTop: 10,
    backgroundColor: '#1D82DC',
    padding: 10,
    alignItems: 'center',
    borderRadius: 5,
    marginRight: 5,
  },
  textSwitchStyle: {
    marginTop: 10,
    marginRight: 5,
    fontWeight: 'bold',
    color: 'black',
  },
  switchView: {
    flexDirection: 'row',
    marginTop: 20,
  },
  textInvoke: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: 'bold',
  },
  contentContainer: {
    padding: 10,
  },
});
export default function App() {
  const Tab = createBottomTabNavigator();
  return (
    <NavigationContainer onStateChange={Instabug.onStateChange}>
      <Tab.Navigator>
        <Tab.Screen name="Home" component={Home} />
        <Tab.Screen name="Settings" component={Settings} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
