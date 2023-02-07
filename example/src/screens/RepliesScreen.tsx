import React, { useEffect, useState } from 'react';

import { Replies } from 'instabug-reactnative';
import { Heading } from 'native-base';

import { ListTile } from '../components/ListTile';
import { Screen } from '../components/Screen';

export const RepliesScreen: React.FC = () => {
  const [count, setCount] = useState<number>();

  useEffect(() => {
    Replies.getUnreadRepliesCount(setCount);
  }, []);

  return (
    <Screen>
      <ListTile title="Unread Messages">
        <Heading size="sm" textAlign="right">
          {count ?? '...'}
        </Heading>
      </ListTile>
    </Screen>
  );
};
