import React from 'react';
import {
  Center,
  Heading,
  HStack,
  ScrollView,
  Image,
  Text,
  VStack,
  Button,
  Stack,
  Box,
  AspectRatio,
} from 'native-base';

import { Screen } from '../../components/Screen';
import type { HomeStackParamList } from '../../navigation/HomeStack';
import type {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';

export interface BackAndForthScreenProp {
  image: string;
  price: string;
  name: string | null;
  description: string | null;
}
export const navToBackAndForthScreen = (navigation: NativeStackNavigationProp<any>) => {
  navigation.push('BackAndForthScreen', {
    image: `https://picsum.photos/${Math.floor(Math.random() * 200) + 300}/${
      Math.floor(Math.random() * 200) + 600
    }`,
    price: (Math.floor(Math.random() * 10000) + 1000).toString(),
    name: 'Product ' + (Math.floor(Math.random() * 12) + 1).toString(),
    description: Array.from(
      { length: Math.floor(Math.random() * 5) + 2 },
      () => "Bengaluru (also called Bangalore) is the center of India's high-tech industry.",
    ).join(' '),
  });
};

export const BackAndForthScreen: React.FC<
  NativeStackScreenProps<HomeStackParamList, 'BackAndForthScreen'>
> = ({ navigation, route }) => {
  return (
    <Screen>
      <ScrollView>
        <VStack space={'lg'}>
          <Box alignItems="center">
            <Box
              rounded="lg"
              borderColor="coolGray.200"
              borderWidth="1"
              _dark={{
                borderColor: 'coolGray.600',
                backgroundColor: 'gray.700',
              }}
              _web={{
                shadow: 2,
                borderWidth: 0,
              }}
              _light={{
                backgroundColor: 'gray.50',
              }}>
              <Box>
                <AspectRatio w="100%" ratio={16 / 9}>
                  <Image
                    source={{
                      uri: route.params.image,
                    }}
                    alt="image"
                  />
                </AspectRatio>
                <Center
                  bg="violet.500"
                  _dark={{
                    bg: 'violet.400',
                  }}
                  _text={{
                    color: 'warmGray.50',
                    fontWeight: '700',
                    fontSize: 'xs',
                  }}
                  position="absolute"
                  bottom="0"
                  px="3"
                  py="1.5">
                  PHOTOS
                </Center>
              </Box>
              <Stack p="4" space={3}>
                <Stack space={2}>
                  <Heading size="md" ml="-1">
                    {route.params.name}
                  </Heading>
                  <Text
                    fontSize="xs"
                    _light={{
                      color: 'violet.500',
                    }}
                    _dark={{
                      color: 'violet.400',
                    }}
                    fontWeight="500"
                    ml="-0.5"
                    mt="-1">
                    {route.params.price}
                  </Text>
                </Stack>
                <Text fontWeight="400">{route.params.description}</Text>
                <HStack alignItems="center" space={4} justifyContent="space-between">
                  <HStack alignItems="center">
                    <Text
                      color="coolGray.600"
                      _dark={{
                        color: 'warmGray.200',
                      }}
                      fontWeight="400">
                      6 mins ago
                    </Text>
                  </HStack>
                </HStack>
              </Stack>
            </Box>
          </Box>
          <Button key={'lg'} size={'lg'} onPress={() => navToBackAndForthScreen(navigation)}>
            Next Product
          </Button>
        </VStack>
      </ScrollView>
    </Screen>
  );
};
