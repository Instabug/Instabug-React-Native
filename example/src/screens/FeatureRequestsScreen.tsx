import React from 'react';

import { FeatureRequests } from 'instabug-reactnative';
import { Button, VStack } from 'native-base';

export const FeatureRequestsScreen: React.FC = () => {
  return (
    <VStack alignItems="stretch" padding="8" space="4">
      <Button onPress={() => FeatureRequests.show()}>Show Feature Requests</Button>
    </VStack>
  );
};
