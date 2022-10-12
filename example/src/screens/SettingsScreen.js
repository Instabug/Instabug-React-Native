import React, { useState } from 'react';
import { Switch, StyleSheet, Text, View } from 'react-native';
import Instabug, { BugReporting } from 'instabug-reactnative';

import { Button } from '../components/Button';
import { ColorButton } from '../components/ColorButton';
import { Screen } from '../components/Screen';
import { Section } from '../components/Section';

const invocationEvents = [
  { label: 'Shake', value: Instabug.invocationEvent.shake },
  { label: 'Screenshot', value: Instabug.invocationEvent.screenshot },
  { label: 'Two fingers swipe left', value: Instabug.invocationEvent.twoFingersSwipe },
  { label: 'Floating button', value: Instabug.invocationEvent.floatingButton },
  { label: 'None', value: Instabug.invocationEvent.none },
];

const colors = ['#1D82DC', 'crimson', 'olivedrab', 'gold'];

export function SettingsScreen() {
  const [theme, setTheme] = useState(Instabug.colorTheme.light);
  const [color, setColor] = useState(colors[0]);

  const isLightTheme = theme === Instabug.colorTheme.light;

  const toggleColorTheme = (isLight) => {
    const theme = isLight ? Instabug.colorTheme.light : Instabug.colorTheme.dark;
    Instabug.setColorTheme(theme);
    setTheme(theme);
  };

  const setPrimaryColor = (color) => {
    Instabug.setPrimaryColor(color);
    setColor(color);
  };

  const changeInvocationEvent = (invocationEvent) =>
    BugReporting.setInvocationEvents([invocationEvent]);

  return (
    <Screen>
      <Section title="Invocation Event">
        <View style={[styles.row, { marginTop: -10 }]}>
          {invocationEvents.map((event) => (
            <Button key={event.label} onPress={() => changeInvocationEvent(event.value)}>
              {event.label}
            </Button>
          ))}
        </View>
      </Section>

      <Section title="Primary Color">
        <View style={styles.row}>
          {colors.map((_color) => (
            <ColorButton
              key={_color}
              color={_color}
              checked={_color === color}
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
