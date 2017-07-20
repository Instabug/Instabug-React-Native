/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  Button,
  Alert,
  View,
  processColor,
  Aerlt,
  Image,
  ListView,
  TouchableHighlight,
  RecyclerViewBackedScrollView,
  ActionSheetIOS,
  TextInput
} from 'react-native';

import Instabug from'instabug-reactnative';

export default class InstabugSample extends Component {

  constructor(props) {
    super(props);

    Instabug.isRunningLive(function (isLive) {
      if (isLive) {
        Instabug.startWithToken('LIVE_TOKEN', Instabug.invocationEvent.shake);
      } else {
        Instabug.startWithToken('BETA_TOKEN', Instabug.invocationEvent.shake);
      }
    });

    

    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource: ds.cloneWithRows(this._genRows({})),
    };
  }

  _renderRow(rowData: string, sectionID: number, rowID: number, highlightRow: (sectionID: number, rowID: number) => void) {
    const that = this;
    return (
      <TouchableHighlight onPress={() => {
          that._pressRow(rowID);
          highlightRow(sectionID, rowID);
        }}>
        <View>
          <View style={styles.row}>
            <Text style={styles.text}>
              {rowData}
            </Text>
          </View>
        </View>
      </TouchableHighlight>
    );
  }

  _genRows() {
    var dataBlob = [
      "Invoke",
      "Invoke with invocation mode",
      "Select invocation event",
      "Show intro message",
      "Unread messages count",
      "Set locale",
      "Set color theme",
      "Set primary color",
      "Show surveys"
    ];
    return dataBlob;
  }

  _pressRow(rowID: number) {
    if (rowID == 0) {
      Instabug.invoke();
    } else if (rowID == 1) {
      this._showInvocationModeActionSheet();
    } else if (rowID == 2) {
      this._showInvocationEventActionSheet();
    } else if (rowID == 3) {
      Instabug.showIntroMessage();
    } else if (rowID == 4) {
      Instabug.getUnreadMessagesCount(function (number) {
          Alert.alert(number.toString());
      });
    } else if (rowID == 5) {
      this._showLocaleActionSheet();
    } else if (rowID == 6) {
      this._showColorThemeActionSheet();
    } else if (rowID == 7) {
      this._showPrimaryColorActionSheet();
    } else if (rowID == 8) {
      this._showSurveys();
    }
  }

  _showInvocationModeActionSheet() {
    ActionSheetIOS.showActionSheetWithOptions({
        options: [
          "New bug",
          "New Feedback",
          "New Chat",
          "None"
        ],
      },
      (buttonIndex) => {
        if (buttonIndex == 0) {
          Instabug.invokeWithInvocationMode(Instabug.invocationMode.newBug);
        } else if (buttonIndex == 1) {
          Instabug.invokeWithInvocationMode(Instabug.invocationMode.newFeedback);
        } else if (buttonIndex == 2) {
          Instabug.invokeWithInvocationMode(Instabug.invocationMode.newChat);
        } else if (buttonIndex == 3) {
          Instabug.invokeWithInvocationMode(Instabug.invocationMode.NA);
        }
      });
  }

  _showColorThemeActionSheet() {
    ActionSheetIOS.showActionSheetWithOptions({
        options: [
          "Light",
          "Dark",
        ],
      },
      (buttonIndex) => {
        if (buttonIndex == 0) {
          Instabug.setColorTheme(Instabug.colorTheme.light);
        } else if (buttonIndex == 1) {
          Instabug.setColorTheme(Instabug.colorTheme.dark);
        }
      });
  }

  _showPrimaryColorActionSheet() {
    ActionSheetIOS.showActionSheetWithOptions({
        options: [
          "Red",
          "Green",
          "Blue"
        ],
      },
      (buttonIndex) => {
        if (buttonIndex == 0) {
          Instabug.setPrimaryColor(processColor('#ff0000'));
        } else if (buttonIndex == 1) {
          Instabug.setPrimaryColor(processColor('#00ff00'));
        } else if (buttonIndex == 2) {
          Instabug.setPrimaryColor(processColor('#0000ff'));
        }
      });
  }

  _showLocaleActionSheet() {
    ActionSheetIOS.showActionSheetWithOptions({
        options: [
          "Arabic",
          "Chinese Simplified",
          "Chinese Traditional",
          "Czech",
          "Danish",
          "English",
          "French",
          "German",
          "Italian",
          "Japanese",
          "Polish",
          "Portuguese Brazil",
          "Russian",
          "Spanish",
          "Swedish",
          "Turkish"
        ],
      },
      (buttonIndex) => {
        if (buttonIndex == 0) {
          Instabug.setLocale(Instabug.locale.arabic);
        } else if (buttonIndex == 1) {
          Instabug.setLocale(Instabug.locale.chineseSimplified);
        } else if (buttonIndex == 2) {
          Instabug.setLocale(Instabug.locale.chineseTraditional);
        } else if (buttonIndex == 3) {
          Instabug.setLocale(Instabug.locale.czech);
        } else if (buttonIndex == 4) {
          Instabug.setLocale(Instabug.locale.danish);
        } else if (buttonIndex == 5) {
          Instabug.setLocale(Instabug.locale.english);
        } else if (buttonIndex == 6) {
          Instabug.setLocale(Instabug.locale.french);
        } else if (buttonIndex == 7) {
          Instabug.setLocale(Instabug.locale.german);
        } else if (buttonIndex == 8) {
          Instabug.setLocale(Instabug.locale.italian);
        } else if (buttonIndex == 9) {
          Instabug.setLocale(Instabug.locale.japanese);
        } else if (buttonIndex == 10) {
          Instabug.setLocale(Instabug.locale.polish);
        } else if (buttonIndex == 11) {
          Instabug.setLocale(Instabug.locale.portugueseBrazil);
        } else if (buttonIndex == 12) {
          Instabug.setLocale(Instabug.locale.russian);
        } else if (buttonIndex == 13) {
          Instabug.setLocale(Instabug.locale.spanish);
        } else if (buttonIndex == 14) {
          Instabug.setLocale(Instabug.locale.swedish);
        } else if (buttonIndex == 15) {
          Instabug.setLocale(Instabug.locale.turkish);
        }
      });
  }

 _showInvocationEventActionSheet() {
    ActionSheetIOS.showActionSheetWithOptions({
        options: [
          "Shake",
          "Screenshot",
          "Two fingers swipe",
          "Floating button"
        ],
      },
      (buttonIndex) => {
        if (buttonIndex == 0) {
          Instabug.setInvocationEvent(Instabug.invocationEvent.shake);
        } else if (buttonIndex == 1) {
          Instabug.setInvocationEvent(Instabug.invocationEvent.screenshot);
        } else if (buttonIndex == 2) {
          Instabug.setInvocationEvent(Instabug.invocationEvent.twoFingersSwipe);
        } else if (buttonIndex) {
          Instabug.setInvocationEvent(Instabug.invocationEvent.floatingButton);
        }
      });
  }

  _showSurveys() {
    console.log("show surveys")
    Instabug.showSurveysIfAvailable()
  }

  _renderSeparator(sectionID: number, rowID: number, adjacentRowHighlighted: bool) {
    return (
      <View
        key={`${sectionID}-${rowID}`}
        style={{
          height: adjacentRowHighlighted ? 4 : 1,
          backgroundColor: adjacentRowHighlighted ? '#3B5998' : '#CCCCCC',
        }}
      />
    );
  }

  render() {
    console.log(JSON.stringify(this.state));
    return (
    <View>
      <ListView
          dataSource={this.state.dataSource}
          renderRow={this._renderRow.bind(this)}
          renderScrollComponent={props => <RecyclerViewBackedScrollView {...props} />}
          style={styles.listView}
      />
      <TextInput 
        style={{height: 40}}
        placeholder="Type here to translate!"
      />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 10,
    backgroundColor: '#F6F6F6',
  },
  thumb: {
    width: 64,
    height: 64,
  },
  text: {
    flex: 1,
  },
  listView: {
    paddingTop: 20
  },
});

AppRegistry.registerComponent('InstabugSample', () => InstabugSample);
