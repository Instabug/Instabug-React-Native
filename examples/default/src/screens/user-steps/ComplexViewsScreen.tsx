import React, { useRef, useState } from 'react';

import { Screen } from '../../components/Screen';
import { Section } from '../../components/Section';
import { NestedView } from '../../components/NestedView';
import { Button } from 'react-native';
import { ScrollView, VStack } from 'native-base';
import { InputField } from '../../components/InputField';

export const ComplexViewsScreen: React.FC = () => {
  const initialDepth = 10;
  const initialBreadth = 2;

  const depthRef = useRef(initialDepth);
  const breadthRef = useRef(initialBreadth);

  const [depth, setDepth] = useState(initialDepth);
  const [breadth, setBreadth] = useState(initialBreadth);

  function handleRender() {
    setDepth(depthRef.current);
    setBreadth(breadthRef.current);
  }

  return (
    <Screen>
      <ScrollView>
        <Section title="Complex View">
          <VStack space="xs">
            <InputField
              placeholder={`Depth (default: ${initialDepth})`}
              keyboardType="numeric"
              onChangeText={(text) => (depthRef.current = +text)}
            />
            <InputField
              placeholder={`Breadth (default: ${initialBreadth})`}
              keyboardType="numeric"
              onChangeText={(text) => (breadthRef.current = +text)}
            />
            <Button title="Render" onPress={handleRender} />
            <NestedView depth={depth} breadth={breadth} />
          </VStack>
        </Section>
      </ScrollView>
    </Screen>
  );
};
