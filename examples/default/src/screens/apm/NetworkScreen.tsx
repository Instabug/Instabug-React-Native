import React, { useState } from 'react';
import { Image, ScrollView, StyleSheet, Text, useWindowDimensions, View } from 'react-native';
import { Section } from '../../components/Section';
import { Screen } from '../../components/Screen';
import { ClipboardTextInput } from '../../components/ClipboardTextInput';
import { Heading, HStack, Spinner, useToast, VStack } from 'native-base';
import { gql, request } from 'graphql-request';
import { CustomButton } from '../../components/CustomButton';
import { ListTile } from '../../components/ListTile';
import axios from 'axios';
import { ApolloClient, ApolloLink, from, HttpLink, InMemoryCache, useQuery } from '@apollo/client';
import type { NetworkLogProp } from './NetworkLogScreen';
import { NetworkLogger } from 'instabug-reactnative';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { HomeStackParamList } from '../../navigation/HomeStack';

export const NetworkScreen: React.FC<
  NativeStackScreenProps<HomeStackParamList, 'NetworkTraces'>
> = ({ navigation }) => {
  const [endpointUrl, setEndpointUrl] = useState('');
  const { width, height } = useWindowDimensions();
  const defaultRequestUrl = 'https://jsonplaceholder.typicode.com/posts/1';
  const imageUrls = [
    'https://fastly.picsum.photos/id/57/200/300.jpg?hmac=l908G1qVr4r7dP947-tak2mY8Vvic_vEYzCXUCKKskY',
    'https://fastly.picsum.photos/id/619/200/300.jpg?hmac=WqBGwlGjuY9RCdpzRaG9G-rc9Fi7TGUINX_-klAL2kA',
  ];

  async function sendRequestToUrl() {
    let urlToSend = '';

    if (endpointUrl.trim() !== '') {
      urlToSend = endpointUrl;
      console.log('Sending request to: ', endpointUrl);
    } else {
      // Use json placeholder URL as a default if endpointUrl is empty
      console.log('sending request to default json placeholder');
      urlToSend = defaultRequestUrl;
    }

    try {
      // Perform the request using the urlToSend
      const response = await fetch(urlToSend);
      const data = await response.json();

      // Format the JSON response for better logging
      const formattedData = JSON.stringify(data, null, 2);

      // Log the formatted response
      console.log('Response:', formattedData);
    } catch (error) {
      // Handle errors appropriately
      console.error('Error:', error);
    }
  }

  const fetchGraphQlData = async () => {
    const document = gql`
      query {
        country(code: "EG") {
          emoji
          name
        }
      }
    `;

    return request<{ country: { emoji: string; name: string } }>(
      'https://countries.trevorblades.com/graphql',
      document,
    );
  };

  const { data, isError, isSuccess, isLoading, refetch } = useQuery('helloQuery', fetchGraphQlData);
  const [ss, setLoading] = useState<Boolean>();
  function makeHttpRequest(url: string, method: string, request: any, headers: any) {
    setLoading(true);
    axios
      .request({
        url: url,
        method: method,
        data: request,
        headers: headers,
      })
      .then(function (response) {
        onRequestSuccess(response, request, headers, method);
      })
      .catch(function (error) {
        onRequestField(error, request, headers, method);
      });
  }

  function onRequestSuccess(response: any, request: any, headers: any, method: string) {
    setLoading(false);
    const modal: NetworkLogProp = {
      errorMessage: '',
      responseBody: response.data,
      responseCode: response.status,
      responseHeaders: response.request.getAllResponseHeaders(),
      requestBody: JSON.stringify(request),
      requestEndPoint: response.request.responseURL,
      requestHeaders: JSON.stringify(headers),
      requestMethod: method,
    };
    navigation.push('networkLog', modal);
  }

  function onRequestField(error: any, request: any, headers: any, method: string) {
    setLoading(false);

    if (error.response) {
      const modal: NetworkLogProp = {
        errorMessage: error.message,
        responseBody: error.response.data,
        responseCode: error.response.status,
        responseHeaders: error.response.request.getAllResponseHeaders(),
        requestBody: JSON.stringify(request),
        requestEndPoint: error.response.request.responseURL,
        requestHeaders: JSON.stringify(headers),
        requestMethod: method,
      };
      navigation.push('networkLog', modal);
    } else if (error.request) {
      const modal: NetworkLogProp = {
        errorMessage: error.message,
        responseBody: '',
        responseCode: error.request.status,
        responseHeaders: error.request.getAllResponseHeaders(),
        requestBody: JSON.stringify(request),
        requestEndPoint: error.request.responseURL,
        requestHeaders: JSON.stringify(headers),
        requestMethod: method,
      };
      navigation.push('networkLog', modal);
    } else {
      console.log('Error', error.message);
    }
  }

  const toast = useToast();
  const GET_LOCATIONS_QUERY = gql`
    query GetLocations($locationId: ID!) {
      location(id: $locationId) {
        id
        name
        type
        dimension
        created
      }
    }
  `;
  const IBGApolloLink = new ApolloLink(NetworkLogger.apolloLinkRequestHandler);

  return (
    <ScrollView>
      <Screen>
        <Section title="Network Requests">
          <VStack space="xs">
            <ClipboardTextInput
              placeholder="Endpoint Url"
              onChangeText={(text) => setEndpointUrl(text)}
              selectTextOnFocus={true}
              value={endpointUrl}
            />
            <CustomButton onPress={sendRequestToUrl} title="Send Request To Url" />
            <CustomButton onPress={() => refetch} title="Reload GraphQL" />
            <View>
              {isLoading && <Text>Loading...</Text>}
              {isSuccess && <Text>GraphQL Data: {data.country.emoji}</Text>}
              {isError && <Text>Error!</Text>}
            </View>
          </VStack>
        </Section>
        <Section title="Images">
          <HStack marginTop="5" space="xs">
            {imageUrls.map((imageUrl) => (
              <Image
                key={imageUrl}
                source={{
                  uri: imageUrl,
                }}
                style={[styles.image, { width: width * 0.45, height: height * 0.3 }]}
              />
            ))}
          </HStack>
        </Section>
      </Screen>
      {ss ? (
        <HStack space={2} justifyContent="center">
          <Spinner accessibilityLabel="Loading posts" />
          <Heading color="primary.500" fontSize="md">
            Loading
          </Heading>
        </HStack>
      ) : (
        <VStack>
          <Section title={'Http Request'}>
            <ListTile
              title="GET"
              onPress={() => {
                makeHttpRequest('https://httpbin.org/anything', 'GET', null, null);
              }}
            />
            <ListTile
              title="POST"
              onPress={() => {
                makeHttpRequest(
                  'https://httpbin.org/post',
                  'POST',
                  {
                    username: 'Instabug',
                    password: 'Password',
                  },
                  null,
                );
              }}
            />
            <ListTile
              title="PUT"
              onPress={() => {
                makeHttpRequest('https://httpbin.org/put', 'PUT', null, null);
              }}
            />
            <ListTile
              title="PATCH"
              onPress={() => {
                makeHttpRequest('https://httpbin.org/patch', 'PATCH', null, null);
              }}
            />
            <ListTile
              title="DELETE"
              onPress={() => {
                makeHttpRequest('https://httpbin.org/delete', 'DELETE', null, null);
              }}
            />
            <ListTile
              title="DOWNLOAD IMAGE"
              onPress={() => {
                makeHttpRequest('https://speed.hetzner.de/100MB.bin', 'GET', null, null);
              }}
            />
            <ListTile
              title="Upload IMAGE response"
              onPress={async () => {
                setLoading(true);
                const form = new FormData();
                const base64ofImg =
                  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAIAQMAAAD+wSzIAAAABlBMVEX///+/v7+jQ3Y5AAAADklEQVQI12P4AIX8EAgALgAD/aNpbtEAAAAASUVORK5CYII';
                form.append('picture', Buffer.from(base64ofImg, 'base64').toString('utf8'));
                axios
                  .request({
                    url: 'https://httpbin.org/post',
                    method: 'POST',
                    data: form,
                  })
                  .then(function (response) {
                    onRequestSuccess(response, form, null, 'POST');
                  })
                  .catch(function (error) {
                    onRequestField(error, form, null, 'POST');
                  });
              }}
            />
            <ListTile
              title="Request 404"
              onPress={() => {
                makeHttpRequest('https://httpbin.org/getxyz', 'GET', null, null);
              }}
            />
            <ListTile
              title="GZIP response"
              onPress={() => {
                makeHttpRequest(
                  'https://www.googleapis.com/books/v1/volumes?q=flowers',
                  'GET',
                  null,
                  {
                    'Accept-Encoding': 'gzip',
                  },
                );
              }}
            />
          </Section>
          <Section title={'GraphQL Requests'}>
            <ListTile
              title="Successfull request"
              onPress={() => {
                const httpLink = new HttpLink({ uri: 'https://rickandmortyapi.com/graphql' });

                const client = new ApolloClient({
                  cache: new InMemoryCache(),
                  link: from([IBGApolloLink, httpLink]),
                });

                const result = client.query({
                  query: GET_LOCATIONS_QUERY,
                  variables: { locationId: '1' },
                });
                result
                  .then(function () {
                    toast.show({
                      description: 'Succeeded',
                    });
                  })
                  .catch(function () {
                    toast.show({
                      description: 'Failed',
                    });
                  });
              }}
            />
            <ListTile
              title="Client side Failed request"
              onPress={() => {
                const httpLink = new HttpLink({
                  uri: 'https://rickandmortyapi-faulty.com/graphql',
                });

                const client = new ApolloClient({
                  cache: new InMemoryCache(),
                  link: from([IBGApolloLink, httpLink]),
                });

                const result = client.query({
                  query: GET_LOCATIONS_QUERY,
                  variables: { locationId: '1' },
                });
                result
                  .then(function () {
                    toast.show({
                      description: 'Succeeded',
                    });
                  })
                  .catch(function () {
                    toast.show({
                      description: 'Failed',
                    });
                  });
              }}
            />

            <ListTile
              title="Server side Failed request"
              onPress={() => {
                const httpLink = new HttpLink({ uri: 'https://rickandmortyapi.com/graphql' });

                const client = new ApolloClient({
                  cache: new InMemoryCache(),
                  link: from([IBGApolloLink, httpLink]),
                });

                const result = client.query({
                  query: GET_LOCATIONS_QUERY,
                  variables: { locationId: 'M' },
                });
                result
                  .then(function () {
                    toast.show({
                      description: 'Succeeded',
                    });
                  })
                  .catch(function () {
                    toast.show({
                      description: 'Failed',
                    });
                  });
              }}
            />
          </Section>
        </VStack>
      )}
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  image: {
    resizeMode: 'contain',
  },
  // Todo: Text Component
  // Todo: Button Component
  // Todo: Image Component
});
