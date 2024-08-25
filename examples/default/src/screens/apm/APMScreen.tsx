import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { HomeStackParamList } from '../../navigation/HomeStack';
import React,{useState}  from 'react';
import { ListTile } from '../../components/ListTile';
import { Screen } from '../../components/Screen';
import { Text,Switch,Alert,ToastAndroid,Platform } from 'react-native';
import { APM } from 'instabug-reactnative';




export const APMScreen: React.FC<NativeStackScreenProps<HomeStackParamList, 'APM'>> = ({
  navigation,
}) => {

  const [isEnabled, setIsEnabled] = useState(false);

  const toggleSwitch = (value: boolean) => {
    setIsEnabled(value);

    // Update APM state here
    APM.setEnabled(value); 

    // Show Toast message

    if (Platform.OS === 'android') {
      ToastAndroid.show('Set APM enabled to ' + value, ToastAndroid.SHORT);
    } else {
      Alert.alert('Set APM enabled to ' + value);
    }
    
  };


  return (
    <Screen>
      <Text>Enable APM:</Text>
      <Switch
        onValueChange={toggleSwitch}
        value={isEnabled}
      />
       {/* <Text>Enable Cold Launch:</Text>
      <Switch
        onValueChange={toggleSwitch2}
        value={isEnabled2}
      /> */}
      <ListTile title="End App launch" onPress={() => APM.endAppLaunch()} />
      <ListTile title="Network Screen" onPress={() => navigation.navigate('NetworkTraces')} />
      <ListTile title="Traces" onPress={() => navigation.navigate('ExecutionTraces')} />
      <ListTile title="Flows" onPress={() => navigation.navigate('AppFlows')} />
    </Screen>
  );
};
