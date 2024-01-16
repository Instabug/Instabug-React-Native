import React from 'react';

import { ListTile } from '../../components/ListTile';
import { Screen } from '../../components/Screen';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { HomeStackParamList } from '../../navigation/HomeStack';

export const ComplexViewsScreen: React.FC<
  NativeStackScreenProps<HomeStackParamList, 'ComplexViews'>
> = ({ navigation }) => {
  return (
    <Screen>
      <ListTile title="Private Views" onPress={() => navigation.push('PrivateViews')} />
    </Screen>
  );
};
