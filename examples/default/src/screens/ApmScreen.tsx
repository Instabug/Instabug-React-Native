import React from 'react';
import axios from 'axios';

import { APM } from 'instabug-reactnative';

import { ListTile } from '../components/ListTile';
import { Screen } from '../components/Screen';

export const ApmScreen: React.FC = () => {
  const simulateNetworkRequest = () => {
    axios.get('https://httpbin.org/anything', {
      headers: { traceparent: 'Caught Header Example' },
    });
  };
  const simulateNetworkRequestWithoutHeader = () => {
    axios.get('https://httpbin.org/anything');
  };

  return (
    <Screen>
      <ListTile title="Enable APM" onPress={() => APM.setEnabled(true)} />
      <ListTile title="Disable APM" onPress={() => APM.setEnabled(false)} />
      <ListTile
        title="Simulate Network Request With Header"
        onPress={() => simulateNetworkRequest()}
      />
      <ListTile
        title="Simulate Network Request"
        onPress={() => simulateNetworkRequestWithoutHeader()}
      />
    </Screen>
  );
};
