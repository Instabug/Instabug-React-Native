import React from 'react';

import { Screen } from '../components/Screen';
import { FlatList } from 'react-native';
import { Skeleton } from 'native-base';
import { createList } from '../utils/createList';
import { Section } from '../components/Section';

export const FlatListScreen: React.FC = () => {
  return (
    <Screen>
      <Section title="Horizontal">
        <FlatList
          horizontal
          data={createList(10)}
          keyExtractor={(item) => item.toString()}
          renderItem={() => (
            <Skeleton width={100} height={100} rounded="md" startColor="gray.300" marginRight="2" />
          )}
        />
      </Section>

      <Section title="Vertical" flex={1}>
        <FlatList
          data={createList(20)}
          keyExtractor={(item) => item.toString()}
          renderItem={() => (
            <Skeleton height={100} rounded="md" startColor="gray.300" marginBottom="2" />
          )}
        />
      </Section>
    </Screen>
  );
};
