import React from 'react';

import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Button, VStack } from 'native-base';

import type { HomeStackParamList } from '../navigation/HomeStack';

export const HomeScreen: React.FC<NativeStackScreenProps<HomeStackParamList, 'Home'>> = ({
  navigation,
}) => {
  return (
    <VStack alignItems="stretch" padding="8" space="4">
      <Button onPress={() => navigation.navigate('BugReporting')}>BugReporting</Button>
      <Button onPress={() => navigation.navigate('CrashReporting')}>CrashReporting</Button>
      <Button onPress={() => navigation.navigate('FeatureRequests')}>FeatureRequests</Button>
      <Button onPress={() => navigation.navigate('Replies')}>Replies</Button>
      <Button onPress={() => navigation.navigate('Surveys')}>Surveys</Button>
    </VStack>
  );
};
