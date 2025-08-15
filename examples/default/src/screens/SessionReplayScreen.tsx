import React, { useState } from 'react';

import { SessionReplay } from 'instabug-reactnative';
import { useToast } from 'native-base';

import { ListTile } from '../components/ListTile';
import { Screen } from '../components/Screen';
import { UserStepsState } from './settings/UserStepsStateScreen';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { HomeStackParamList } from '../navigation/HomeStack';

export const SessionReplayScreen: React.FC<
  NativeStackScreenProps<HomeStackParamList, 'NetworkTraces'>
> = ({ navigation }) => {
  const toast = useToast();

  const [isSessionReplayEnabled, setIsSessionReplayEnabled] = useState<boolean>(true);
  const [isSessionNetworkLogsEnabled, setIsSessionNetworkLogsEnabled] = useState<boolean>(true);
  const [isSessionInstabugLogsEnabled, setIsSessionInstabugLogsEnabled] = useState<boolean>(true);
  const [isSessionUserStepsEnabled, setIsSessionUSerStepsEnabled] = useState<boolean>(true);

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

      <ListTile
        title="Session Replay Enable"
        subtitle={isSessionReplayEnabled ? 'Enabled' : 'Disabled'}
        onPress={() => {
          navigation.navigate('UserStepsState', {
            state: isSessionReplayEnabled ? UserStepsState.Enabled : UserStepsState.Disabled,
            setState: (newState: UserStepsState) => {
              const isEnabled = newState === UserStepsState.Enabled;
              setIsSessionReplayEnabled(isEnabled);
              SessionReplay.setEnabled(isEnabled);
              navigation.goBack();
            },
          });
        }}
        testID="id_steps_replay_state"
      />

      <ListTile
        title="Session Replay Network Enable"
        subtitle={isSessionNetworkLogsEnabled ? 'Enabled' : 'Disabled'}
        onPress={() => {
          navigation.navigate('UserStepsState', {
            state: isSessionNetworkLogsEnabled ? UserStepsState.Enabled : UserStepsState.Disabled,
            setState: (newState: UserStepsState) => {
              const isEnabled = newState === UserStepsState.Enabled;
              setIsSessionNetworkLogsEnabled(isEnabled);
              SessionReplay.setNetworkLogsEnabled(isEnabled);
              navigation.goBack();
            },
          });
        }}
        testID="id_steps_replay_network_state"
      />

      <ListTile
        title="Session Replay Instabug Logs Enable"
        subtitle={isSessionInstabugLogsEnabled ? 'Enabled' : 'Disabled'}
        onPress={() => {
          navigation.navigate('UserStepsState', {
            state: isSessionInstabugLogsEnabled ? UserStepsState.Enabled : UserStepsState.Disabled,
            setState: (newState: UserStepsState) => {
              const isEnabled = newState === UserStepsState.Enabled;
              setIsSessionInstabugLogsEnabled(isEnabled);
              SessionReplay.setInstabugLogsEnabled(isEnabled);
              navigation.goBack();
            },
          });
        }}
        testID="id_steps_replay_instabug_lgos_state"
      />

      <ListTile
        title="Session Replay UserSteps Enable"
        subtitle={isSessionUserStepsEnabled ? 'Enabled' : 'Disabled'}
        onPress={() => {
          navigation.navigate('UserStepsState', {
            state: isSessionUserStepsEnabled ? UserStepsState.Enabled : UserStepsState.Disabled,
            setState: (newState: UserStepsState) => {
              const isEnabled = newState === UserStepsState.Enabled;
              setIsSessionUSerStepsEnabled(isEnabled);
              SessionReplay.setUserStepsEnabled(isEnabled);
              navigation.goBack();
            },
          });
        }}
        testID="id_steps_replay_usersteps_state"
      />
    </Screen>
  );
};
