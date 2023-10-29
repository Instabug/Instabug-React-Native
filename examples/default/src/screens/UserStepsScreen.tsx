import React from 'react';

import { ListTile } from '../components/ListTile';
import { Screen } from '../components/Screen';
import type { HomeStackParamList } from '../navigation/HomeStack';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

export const UserStepsScreen: React.FC<NativeStackScreenProps<HomeStackParamList, 'UserSteps'>> = ({
  navigation,
}) => {
  return (
    <Screen>
      <ListTile title="Basic Components" onPress={() => navigation.navigate('BasicComponents')} />
      <ListTile title="Scroll View" onPress={() => navigation.navigate('ScrollView')} />
      <ListTile title="Flat List" onPress={() => navigation.navigate('FlatList')} />
    </Screen>
  );
};
