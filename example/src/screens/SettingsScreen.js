import React, { useState } from 'react';
import { Switch, StyleSheet, Text, View } from 'react-native';
import Instabug, { BugReporting } from 'instabug-reactnative';

import Button from '../components/Button';
import ColorButton from '../components/ColorButton';
import Screen from '../components/Screen';
import Section from '../components/Section';

const colors = ['#1D82DC', 'crimson', 'olivedrab', 'gold'];

function SettingsScreen() {
  const [colorTheme, setColorTheme] = useState(Instabug.colorTheme.light);
  const [currentColor, setCurrentColor] = useState(colors[0]);

  const isLightTheme = colorTheme === Instabug.colorTheme.light;

  const toggleColorTheme = isLight => {
    const theme = isLight ? Instabug.colorTheme.light : Instabug.colorTheme.dark;
    Instabug.setColorTheme(theme);
    setColorTheme(theme);
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
            value={isLightTheme}
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
