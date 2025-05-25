import React from 'react';

import type { NativeStackScreenProps } from '@react-navigation/native-stack';

import { ListTile } from '../components/ListTile';
import { Screen } from '../components/Screen';
import type { HomeStackParamList } from '../navigation/HomeStack';

export const HomeScreen: React.FC<NativeStackScreenProps<HomeStackParamList, 'Home'>> = ({
  navigation,
}) => {
  return (
    <Screen>
      <ListTile title="Bug Reporting" onPress={() => navigation.navigate('BugReporting')} />
      <ListTile title="Crash Reporting" onPress={() => navigation.navigate('CrashReporting')} />
      <ListTile title="User Steps" onPress={() => navigation.navigate('UserSteps')} />
      <ListTile title="APM" onPress={() => navigation.navigate('APM')} />
      <ListTile title="Session Replay" onPress={() => navigation.navigate('SessionReplay')} />
      <ListTile title="Legacy Mode" onPress={() => navigation.navigate('LegacyMode')} />
    </Screen>
  );
};
