import React, { useState } from 'react';

import Instabug, { BugReporting } from 'instabug-reactnative';
import { CheckIcon, Input, InputGroup, InputLeftAddon, Select } from 'native-base';

import { ListTile } from '../components/ListTile';
import { Screen } from '../components/Screen';

const invocationEvents = [
  { label: 'None', value: Instabug.invocationEvent.none },
  { label: 'Shake', value: Instabug.invocationEvent.shake },
  { label: 'Screenshot', value: Instabug.invocationEvent.screenshot },
  { label: 'Two fingers swipe left', value: Instabug.invocationEvent.twoFingersSwipe },
  { label: 'Floating button', value: Instabug.invocationEvent.floatingButton },
];

export const SettingsScreen: React.FC = () => {
  const [event, setEvent] = useState('Floating Button');
  const [color, setColor] = useState('1D82DC');
  const [theme, setTheme] = useState('light');

  return (
    <Screen>
      <ListTile title="Invocation Event">
        <Select
          accessibilityLabel="Invocation Event"
          selectedValue={event}
          onValueChange={(value) => {
            setEvent(value);
            const invocationEvent = invocationEvents.find((x) => x.label === value)!;
            BugReporting.setInvocationEvents([invocationEvent?.value]);
          }}
          _selectedItem={{
            bg: 'coolGray.200',
            endIcon: <CheckIcon size="4" />,
          }}>
          {invocationEvents.map((x) => (
            <Select.Item key={x.label} label={x.label} value={x.label} />
          ))}
        </Select>
      </ListTile>

      <ListTile title="Primary Color">
        <InputGroup>
          <InputLeftAddon children="#" />
          <Input
            value={color}
            maxLength={6}
            flex={1}
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
          accessibilityLabel="Theme"
          selectedValue={theme}
          onValueChange={(value) => {
            setTheme(value);
            Instabug.setColorTheme(
              value === 'light' ? Instabug.colorTheme.light : Instabug.colorTheme.dark,
            );
          }}
          _selectedItem={{
            bg: 'coolGray.200',
            endIcon: <CheckIcon size="4" />,
          }}>
          <Select.Item label="Light" value="light" />
          <Select.Item label="Dark" value="dark" />
        </Select>
      </ListTile>
    </Screen>
  );
};
