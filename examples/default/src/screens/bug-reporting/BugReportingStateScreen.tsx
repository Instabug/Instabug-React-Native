import React from 'react';

import { ListTile } from '../../components/ListTile';
import { Screen } from '../../components/Screen';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { HomeStackParamList } from '../../navigation/HomeStack';

export enum BugReportingState {
  Enabled = 'Enabled',
  Disabled = 'Disabled',
}

export interface BugReportingStateScreenProp {
  state: BugReportingState;
  setState: (state: BugReportingState) => void;
}

export const BugReportingStateScreen: React.FC<
  NativeStackScreenProps<HomeStackParamList, 'BugReportingState'>
> = ({ navigation, route }) => {
  const { state, setState } = route.params;
  return (
    <Screen>
      <ListTile
        title="Enabled"
        testID="id_br_enabled"
        onPress={() => setState(BugReportingState.Enabled)}
      />
      <ListTile
        title="Disabled"
        testID="id_br_disabled"
        onPress={() => setState(BugReportingState.Disabled)}
      />
    </Screen>
  );
};
