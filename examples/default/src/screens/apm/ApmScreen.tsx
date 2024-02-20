import React, { useState } from 'react';

import { ListTile } from '../../components/ListTile';
import { Screen } from '../../components/Screen';
import { Section } from '../../components/Section';
import { Heading, HStack, Spinner, VStack, useToast, ScrollView } from 'native-base';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { HomeStackParamList } from '../../navigation/HomeStack';
import type { NetworkLogProp } from './NetworkLogScreen';
import axios from 'axios';
import { ApolloClient, ApolloLink, from, gql, HttpLink, InMemoryCache } from '@apollo/client';
import { NetworkLogger } from 'instabug-reactnative';

export const ApmScreen: React.FC<NativeStackScreenProps<HomeStackParamList, 'Apm'>> = ({
  navigation,
}) => {
  const [ss, setLoading] = useState<Boolean>();

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
    <Screen>
      {ss ? (
        <HStack space={2} justifyContent="center">
          <Spinner accessibilityLabel="Loading posts" />
          <Heading color="primary.500" fontSize="md">
            Loading
          </Heading>
        </HStack>
      ) : (
        <ScrollView>
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
                  const client = new ApolloClient({
                    uri: 'https://rickandmortyapi-faulty.com/graphql',
                    cache: new InMemoryCache(),
                    link: from([IBGApolloLink]),
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
                  const client = new ApolloClient({
                    uri: 'https://rickandmortyapi.com/graphql',
                    cache: new InMemoryCache(),
                    link: from([IBGApolloLink]),
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
        </ScrollView>
      )}
    </Screen>
  );
};
