import React, { useState } from 'react';

import Instabug, { BugReporting } from 'instabug-reactnative';
import { Button, HStack, Switch, Text, VStack } from 'native-base';

import { ColorButton } from '../components/ColorButton';
import { Section } from '../components/Section';

const colors = ['#1D82DC', 'crimson', 'olivedrab', 'gold'];
const invocationEvents = [
  { label: 'None', value: Instabug.invocationEvent.none },
  { label: 'Shake', value: Instabug.invocationEvent.shake },
  { label: 'Screenshot', value: Instabug.invocationEvent.screenshot },
  { label: 'Two fingers swipe left', value: Instabug.invocationEvent.twoFingersSwipe },
  { label: 'Floating button', value: Instabug.invocationEvent.floatingButton },
];

export const SettingsScreen: React.FC = () => {
  const [color, setColor] = useState(colors[0]);
  const [theme, setTheme] = useState(Instabug.colorTheme.light);

  const isLightTheme = theme === Instabug.colorTheme.light;

  return (
    <VStack alignItems="stretch" padding="8" space="8">
      <Section title="Invocation Event">
        <HStack space="1" flexWrap="wrap">
          {invocationEvents.map((event) => (
            <Button
              key={event.label}
              margin="1"
              onPress={() => BugReporting.setInvocationEvents([event.value])}>
              {event.label}
            </Button>
          ))}
        </HStack>
      </Section>

      <Section title="Primary Color">
        <HStack space="4">
          {colors.map((x) => (
            <ColorButton
              key={x}
              color={x}
              checked={x === color}
              onPress={(value: string) => {
                Instabug.setPrimaryColor(value);
                setColor(value);
              }}
            />
          ))}
        </HStack>
      </Section>

      <Section title="Color Theme">
        <HStack space="2" alignItems="center">
          <Text>Dark</Text>
          <Switch
            accessibilityLabel="Light color theme"
            value={isLightTheme}
            onValueChange={(value: boolean) => {
              const newTheme = value ? Instabug.colorTheme.light : Instabug.colorTheme.dark;
              Instabug.setColorTheme(newTheme);
              setTheme(newTheme);
            }}
          />
          <Text>Light</Text>
        </HStack>
      </Section>
    </VStack>
  );
};
