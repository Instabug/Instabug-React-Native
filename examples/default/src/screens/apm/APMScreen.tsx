import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import axios from 'axios';

import type { HomeStackParamList } from '../../navigation/HomeStack';
import React from 'react';
import { ListTile } from '../../components/ListTile';
import { Screen } from '../../components/Screen';

export const APMScreen: React.FC<NativeStackScreenProps<HomeStackParamList, 'APM'>> = ({
  navigation,
}) => {
  const simulateNetworkRequest = async () => {
    const response = await axios.get('https://httpbin.org/anything', {
      headers: { traceparent: 'Caught Header Example' },
    });
  };
  const simulateNetworkRequestWithoutHeader = async () => {
    const response = await axios.get('https://httpbin.org/anything');
  };
  return (
    <Screen>
      <ListTile
        title="Simulate Network Request With Header"
        onPress={() => simulateNetworkRequest()}
      />
      <ListTile
        title="Simulate Network Request"
        onPress={() => simulateNetworkRequestWithoutHeader()}
      />
      <ListTile title="Network Screen" onPress={() => navigation.navigate('NetworkTraces')} />
      <ListTile title="Traces" onPress={() => navigation.navigate('ExecutionTraces')} />
      <ListTile title="Flows" onPress={() => navigation.navigate('AppFlows')} />
    </Screen>
  );
};
