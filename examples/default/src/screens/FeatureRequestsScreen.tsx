import React, { useState } from 'react';

import { FeatureRequests, ActionType } from 'instabug-reactnative';

import { ListTile } from '../components/ListTile';
import { Text, Switch } from 'react-native';

import { Screen } from '../components/Screen';
import { showNotification } from '../utils/showNotification';

export const FeatureRequestsScreen: React.FC = () => {
  const [isEnabled, setIsEnabled] = useState(false);

  const toggleSwitch = (value: boolean) => {
    setIsEnabled(value);

    FeatureRequests.setEmailFieldRequired(value, ActionType.requestNewFeature);
    showNotification('Email status', 'Email field required set to ' + value);
  };
  return (
    <Screen>
      <Text>Email field Required:</Text>
      <Switch onValueChange={toggleSwitch} value={isEnabled} />
      <ListTile title="Show" onPress={() => FeatureRequests.show()} />
    </Screen>
  );
};
