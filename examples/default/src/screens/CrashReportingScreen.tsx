import React, { useState } from 'react';
import { Platform, ScrollView } from 'react-native';

import { CrashReporting } from 'instabug-reactnative';

import { ListTile } from '../components/ListTile';
import { Screen } from '../components/Screen';
import { Divider } from 'native-base';

import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { HomeStackParamList } from '../navigation/HomeStack';

export const CrashReportingScreen: React.FC<
  NativeStackScreenProps<HomeStackParamList, 'CrashReporting'>
> = ({ navigation }) => {
  const [isEnabled, setIsEnabled] = useState(true);
  const [isNDKEnabled, setIsNDKEnabled] = useState(true);

  return (
    <ScrollView>
      <Screen>
        <ListTile
          title="Crash Reporting State"
          subtitle={isEnabled ? 'Enabled' : 'Disabled'}
          onPress={() => {
            navigation.navigate('CrashReportingState', {
              isEnabled,
              setIsEnabled: (enabled: boolean) => {
                setIsEnabled(enabled);
                CrashReporting.setEnabled(enabled);
                navigation.goBack();
              },
            });
          }}
          testID="id_cr_state"
        />

        {Platform.OS === 'android' && (
          <ListTile
            title="NDK Crashes State"
            subtitle={isNDKEnabled ? 'Enabled' : 'Disabled'}
            onPress={() => {
              navigation.navigate('NDKCrashesState', {
                isEnabled: isNDKEnabled,
                setIsEnabled: (enabled: boolean) => {
                  setIsNDKEnabled(enabled);
                  CrashReporting.setNDKCrashesEnabled(enabled);
                  navigation.goBack();
                },
              });
            }}
            testID="id_ndk_cr_state"
          />
        )}

        <Divider my={5} />

        <ListTile
          title="Non-Fatal Crashes"
          onPress={() => navigation.navigate('NonFatalCrashes')}
          testID="id_non_fatal_crashes"
        />

        <ListTile
          title="Fatal Crashes"
          onPress={() => navigation.navigate('FatalCrashes')}
          testID="id_fatal_crashes"
        />
      </Screen>
    </ScrollView>
  );
};
