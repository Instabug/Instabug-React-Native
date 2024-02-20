import React, { useState } from 'react';
import { APM } from 'instabug-reactnative';
import { ScrollView } from 'react-native';
import { Section } from '../../components/Section';
import { Screen } from '../../components/Screen';
import { VStack } from 'native-base';
import { InputField } from '../../components/InputField';
import { CustomButton } from '../../components/CustomButton';

export const FlowsScreen: React.FC = () => {
  const [flowName, setFlowName] = useState<string>('');
  const [flowAttributeKey, setFlowAttributeKey] = useState<string>('');
  const [flowAttributeValue, setFlowAttributeValue] = useState<string>('');

  async function startFlow() {
    return APM.startFlow(flowName);
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
