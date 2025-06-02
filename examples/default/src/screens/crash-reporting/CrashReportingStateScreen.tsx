import React from 'react';
import { Screen } from '../../components/Screen';
import { ListTile } from '../../components/ListTile';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { HomeStackParamList } from '../../navigation/HomeStack';

export interface CrashReportingStateScreenProp {
  isEnabled: boolean;
  setIsEnabled: (enabled: boolean) => void;
}

export const CrashReportingStateScreen: React.FC<
  NativeStackScreenProps<HomeStackParamList, 'CrashReportingState'>
> = ({ navigation, route }) => {
  const { isEnabled, setIsEnabled } = route.params;

  return (
    <Screen>
      <ListTile
        title="Enabled"
        onPress={() => setIsEnabled(true)}
        testID="id_enabled"
        subtitle={isEnabled ? 'Selected' : undefined}
      />
      <ListTile
        title="Disabled"
        onPress={() => setIsEnabled(false)}
        testID="id_disabled"
        subtitle={!isEnabled ? 'Selected' : undefined}
      />
    </Screen>
  );
};
