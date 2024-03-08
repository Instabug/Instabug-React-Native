import React from 'react';

import { Container, Heading, HStack, ScrollView, Text, VStack } from 'native-base';
import { Screen } from '../../components/Screen';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { HomeStackParamList } from '../../navigation/HomeStack';

export interface NetworkLogProp {
  requestEndPoint: string;
  requestMethod: string;
  requestHeaders: string | null;
  responseHeaders: string | null;
  requestBody: string | null;
  responseBody: string | null;
  responseCode: number;
  errorMessage: string | null;
}

export const NetworkLogScreen: React.FC<
  NativeStackScreenProps<HomeStackParamList, 'networkLog'>
> = ({ route }) => {
  return (
    <Screen>
      <ScrollView>
        <VStack space={4} alignItems="stretch">
          <HStack>
            <Heading size="sm" textAlign="left">
              EndPoint:{' '}
            </Heading>
            <Text fontSize="sm">{route.params.requestEndPoint ?? ''}</Text>
          </HStack>

          <HStack>
            <Heading size="sm" textAlign="right">
              Request method:{' '}
            </Heading>
            <Text fontSize="sm">{route.params.requestMethod ?? ''}</Text>
          </HStack>

          <HStack>
            <Heading size="sm" textAlign="right">
              Response code:{' '}
            </Heading>
            <Text fontSize="sm">{route.params.responseCode ?? ''}</Text>
          </HStack>

          <HStack>
            <Heading size="sm" textAlign="left">
              Request Body:{' '}
            </Heading>
            <Container>
              <Text textAlign="left" fontSize="sm">
                {JSON.stringify(route.params.requestBody) ?? ''}
              </Text>
            </Container>
          </HStack>

          <HStack>
            <Heading size="sm" textAlign="left">
              Request Headers:{' '}
            </Heading>
            <Text fontSize="sm">{route.params.requestHeaders ?? ''}</Text>
          </HStack>

          <HStack>
            <Heading size="sm" textAlign="left">
              Response Body:{' '}
            </Heading>
            <Container>
              <Text fontSize="sm">{JSON.stringify(route.params.responseBody) ?? ''}</Text>
            </Container>
          </HStack>

          <HStack>
            <Heading size="sm" textAlign="left">
              Response Headers:{' '}
            </Heading>
            <Text fontSize="sm">{route.params.responseHeaders ?? ''}</Text>
          </HStack>

          <HStack>
            <Heading size="sm" textAlign="left">
              Response Error:{' '}
            </Heading>
            <Text fontSize="sm">{route.params.errorMessage ?? ''}</Text>
          </HStack>
        </VStack>
      </ScrollView>
    </Screen>
  );
};
