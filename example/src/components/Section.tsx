import React, { PropsWithChildren } from 'react';

import { Heading, VStack } from 'native-base';

interface SectionProps extends PropsWithChildren {
  title: string;
}

export const Section: React.FC<SectionProps> = ({ title, children }) => {
  return (
    <VStack space="4">
      <Heading size="sm">{title}</Heading>
      {children}
    </VStack>
  );
};
