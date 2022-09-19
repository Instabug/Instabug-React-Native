import React, { useState } from 'react';
import { ScrollView, Switch, StyleSheet, Text, View, Platform } from 'react-native';
import Instabug, { BugReporting } from 'instabug-reactnative';

import Button from '../components/Button';
import ColorButton from '../components/ColorButton';

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
            <Button onPress={() => changeInvocationEvent(BugReporting.invocationEvent.shake)}>
              Shake
            </Button>
            <Button onPress={() => changeInvocationEvent(BugReporting.invocationEvent.screenshot)}>
              Screenshot
            </Button>
            <Button
              onPress={() => changeInvocationEvent(BugReporting.invocationEvent.twoFingersSwipe)}>
              Two Fingers Swipe Left
            </Button>
            <Button
              onPress={() => changeInvocationEvent(BugReporting.invocationEvent.floatingButton)}>
              Floating Button
            </Button>
            <Button onPress={() => changeInvocationEvent(BugReporting.invocationEvent.none)}>
              None
            </Button>
          </View>
        </View>

        <Text style={styles.textColor}> Set primary color </Text>
        <View style={styles.rowView}>
          <ColorButton color="crimson" onPress={setPrimaryColor} />
          <ColorButton color="olivedrab" onPress={setPrimaryColor} />
          <ColorButton color="cornflowerblue" onPress={setPrimaryColor} />
          <ColorButton color="gold" onPress={setPrimaryColor} />
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
