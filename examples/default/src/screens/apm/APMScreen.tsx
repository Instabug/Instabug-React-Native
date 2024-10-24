import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { HomeStackParamList } from '../../navigation/HomeStack';
import React from 'react';
import { ListTile } from '../../components/ListTile';
import { Screen } from '../../components/Screen';

export const APMScreen: React.FC<NativeStackScreenProps<HomeStackParamList, 'APM'>> = ({
  navigation,
}) => {
  return (
    <Screen>
      <ListTile title="Network Screen" onPress={() => navigation.navigate('NetworkTraces')} />
      <ListTile title="Traces" onPress={() => navigation.navigate('ExecutionTraces')} />
      <ListTile title="Flows" onPress={() => navigation.navigate('AppFlows')} />
    </Screen>
  );
};
