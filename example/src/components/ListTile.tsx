import React, { PropsWithChildren } from 'react';

import { Box, HStack, Pressable, Text } from 'native-base';

interface ListTileProps extends PropsWithChildren {
  title: string;
  onPress?: () => void;
}

export const ListTile: React.FC<ListTileProps> = ({ title, onPress, children }) => {
  return (
    <Pressable onPress={onPress}>
      {({ isHovered, isPressed }) => {
        return (
          <Box
            p="4"
            rounded="2"
            shadow="1"
            borderBottomWidth="1"
            borderColor="coolGray.300"
            bg={isPressed ? 'coolGray.200' : isHovered ? 'coolGray.200' : 'coolGray.100'}>
            <HStack justifyContent="space-between" alignItems="center">
              <Text>{title}</Text>
              <Box width={160}>{children}</Box>
            </HStack>
          </Box>
        );
      }}
    </Pressable>
  );
};
