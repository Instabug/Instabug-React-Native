import React from 'react';
import { FlatList, RefreshControl } from 'react-native';
import { Skeleton } from 'native-base';

import { Screen } from '../components/Screen';
import { Section } from '../components/Section';
import { createList } from '../utils/createList';
import { useDelayedRefresh } from '../utils/useDelayedRefresh';

export const FlatListScreen: React.FC = () => {
  const { refreshing, onRefresh } = useDelayedRefresh();

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
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
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
