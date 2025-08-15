import React from 'react';

import { ListTile } from '../../components/ListTile';
import { Screen } from '../../components/Screen';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { HomeStackParamList } from '../../navigation/HomeStack';

export enum UserStepsState {
  Enabled = 'Enabled',
  Disabled = 'Disabled',
}

export interface UserStepsStateScreenProp {
  state: UserStepsState;
  setState: (state: UserStepsState) => void;
}

export const UserStepsStateScreen: React.FC<
  NativeStackScreenProps<HomeStackParamList, 'UserStepsState'>
> = ({ route }) => {
  const { state, setState } = route.params;
  return (
    <Screen>
      <ListTile
        title="Enabled"
        testID="id_enabled"
        onPress={() => setState(UserStepsState.Enabled)}
        subtitle={state === UserStepsState.Enabled ? 'Selected' : undefined}
      />
      <ListTile
        title="Disabled"
        testID="id_disabled"
        onPress={() => setState(UserStepsState.Disabled)}
        subtitle={state === UserStepsState.Disabled ? 'Selected' : undefined}
      />
    </Screen>
  );
};
