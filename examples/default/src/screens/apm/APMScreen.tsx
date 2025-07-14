import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { HomeStackParamList } from '../../navigation/HomeStack';
import React, { useState } from 'react';
import { ListTile } from '../../components/ListTile';
import { Screen } from '../../components/Screen';
import { StyleSheet, Switch, Text, View } from 'react-native';
import { APM } from 'instabug-reactnative';
import { showNotification } from '../../utils/showNotification';
import CustomGap from '../../components/CustomGap';

export const APMScreen: React.FC<NativeStackScreenProps<HomeStackParamList, 'APM'>> = ({
  navigation,
}) => {
  const [isEnabled, setIsEnabled] = useState(false);

  const toggleSwitch = (value: boolean) => {
    setIsEnabled(value);
    APM.setEnabled(value);
    showNotification('APM status', 'APM enabled set to ' + value);
  };
  const styles = StyleSheet.create({
    switch: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
  });

  return (
    <Screen>
      <View style={styles.switch}>
        <Text>Enable APM:</Text>
        <Switch onValueChange={toggleSwitch} value={isEnabled} />
      </View>
      {CustomGap.smallV}
      <ListTile title="End App launch" onPress={() => APM.endAppLaunch()} />
      <ListTile title="Network Screen" onPress={() => navigation.navigate('NetworkTraces')} />
      <ListTile title="Flows" onPress={() => navigation.navigate('AppFlows')} />
      <ListTile title="WebViews" onPress={() => navigation.navigate('WebViews')} />
      <ListTile title="Complex Views" onPress={() => navigation.navigate('ComplexViews')} />
        
      <ListTile
        title="Simulate Slow Frames"
        onPress={() => {
          // Simulate slow rendering
          const heavyComputation = () => {
            for (let i = 0; i < 1000000; i++) {
              Math.random() * Math.random();
            }
          };
          heavyComputation();
          showNotification('Slow Frames', 'Heavy computation executed to simulate slow frames');
        }}
      />
      <ListTile
        title="Simulate Frozen Frames"
        onPress={() => {
          const freezeDuration = 3000; // 3 seconds
          const start = Date.now();
          while (Date.now() - start < freezeDuration) {
            // Busy wait to block JS thread
          }
          showNotification('Frozen Frames', `UI frozen for ${freezeDuration / 1000} seconds`);
        }}
      />
    </Screen>
  );
};
