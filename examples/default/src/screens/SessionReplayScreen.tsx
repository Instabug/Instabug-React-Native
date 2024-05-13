import React from 'react';

import { SessionReplay } from '@instabug/instabug-reactnative-dream11';
import { useToast } from 'native-base';

import { ListTile } from '../components/ListTile';
import { Screen } from '../components/Screen';

export const SessionReplayScreen: React.FC = () => {
  const toast = useToast();
  return (
    <Screen>
      <ListTile
        title="Show Current Session link"
        onPress={async () => {
          const link = await SessionReplay.getSessionReplayLink();
          if (link === null) {
            toast.show({
              description: 'link not found',
            });
          } else {
            toast.show({
              description: link,
            });
          }
        }}
      />
    </Screen>
  );
};
