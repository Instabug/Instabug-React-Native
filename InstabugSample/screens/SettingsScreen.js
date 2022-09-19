import React, { useState } from 'react';
import {
  ScrollView,
  Switch,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Platform,
} from 'react-native';
import Instabug, { BugReporting } from 'instabug-reactnative';

function buttonColor(color) {
  return {
    marginTop: 10,
    padding: 20,
    paddingRight: 40,
    alignItems: 'center',
    borderRadius: 5,
    marginRight: 5,
    backgroundColor: color,
  };
}

function SettingsScreen() {
  const [isLightMode, setIsLightMode] = useState(true);
  const colorTheme = isLightMode ? 'Light' : 'Dark';

  const toggleColorTheme = _isLightMode => {
    setIsLightMode(_isLightMode);
    Instabug.setColorTheme(_isLightMode ? Instabug.colorTheme.light : Instabug.colorTheme.dark);
  };

  const setPrimaryColor = color => Instabug.setPrimaryColor(color);

  const changeInvocationEvent = invocationEvent =>
    BugReporting.setInvocationEvents([invocationEvent]);

  return (
    <View testID="welcome" style={styles.container}>
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <Text style={styles.details}>
          Hello Instabug's awesome user! The purpose of this application is to show you the
          different options for customizing the SDK and how easy it is to integrate it to your
          existing app
        </Text>

        <View>
          <Text style={styles.textColor}> Change Invocation Event </Text>
          <View style={styles.rowView}>
            <TouchableOpacity
              style={styles.buttonColor}
              onPress={() => changeInvocationEvent(BugReporting.invocationEvent.shake)}>
              <Text style={styles.textInvoke}> SHAKE </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.buttonColor}
              onPress={() => changeInvocationEvent(BugReporting.invocationEvent.screenshot)}>
              <Text style={styles.textInvoke}> SCREENSHOT </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.buttonColor}
              onPress={() => changeInvocationEvent(BugReporting.invocationEvent.twoFingersSwipe)}>
              <Text style={styles.textInvoke}> TWO FINGERS SWIPE LEFT</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.buttonColor}
              onPress={() => changeInvocationEvent(BugReporting.invocationEvent.floatingButton)}>
              <Text style={styles.textInvoke}> FLOATING BUTTON </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.buttonColor}
              onPress={() => changeInvocationEvent(BugReporting.invocationEvent.none)}>
              <Text style={styles.textInvoke}> NONE </Text>
            </TouchableOpacity>
          </View>
        </View>

        <Text style={styles.textColor}> Set primary color </Text>
        <View style={styles.rowView}>
          <TouchableOpacity
            style={buttonColor('#FF0000')}
            onPress={() => setPrimaryColor('#FF0000')}
          />
          <TouchableOpacity
            style={buttonColor('#00FF00')}
            onPress={() => setPrimaryColor('#00FF00')}
          />
          <TouchableOpacity
            style={buttonColor('#0000FF')}
            onPress={() => setPrimaryColor('#0000FF')}
          />
          <TouchableOpacity
            style={buttonColor('#FFFF00')}
            onPress={() => setPrimaryColor('#FFFF00')}
          />
        </View>

        <View style={styles.switchView}>
          <Text style={styles.textSwitchStyle}>Color Theme: {colorTheme}</Text>
          <Switch onValueChange={toggleColorTheme} value={isLightMode} />
        </View>
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

export default SettingsScreen;
