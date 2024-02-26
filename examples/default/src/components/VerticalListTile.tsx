import React, { PropsWithChildren } from 'react';

import { Box, Pressable, Text, VStack } from 'native-base';

interface ListTileProps extends PropsWithChildren {
  title: string;
  onPress?: () => void;
}

export const VerticalListTile: React.FC<ListTileProps> = ({ title, onPress, children }) => {
  return (
    <Pressable
      onPress={onPress}
      p="4"
      rounded="2"
      shadow="1"
      borderBottomWidth="1"
      borderColor="coolGray.300"
      bg="coolGray.100"
      _pressed={{ bg: 'coolGray.200' }}>
      <VStack justifyContent="stretch">
        <Text>{title}</Text>
        <Box>{children}</Box>
      </VStack>
    </Pressable>
  );
};
