import React from 'react';
import { Heading, VStack } from 'native-base';

interface SectionProps {
  title: string;
  children?: React.ReactNode;
}

export const Section: React.FC<SectionProps> = ({ title, children }) => {
  return (
    <VStack marginBottom="4">
      <Heading size="md" marginBottom="1.5">
        {title}
      </Heading>

      {children}
    </VStack>
  );
};
