import React from 'react';

import { FeatureRequests } from 'instabug-reactnative';
import { Screen } from 'react-native-screens';

import { ListTile } from '../components/ListTile';

export const FeatureRequestsScreen: React.FC = () => {
  return (
    <Screen>
      <ListTile title="Show Feature Requests" onPress={() => FeatureRequests.show()} />
    </Screen>
  );
};
