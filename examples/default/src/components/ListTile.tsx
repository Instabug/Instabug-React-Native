import React, { PropsWithChildren } from 'react';

import { Box, HStack, Pressable, Text, VStack } from 'native-base';

interface ListTileProps extends PropsWithChildren {
  title: string;
  subtitle?: string;
  onPress?: () => void;
  testID?: string;
  truncateSubtitle?: boolean;
  accessibilityLabel?: string;
}

export const ListTile: React.FC<ListTileProps> = ({
  title,
  subtitle,
  onPress,
  children,
  testID,
  truncateSubtitle = false,
  accessibilityLabel,
}) => {
  return (
    <Pressable
      onPress={onPress}
      p="4"
      rounded="2"
      testID={testID}
      accessibilityLabel={accessibilityLabel ?? testID}
      shadow="1"
      accessible={true}
      borderBottomWidth="1"
      borderColor="coolGray.300"
      bg="coolGray.100"
      _pressed={{ bg: 'coolGray.200' }}>
      <HStack justifyContent="space-between" alignItems="center">
        <VStack space={2}>
          <Text>{title}</Text>
          {subtitle && (
            <Text
              fontSize="xs"
              color="coolGray.500"
              numberOfLines={truncateSubtitle ? 1 : undefined}
              ellipsizeMode={truncateSubtitle ? 'tail' : undefined}>
              {subtitle}
            </Text>
          )}
        </VStack>
        <Box width={160}>{children}</Box>
      </HStack>
    </Pressable>
  );
};
