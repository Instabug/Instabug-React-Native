import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { HomeStackParamList } from '../../navigation/HomeStack';
import React, { useState } from 'react';
import { ListTile } from '../../components/ListTile';
import { Screen } from '../../components/Screen';
import { Text, Switch } from 'react-native';
import { APM } from 'instabug-reactnative';
import { showNotification } from '../../utils/showNotification';

export const APMScreen: React.FC<NativeStackScreenProps<HomeStackParamList, 'APM'>> = ({
  navigation,
}) => {
  const [isEnabled, setIsEnabled] = useState(false);

  const toggleSwitch = (value: boolean) => {
    setIsEnabled(value);
    APM.setEnabled(value);
    showNotification('APM status', 'APM enabled set to ' + value);
  };

  return (
    <Screen>
      <Text>Enable APM:</Text>
      <Switch onValueChange={toggleSwitch} value={isEnabled} />
      <ListTile title="End App launch" onPress={() => APM.endAppLaunch()} />
      <ListTile title="Network Screen" onPress={() => navigation.navigate('NetworkTraces')} />
      <ListTile title="Traces" onPress={() => navigation.navigate('ExecutionTraces')} />
      <ListTile title="Flows" onPress={() => navigation.navigate('AppFlows')} />
    </Screen>
  );
};
