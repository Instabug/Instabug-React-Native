import React, { PropsWithChildren } from 'react';

import { Box, HStack, Pressable, Text } from 'native-base';

interface ListTileProps extends PropsWithChildren {
  title: string;
  onPress?: () => void;
}

export const ListTile: React.FC<ListTileProps> = ({ title, onPress, children }) => {
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
      <HStack justifyContent="space-between" alignItems="center">
        <Text>{title}</Text>
        <Box width={160}>{children}</Box>
      </HStack>
    </Pressable>
  );
};
