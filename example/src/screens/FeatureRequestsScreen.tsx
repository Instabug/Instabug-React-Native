import React from 'react';

import { FeatureRequests } from 'instabug-reactnative';

import { ListTile } from '../components/ListTile';
import { Screen } from '../components/Screen';

export const FeatureRequestsScreen: React.FC = () => {
  return (
    <Screen>
      <ListTile title="Show" onPress={() => FeatureRequests.show()} />
    </Screen>
  );
};
