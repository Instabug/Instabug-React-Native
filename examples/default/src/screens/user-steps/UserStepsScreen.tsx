import React from 'react';

import { ListTile } from '../../components/ListTile';
import { Screen } from '../../components/Screen';
import type { HomeStackParamList } from '../../navigation/HomeStack';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { navToBackAndForthScreen } from './BackAndForthScreen';

export const UserStepsScreen: React.FC<NativeStackScreenProps<HomeStackParamList, 'UserSteps'>> = ({
  navigation,
}) => {
  return (
    <Screen>
      <ListTile title="Basic Components" onPress={() => navigation.navigate('BasicComponents')} />
      <ListTile title="Scroll View" onPress={() => navigation.navigate('ScrollView')} />
      <ListTile title="Flat List" onPress={() => navigation.navigate('FlatList')} />
      <ListTile title="Section List" onPress={() => navigation.navigate('SectionList')} />
      <ListTile title="Complex Views" onPress={() => navigation.navigate('ComplexViews')} />
      <ListTile title="Gestures" onPress={() => navigation.navigate('Gestures')} />
      <ListTile title="Google Map" onPress={() => navigation.navigate('GoogleMapsScreen')} />
      <ListTile title="Large Image List" onPress={() => navigation.navigate('LargeImageList')} />
      <ListTile
        title="Back and forth"
        onPress={() => {
          navToBackAndForthScreen(navigation);
        }}
      />
    </Screen>
  );
};
