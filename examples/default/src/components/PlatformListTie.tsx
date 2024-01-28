import React, { PropsWithChildren } from 'react';

import { Box, HStack, Pressable, Text } from 'native-base';
import { Platform } from 'react-native';

interface PlatformListTileProps extends PropsWithChildren {
  title: string;
  onPress?: () => void;
  platform?: 'ios' | 'android';
}

export const PlatformListTile: React.FC<PlatformListTileProps> = ({
  title,
  onPress,
  platform,
  children,
}) => {
  if (Platform.OS === platform || !platform) {
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
  }
  return null;
};
