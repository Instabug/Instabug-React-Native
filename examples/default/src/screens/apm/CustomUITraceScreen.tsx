import React, { useState } from 'react';
import { APM } from 'instabug-reactnative';
import { ScrollView } from 'react-native';
import { Section } from '../../components/Section';
import { Screen } from '../../components/Screen';
import { VStack } from 'native-base';
import { InputField } from '../../components/InputField';
import { CustomButton } from '../../components/CustomButton';
import BackgroundTimer from 'react-native-background-timer';

export const CustomUITraceScreen: React.FC = () => {
  const [traceName, setTraceName] = useState<string>('');

  function startUITrace() {
    if (!traceName.trim()) {
      console.log('Please enter a trace name before starting.');
      return;
    }
    APM.startUITrace(traceName);

    console.log(`UI trace "${traceName}" started.`);
  }

  function startDelayedUITrace() {
    if (!traceName.trim()) {
      console.log('Please enter a trace name before starting.');
      return;
    }
    return BackgroundTimer.setTimeout(() => {
      APM.startUITrace(traceName);
      console.log(`Delayed UI trace "${traceName}" started.`);
    }, 5000);
  }

  function endUITrace() {
    APM.endUITrace();
    console.log('UI trace ended.');
  }

  return (
    <ScrollView>
      <Screen>
        <Section title="Custom UI Traces">
          <VStack space={2}>
            <InputField
              placeholder="UI Trace Name"
              onChangeText={(text) => setTraceName(text)}
              value={traceName}
            />
            <CustomButton title="Start UI Trace" onPress={startUITrace} />
            <CustomButton title="Start 5s Delayed UI Trace" onPress={startDelayedUITrace} />
            <CustomButton title="End UI Trace" onPress={endUITrace} />
          </VStack>
        </Section>
      </Screen>
    </ScrollView>
  );
};
