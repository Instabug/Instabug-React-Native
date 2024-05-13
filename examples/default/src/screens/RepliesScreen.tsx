import React, { useEffect, useState } from 'react';

import { Replies } from '@instabug/instabug-reactnative-dream11';
import { Heading } from 'native-base';

import { ListTile } from '../components/ListTile';
import { Screen } from '../components/Screen';
import { Switch } from 'react-native';
import { PlatformListTile } from '../components/PlatformListTile';

export const RepliesScreen: React.FC = () => {
  const [count, setCount] = useState<number>();
  const [isNotificationEnable, setIsNotificationEnable] = useState<boolean>(true);
  const [isPushNotificationEnable, setIsPushNotificationsEnable] = useState<boolean>(true);
  const [isAppReplayNotificationSoundEnable, setIsAppReplayNotificationSoundEnable] =
    useState<boolean>(false);
  const [isSystemReplayNotificationSound, setIsSystemReplayNotificationSound] =
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
          value={isNotificationEnable}
          onValueChange={(value) => {
            setIsNotificationEnable(value);
            Replies.setEnabled(value);
          }}
        />
      </ListTile>
      <ListTile title="InApp  Replay notification Sound">
        <Switch
          value={isAppReplayNotificationSoundEnable}
          onValueChange={(value) => {
            setIsAppReplayNotificationSoundEnable(value);
            Replies.setInAppNotificationSound(value);
          }}
        />
      </ListTile>
      <PlatformListTile title="System replay notification Sound" platform="android">
        <Switch
          value={isSystemReplayNotificationSound}
          onValueChange={(value) => {
            setIsSystemReplayNotificationSound(value);
            Replies.setSystemReplyNotificationSoundEnabledAndroid(value);
          }}
        />
      </PlatformListTile>
      <PlatformListTile title="Push notification enable" platform="android">
        <Switch
          value={isPushNotificationEnable}
          onValueChange={(value) => {
            setIsPushNotificationsEnable(value);
            Replies.setPushNotificationsEnabled(value);
          }}
        />
      </PlatformListTile>
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
