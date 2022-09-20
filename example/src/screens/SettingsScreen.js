import React, { useState } from 'react';
import { Switch, StyleSheet, Text, View } from 'react-native';
import Instabug, { BugReporting } from 'instabug-reactnative';

import Button from '../components/Button';
import ColorButton from '../components/ColorButton';
import Screen from '../components/Screen';
import Section from '../components/Section';

const colors = ['crimson', 'olivedrab', 'cornflowerblue', 'gold'];

function SettingsScreen() {
  const [isLightMode, setIsLightMode] = useState(true);
  const [currentColor, setCurrentColor] = useState('');

  const toggleColorTheme = _isLightMode => {
    setIsLightMode(_isLightMode);
    Instabug.setColorTheme(_isLightMode ? Instabug.colorTheme.light : Instabug.colorTheme.dark);
  };

  const setPrimaryColor = color => {
    Instabug.setPrimaryColor(color);
    setCurrentColor(color);
  };

  const changeInvocationEvent = invocationEvent =>
    BugReporting.setInvocationEvents([invocationEvent]);

  return (
    <Screen>
      <Section title="Invocation Event">
        <View style={[styles.row, { marginTop: -10 }]}>
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
      </Section>

      <Section title="Primary Color">
        <View style={styles.row}>
          {colors.map(color => (
            <ColorButton
              key={color}
              color={color}
              checked={currentColor === color}
              onPress={setPrimaryColor}
            />
          ))}
        </View>
      </Section>

      <Section title="Color Theme">
        <View style={styles.colorThemeContainer}>
          <Text style={styles.colorThemeText}>Dark</Text>
          <Switch
            accessibilityLabel="Light color theme"
            onValueChange={toggleColorTheme}
            value={isLightMode}
            style={styles.colorThemeSwitch}
          />
          <Text style={styles.colorThemeText}>Light</Text>
        </View>
      </Section>
    </Screen>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    maxWidth: '100%',
    flexGrow: 1,
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  colorThemeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  colorThemeText: {
    fontSize: 18,
  },
  colorThemeSwitch: {
    marginHorizontal: 15,
  },
});

export default SettingsScreen;
