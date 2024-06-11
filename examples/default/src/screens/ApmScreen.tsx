import React from 'react';

import { ListTile } from '../components/ListTile';
import { Screen } from '../components/Screen';
import axios from 'axios';

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
