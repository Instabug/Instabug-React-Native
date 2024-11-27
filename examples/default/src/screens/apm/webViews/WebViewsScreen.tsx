import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { HomeStackParamList } from '../../../navigation/HomeStack';
import React from 'react';
import { Screen } from '../../../components/Screen';
import { ListTile } from '../../../components/ListTile';

export const WebViewsScreen: React.FC<NativeStackScreenProps<HomeStackParamList, 'WebViews'>> = ({
  navigation,
}) => {
  return (
    <Screen>
      <ListTile title="Full Web View" onPress={() => navigation.navigate('FullWebViews')} />
      <ListTile title="Partial Web View" onPress={() => navigation.navigate('PartialWebViews')} />
    </Screen>
  );
};
