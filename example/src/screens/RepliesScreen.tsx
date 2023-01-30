import React from 'react';
import { Alert } from 'react-native';

import { Replies } from 'instabug-reactnative';
import { Button, VStack } from 'native-base';

export const RepliesScreen: React.FC = () => {
  return (
    <VStack alignItems="stretch" padding="8" space="4">
      <Button
        onPress={() => Replies.getUnreadRepliesCount((count) => Alert.alert('Messages: ' + count))}>
        Get Unread Messages Count
      </Button>
    </VStack>
  );
};
