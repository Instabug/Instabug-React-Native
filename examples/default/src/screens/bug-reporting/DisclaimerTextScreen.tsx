import React, { useState } from 'react';

import { Screen } from '../../components/Screen';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { HomeStackParamList } from '../../navigation/HomeStack';
import { BugReporting } from 'instabug-reactnative';
import { Input, Button, VStack } from 'native-base';

export interface DisclaimerTextScreenProp {
  initialText: string;
  setText: (text: string) => void;
}

export const DisclaimerTextScreen: React.FC<
  NativeStackScreenProps<HomeStackParamList, 'DisclaimerText'>
> = ({ navigation, route }) => {
  const { initialText, setText } = route.params;
  const [localText, setLocalText] = useState(initialText);

  const handleSave = () => {
    setText(localText);
    BugReporting.setDisclaimerText(localText);
    navigation.goBack();
  };

  return (
    <Screen>
      <VStack space={4} p={4}>
        <Input
          placeholder="Enter disclaimer text"
          onChangeText={setLocalText}
          value={localText}
          testID="id_disclaimer_input"
          multiline={true}
        />
        <Button onPress={handleSave} testID="id_disclaimer_save">
          Save
        </Button>
        <Button colorScheme="danger" onPress={() => setLocalText('')} testID="id_disclaimer_clear">
          Clear
        </Button>
      </VStack>
    </Screen>
  );
};
