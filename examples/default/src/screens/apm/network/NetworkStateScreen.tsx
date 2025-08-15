import React from 'react';

import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { HomeStackParamList } from '../../../navigation/HomeStack';
import { ListTile } from '../../../components/ListTile';
import { Screen } from '../../../components/Screen';

export enum NetworkState {
  Enabled = 'Enabled',
  Disabled = 'Disabled',
}

export interface NetworkStateScreenProp {
  state: NetworkState;
  setState: (state: NetworkState) => void;
}

export const NetworkStateScreen: React.FC<
  NativeStackScreenProps<HomeStackParamList, 'NetworkState'>
> = ({ route }) => {
  const { state, setState } = route.params;
  return (
    <Screen>
      <ListTile
        title="Enabled"
        testID="id_enabled"
        onPress={() => setState(NetworkState.Enabled)}
        subtitle={state === NetworkState.Enabled ? 'Selected' : undefined}
      />
      <ListTile
        title="Disabled"
        testID="id_disabled"
        onPress={() => setState(NetworkState.Disabled)}
        subtitle={state === NetworkState.Disabled ? 'Selected' : undefined}
      />
    </Screen>
  );
};
