import React,{useState}  from 'react';

import { FeatureRequests,ActionType } from 'instabug-reactnative';

import { ListTile } from '../components/ListTile';
import { Text,Switch,Alert,ToastAndroid,Platform } from 'react-native';

import { Screen } from '../components/Screen';

export const FeatureRequestsScreen: React.FC = () => {
  const [isEnabled, setIsEnabled] = useState(false);


  const toggleSwitch = (value: boolean) => {
    setIsEnabled(value);

    // Update APM state here
    FeatureRequests.setEmailFieldRequired(value, [ActionType.requestNewFeature]);
    // Show Toast message

    if (Platform.OS === 'android') {
      ToastAndroid.show('Email field required set to ' + value, ToastAndroid.SHORT);
    } else {
      Alert.alert('Email field required set to ' + value);
    }
    
  };
  return (
    <Screen>
      <Text>Email field Required:</Text>
      <Switch
        onValueChange={toggleSwitch}
        value={isEnabled}
      />
      <ListTile title="Show" onPress={() => FeatureRequests.show()} />
    </Screen>
  );
};
