import React, { PropsWithChildren } from 'react';

import { VStack } from 'native-base';

export const Screen: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <VStack alignItems="stretch" padding="2" flex={1}>
      {children}
    </VStack>
  );
};
