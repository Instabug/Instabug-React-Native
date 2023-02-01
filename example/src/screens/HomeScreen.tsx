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
      <ListTile title="BugReporting" onPress={() => navigation.navigate('BugReporting')} />
      <ListTile title="CrashReporting" onPress={() => navigation.navigate('CrashReporting')} />
      <ListTile title="FeatureRequests" onPress={() => navigation.navigate('FeatureRequests')} />
      <ListTile title="Replies" onPress={() => navigation.navigate('Replies')} />
      <ListTile title="Surveys" onPress={() => navigation.navigate('Surveys')} />
    </Screen>
  );
};
