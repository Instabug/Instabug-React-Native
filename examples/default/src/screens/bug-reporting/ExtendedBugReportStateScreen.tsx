import React from 'react';

import { ListTile } from '../../components/ListTile';
import { Screen } from '../../components/Screen';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { HomeStackParamList } from '../../navigation/HomeStack';
import { ExtendedBugReportMode } from 'instabug-reactnative';

export enum ExtendedBugReportState {
  Disabled = 'Disabled',
  EnabledWithRequiredFields = 'EnabledWithRequiredFields',
  EnabledWithOptionalFields = 'EnabledWithOptionalFields',
}

export interface ExtendedBugReportStateScreenProp {
  state: ExtendedBugReportState;
  setState: (state: ExtendedBugReportState) => void;
}

export const ExtendedBugReportStateScreen: React.FC<
  NativeStackScreenProps<HomeStackParamList, 'ExtendedBugReportState'>
> = ({ navigation, route }) => {
  const { state, setState } = route.params;
  return (
    <Screen>
      <ListTile
        title="Disabled"
        testID="id_disabled"
        onPress={() => setState(ExtendedBugReportState.Disabled)}
        subtitle={state === ExtendedBugReportState.Disabled ? 'Selected' : undefined}
      />
      <ListTile
        title="Enabled with Required Fields"
        testID="id_enabled_required"
        onPress={() => setState(ExtendedBugReportState.EnabledWithRequiredFields)}
        subtitle={
          state === ExtendedBugReportState.EnabledWithRequiredFields ? 'Selected' : undefined
        }
      />
      <ListTile
        title="Enabled with Optional Fields"
        testID="id_enabled_optional"
        onPress={() => setState(ExtendedBugReportState.EnabledWithOptionalFields)}
        subtitle={
          state === ExtendedBugReportState.EnabledWithOptionalFields ? 'Selected' : undefined
        }
      />
    </Screen>
  );
};
