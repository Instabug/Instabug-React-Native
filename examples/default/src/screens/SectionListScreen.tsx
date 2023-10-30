import React from 'react';
import { SectionList } from 'react-native';
import { Heading, Skeleton } from 'native-base';

import DelayedRefreshControl from '../components/DelayedRefreshControl';
import { Screen } from '../components/Screen';
import { createList } from '../utils/createList';

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
  return (
    <Screen>
      <SectionList
        refreshControl={<DelayedRefreshControl />}
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
