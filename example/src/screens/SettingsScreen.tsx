import React, { useState } from 'react';

import Instabug, { BugReporting, ColorTheme, InvocationEvent } from 'instabug-reactnative';
import { Input, InputGroup, InputLeftAddon } from 'native-base';

import { ListTile } from '../components/ListTile';
import { Screen } from '../components/Screen';
import { Select } from '../components/Select';

export const SettingsScreen: React.FC = () => {
  const [color, setColor] = useState('1D82DC');

  return (
    <Screen>
      <ListTile title="Invocation Event">
        <Select
          label="Select Invocation Event"
          items={[
            {
              label: 'None',
              value: InvocationEvent.None,
            },
            {
              label: 'Shake',
              value: InvocationEvent.Shake,
            },
            {
              label: 'Screenshot',
              value: InvocationEvent.Screenshot,
            },
            {
              label: 'Two fingers swipe left',
              value: InvocationEvent.TwoFingersSwipe,
            },
            {
              label: 'Floating button',
              value: InvocationEvent.FloatingButton,
              isInitial: true,
            },
          ]}
          onValueChange={(value) => {
            BugReporting.setInvocationEvents([value]);
          }}
        />
      </ListTile>

      <ListTile title="Primary Color">
        <InputGroup>
          <InputLeftAddon>#</InputLeftAddon>
          <Input
            value={color}
            maxLength={6}
            flex={1}
            accessibilityLabel="Primary Color Value"
            onChangeText={(value) => {
              setColor(value);
              if (/^[0-9A-F]{6}$/i.test(value)) {
                Instabug.setPrimaryColor(`#${value}`);
              }
            }}
          />
        </InputGroup>
      </ListTile>

      <ListTile title="Theme">
        <Select
          label="Select Theme"
          items={[
            {
              label: 'Light',
              value: ColorTheme.Light,
            },
            {
              label: 'Dark',
              value: ColorTheme.Dark,
            },
          ]}
          onValueChange={Instabug.setColorTheme}
        />
      </ListTile>
    </Screen>
  );
};
