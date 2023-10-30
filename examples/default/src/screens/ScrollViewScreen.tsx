import React from 'react';

import { Screen } from '../components/Screen';
import { RefreshControl, ScrollView } from 'react-native';
import { VStack, Skeleton, HStack } from 'native-base';
import { createList } from '../utils/createList';
import { Section } from '../components/Section';
import { useDelayedRefresh } from '../utils/useDelayedRefresh';

export const ScrollViewScreen: React.FC = () => {
  const { refreshing, onRefresh } = useDelayedRefresh();

  return (
    <Screen>
      <Section title="Horizontal">
        <ScrollView horizontal>
          <HStack space="xs">
            {createList(10).map((num) => (
              <Skeleton key={num} width={100} height={100} rounded="md" startColor="gray.300" />
            ))}
          </HStack>
        </ScrollView>
      </Section>

      <Section title="Vertical" flex={1}>
        <ScrollView
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
          <VStack space="xs">
            {createList(20).map((num) => (
              <Skeleton key={num} height={100} rounded="md" startColor="gray.300" />
            ))}
          </VStack>
        </ScrollView>
      </Section>
    </Screen>
  );
};
