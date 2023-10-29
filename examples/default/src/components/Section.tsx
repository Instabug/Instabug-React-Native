import React from 'react';
import { Heading, VStack } from 'native-base';

interface SectionProps {
  title: string;
  flex?: number;
  children?: React.ReactNode;
}

export const Section: React.FC<SectionProps> = ({ title, flex, children }) => {
  return (
    <VStack marginBottom="4" flex={flex}>
      <Heading size="md" marginBottom="1.5">
        {title}
      </Heading>

      {children}
    </VStack>
  );
};
