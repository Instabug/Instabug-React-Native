import React from 'react';
import { RefreshControl, SectionList } from 'react-native';
import { Heading, Skeleton } from 'native-base';

import { Screen } from '../../components/Screen';
import { createList } from '../../utils/createList';
import { useDelayedRefresh } from '../../utils/useDelayedRefresh';

const sections = [
  {
    title: 'Section A',
    data: createList(10),
  },
  {
    title: 'Section B',
    data: createList(10),
  },
];

export const SectionListScreen: React.FC = () => {
  const { refreshing, onRefresh } = useDelayedRefresh();

  return (
    <Screen>
      <SectionList
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        sections={sections}
        keyExtractor={(item) => item.toString()}
        renderSectionHeader={(info) => (
          <Heading size="md" marginBottom="1.5">
            {info.section.title}
          </Heading>
        )}
        renderItem={() => (
          <Skeleton height={100} rounded="md" startColor="gray.300" marginBottom="2" />
        )}
      />
    </Screen>
  );
};
