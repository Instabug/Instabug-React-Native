import React from 'react';

import { FeatureRequests } from 'instabug-reactnative';

import { Button } from '../components/Button';
import { Screen } from '../components/Screen';

export const FeatureRequestsScreen: React.FC = () => {
  return (
    <Screen>
      <Button onPress={() => FeatureRequests.show()}>Show Feature Requests</Button>
    </Screen>
  );
};
