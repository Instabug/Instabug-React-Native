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
  TouchableOpacity,
  processColor,
  Switch,
  ScrollView
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
    this.state = {
      switchValue: false,
      colorTheme: 'Dark'
    };
    Instabug.startWithToken("APP_TOKEN", Instabug.invocationEvent.shake);
    Instabug.setReportCategories("Performance","UI","Flow","Other");
    Instabug.setPromptOptionsEnabled(true, true, true);
    Instabug.setLocale(Instabug.locale.english);
  }

  render() {
    return (
      <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.contentContainer} >
          <Text style={styles.details}>
            Hello {"Instabug's"} awesome user! The purpose of this application is to show you the different
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
          {this.invocationEvent()}
          <Text style={styles.textColor}> Set primary color </Text>
          <View style={styles.rowView}>
            <TouchableOpacity style={styles.buttonColor} onPress={()=>this.setPrimaryColor('#FF0000')}>
              <Text style={styles.text}> RED </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttonColor} onPress={()=>this.setPrimaryColor('#00FF00')}>
              <Text style={styles.text}> GREEN </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttonColor} onPress={()=>this.setPrimaryColor('#0000FF')}>
              <Text style={styles.text}> BLUE </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttonColor} onPress={()=>this.setPrimaryColor('#FFFF00')}>
              <Text style={styles.text}> YELLOW </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.switchView}>
            <Text style={styles.textSwitchStyle}>Color Theme: {this.state.colorTheme}</Text>
            <Switch
                onValueChange = {this.toggleSwitch}
                value = {this.state.switchValue}/>
          </View>
        </ScrollView>
      </View>
    );
  }

  invocationEvent() {
    if(Platform.OS === 'ios') {
      return(
        <View>
          <Text style={styles.textColor}> Change Invocation Event </Text>
          <View style={styles.rowView}>
            <TouchableOpacity style={styles.buttonColor} onPress={()=>this.changeInvocationEvent('Shake')}>
              <Text style={styles.textInvoke}> SHAKE </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttonColor} onPress={()=>this.changeInvocationEvent('Button')}>
              <Text style={styles.textInvoke}> FLOATING BUTTON </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttonColor} onPress={()=>this.changeInvocationEvent('Screenshot')}>
              <Text style={styles.textInvoke}> SCREENSHOT </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttonColor} onPress={()=>this.changeInvocationEvent('None')}>
              <Text style={styles.textInvoke}> NONE </Text>
            </TouchableOpacity>
          </View>
        </View>
      );
    }
    return;
  }

  toggleSwitch = (value) => {
      this.setState({switchValue: value})
      if(value) {
        this.setState({colorTheme: 'Light'});
        Instabug.setColorTheme(Instabug.colorTheme.light);
      } else {
        this.setState({colorTheme: 'Dark'});
        Instabug.setColorTheme(Instabug.colorTheme.dark);
      }
   }

  setPrimaryColor(color) {
    Instabug.setPrimaryColor(processColor(color));
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

  changeInvocationEvent(invocationEvent) {
    if(invocationEvent === 'Shake')
      Instabug.setInvocationEvent(Instabug.invocationEvent.shake);
    if(invocationEvent === 'Button')
      Instabug.setInvocationEvent(Instabug.invocationEvent.floatingButton);
    if(invocationEvent === 'Screenshot')
      Instabug.setInvocationEvent(Instabug.invocationEvent.screenshot);
    if(invocationEvent === 'None')
      Instabug.setInvocationEvent(Instabug.invocationEvent.none);
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
    margin: 20,
    marginTop: Platform.OS === 'ios' ? 40 : 20
  },
  text: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: 'bold'
  },
  button: {
    marginTop: 10,
    backgroundColor: "#1D82DC",
    padding: 10,
    alignItems: 'center',
    borderRadius: 5
  },
  rowView: {
    flexDirection: 'row',
    marginTop: 10
  },
  textColor: {
    fontSize: 14,
    fontWeight: 'bold',
    marginTop: 10,
  },
  buttonColor: {
    marginTop: 10,
    backgroundColor: "#1D82DC",
    padding: 10,
    alignItems: 'center',
    borderRadius: 5,
    marginRight: 5
  },
  textSwitchStyle: {
    marginTop: 10,
    marginRight: 5,
    fontWeight: 'bold'
  },
  switchView: {
    flexDirection: 'row',
    marginTop: 20,
  },
  textInvoke: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: 'bold'
  },
  contentContainer: {
    padding: 10
  }
});
