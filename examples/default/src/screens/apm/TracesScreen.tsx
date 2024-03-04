import React, { useState } from 'react';
import { APM, Trace } from 'instabug-reactnative';
import { ScrollView } from 'react-native';
import { Section } from '../../components/Section';
import { Screen } from '../../components/Screen';
import { VStack } from 'native-base';
import { InputField } from '../../components/InputField';
import { CustomButton } from '../../components/CustomButton';
import BackgroundTimer from 'react-native-background-timer';

export const TracesScreen: React.FC = () => {
  const [traceName, setTraceName] = useState<string>('');
  const [traceAttributeKey, setTraceAttributeKey] = useState<string>('');
  const [traceAttributeValue, setTraceAttributeValue] = useState<string>('');
  let executionTrace: Trace;

  async function startTrace() {
    executionTrace = await APM.startExecutionTrace(traceName ?? '');
  }

  async function startDelayedTrace() {
    return BackgroundTimer.setTimeout(async () => {
      executionTrace = await APM.startExecutionTrace(traceName ?? '');
    }, 5000);
  }

  function setTraceAttribute() {
    if (!executionTrace) {
      console.log('Please, start a trace before setting attributes.');
    }
    return executionTrace.setAttribute(traceAttributeKey ?? '', traceAttributeValue ?? '');
  }

  function endExecutionTrace() {
    if (!executionTrace) {
      console.log('Please, start a trace before ending it.');
    }
    return executionTrace.end();
  }

  return (
    <ScrollView>
      <Screen>
        <Section title="Execution Traces">
          <VStack space={2}>
            <InputField
              placeholder="Trace Name"
              onChangeText={(text) => setTraceName(text)}
              value={traceName}
            />
            <CustomButton title="Start Trace" onPress={startTrace} />
            <CustomButton title="Start 5s Delayed Trace" onPress={startDelayedTrace} />
            <InputField
              placeholder="Trace Key Attribute"
              onChangeText={(text) => setTraceAttributeKey(text)}
              value={traceAttributeKey}
            />
            <InputField
              placeholder="Trace Value Attribute"
              onChangeText={(text) => setTraceAttributeValue(text)}
              value={traceAttributeValue}
            />
            <CustomButton title="Set Trace Attributes" onPress={setTraceAttribute} />
            <CustomButton title="End Trace" onPress={endExecutionTrace} />
          </VStack>
        </Section>
      </Screen>
    </ScrollView>
  );
};
