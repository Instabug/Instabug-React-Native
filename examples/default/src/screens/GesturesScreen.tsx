import React from 'react';

import { Swipeable } from 'react-native-gesture-handler';
import { Box, Center, Text } from 'native-base';

import { Screen } from '../components/Screen';
import { Section } from '../components/Section';

export const GesturesScreen: React.FC = () => {
  return (
    <Screen>
      <Section title="Swipe">
        <Swipeable
          renderLeftActions={() => <Box bg="red.600" height={100} width={100} />}
          renderRightActions={() => <Box bg="green.600" height={100} width={100} />}>
          <Center bg="primary.600" height={100}>
            <Text color="white" fontSize="md">
              Swipe Me
            </Text>
          </Center>
        </Swipeable>
      </Section>
    </Screen>
  );
};
