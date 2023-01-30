import React from 'react';
import { Alert } from 'react-native';

import { Replies } from 'instabug-reactnative';

import { Button } from '../components/Button';
import { Screen } from '../components/Screen';

export const RepliesScreen: React.FC = () => {
  return (
    <Screen>
      <Button
        onPress={() => Replies.getUnreadRepliesCount((count) => Alert.alert('Messages: ' + count))}>
        Get Unread Messages Count
      </Button>
    </Screen>
  );
};
