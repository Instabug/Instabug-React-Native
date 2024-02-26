import React, { useEffect, useState } from 'react';

import { Replies } from 'instabug-reactnative';
import { Heading } from 'native-base';

import { ListTile } from '../components/ListTile';
import { Screen } from '../components/Screen';
import { Switch } from 'react-native';

export const RepliesScreen: React.FC = () => {
  const [count, setCount] = useState<number>();
  const [enableNotification, setEnableNotification] = useState<boolean>(true);
  const [pushNotificationEnable, setPushNotificationsEnable] = useState<boolean>(true);
  const [enableInAppReplayNotificationSound, setEnableInAppReplayNotificationSound] =
    useState<boolean>(false);
  const [enableSystemReplayNotificationSound, setEnableSystemReplayNotificationSound] =
    useState<boolean>(false);

  useEffect(() => {
    Replies.getUnreadRepliesCount().then((unReadCount) => {
      setCount(unReadCount);
    });
  }, []);

  return (
    <Screen>
      <ListTile title="Enable notification">
        <Switch
          value={enableNotification}
          onValueChange={(value) => {
            setEnableNotification(value);
            Replies.setEnabled(value);
          }}
        />
      </ListTile>
      <ListTile title="InApp  Replay notification Sound">
        <Switch
          value={enableInAppReplayNotificationSound}
          onValueChange={(value) => {
            setEnableInAppReplayNotificationSound(value);
            Replies.setInAppNotificationSound(value);
          }}
        />
      </ListTile>
      <ListTile title="System replay notification Sound">
        <Switch
          value={enableSystemReplayNotificationSound}
          onValueChange={(value) => {
            setEnableSystemReplayNotificationSound(value);
            Replies.setSystemReplyNotificationSoundEnabledAndroid(value);
          }}
        />
      </ListTile>
      <ListTile title="Push notification enable">
        <Switch
          value={pushNotificationEnable}
          onValueChange={(value) => {
            setPushNotificationsEnable(value);
            Replies.setPushNotificationsEnabled(value);
          }}
        />
      </ListTile>
      <ListTile title="Unread Messages">
        <Heading size="sm" textAlign="right">
          {count ?? '...'}
        </Heading>
      </ListTile>
      <ListTile
        title="Show conversion list"
        onPress={() => {
          Replies.show();
        }}
      />
    </Screen>
  );
};
