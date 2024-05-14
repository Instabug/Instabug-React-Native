import React, { useState } from 'react';
import { APM } from '@instabug/instabug-reactnative-dream11';
import { ScrollView } from 'react-native';
import { Section } from '../../components/Section';
import { Screen } from '../../components/Screen';
import { VStack } from 'native-base';
import { InputField } from '../../components/InputField';
import { CustomButton } from '../../components/CustomButton';
import BackgroundTimer from 'react-native-background-timer';

export const FlowsScreen: React.FC = () => {
  const [flowName, setFlowName] = useState<string>('');
  const [flowAttributeKey, setFlowAttributeKey] = useState<string>('');
  const [flowAttributeValue, setFlowAttributeValue] = useState<string>('');

  async function startFlow() {
    return APM.startFlow(flowName);
  }

  async function startDelayedFlow() {
    return BackgroundTimer.setTimeout(() => {
      APM.startFlow(flowName);
    }, 5000);
  }

  function setFlowAttribute() {
    return APM.setFlowAttribute(flowName, flowAttributeKey, flowAttributeValue);
  }

  function endFlow() {
    APM.endFlow(flowName);
  }

  return (
    <ScrollView>
      <Screen>
        <Section title="App Flows">
          <VStack space="xs">
            <InputField
              placeholder="Flow Name"
              onChangeText={(text) => setFlowName(text)}
              value={flowName}
            />
            <CustomButton title="Start Flow" onPress={startFlow} />
            <CustomButton title="Start 5s Delayed Flow" onPress={startDelayedFlow} />
            <InputField
              placeholder="Flows Attribute Key"
              onChangeText={(text) => setFlowAttributeKey(text)}
              value={flowAttributeKey}
            />
            <InputField
              placeholder="Flow Attribute Value"
              onChangeText={(text) => setFlowAttributeValue(text)}
              value={flowAttributeValue}
            />
            <CustomButton title="Set Flow Attribute" onPress={setFlowAttribute} />
            <CustomButton title="End Flow" onPress={endFlow} />
          </VStack>
        </Section>
      </Screen>
    </ScrollView>
  );
};
