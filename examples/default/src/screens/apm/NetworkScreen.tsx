import React, { useState } from 'react';
import { Image, ScrollView, StyleSheet, Text, useWindowDimensions, View } from 'react-native';
import { Section } from '../../components/Section';
import { Screen } from '../../components/Screen';
import { ClipboardTextInput } from '../../components/ClipboardTextInput';
import { HStack, VStack } from 'native-base';
import { CustomButton } from '../../components/CustomButton';
import { gql, useQuery } from '@apollo/client';
// import { useQuery } from 'react-query';
// import { gql, request } from 'graphql-request';
// import { NativeInstabug } from '../../../../../src/native/NativeInstabug';

export const NetworkScreen: React.FC = () => {
  const [endpointUrl, setEndpointUrl] = useState('');
  const { width, height } = useWindowDimensions();
  const defaultRequestUrl = 'https://jsonplaceholder.typicode.com/posts/1';
  const defaultRequestBaseUrl = 'https://jsonplaceholder.typicode.com/posts/';
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

  function generateUrls(count: number = 10) {
    const urls = [];
    for (let i = 1; i <= count; i++) {
      urls.push(defaultRequestBaseUrl + i);
    }
    return urls;
  }

  async function makeSequentialApiCalls(urls: string[]): Promise<any[]> {
    // const fetchPromises = urls.map((url) => fetch(url).then((response) => response.json()));
    const results: any[] = [];

    try {
      for (let i = 0; i < urls.length; i++) {
        await fetch(urls[i]);
        results.push(results[i]);
      }
      return results;
    } catch (error) {
      console.error('Error making parallel API calls:', error);
      throw error;
    }
  }
  async function makeParallelApiCalls(urls: string[]): Promise<any[]> {
    const fetchPromises = urls.map((url) => fetch(url).then((response) => response.json()));

    try {
      const results = await Promise.all(fetchPromises);
      // console.log(results);
      return results;
    } catch (error) {
      console.error('Error making parallel API calls:', error);
      throw error;
    }
  }

  // function changeObfuscation() {
  //   NativeInstabug.setRequestObfuscationHandlerIOS('newAndrew');
  // }

  const document = gql`
    query andrewQueryName {
      country(code: "EG") {
        emoji
        name
      }
    }
  `;

  // const fetchGraphQlData = async () => {
  //   const document = gql`
  //     query {
  //       country(code: "EG") {
  //         emoji
  //         name
  //       }
  //     }
  //   `;
  //
  //   return request<{ country: { emoji: string; name: string } }>(
  //     'https://countries.trevorblades.com/graphql',
  //     document,
  //   );
  // };
  // const { data, isError, isSuccess, isLoading, refetch } = useQuery('helloQuery', fetchGraphQlData);
  const { loading, error, data, refetch } = useQuery(document);

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
            <CustomButton
              onPress={() => {
                // changeObfuscation();
                makeParallelApiCalls(generateUrls());
              }}
              title="Send Parallel Requests"
            />
            <CustomButton
              onPress={() => {
                makeSequentialApiCalls(generateUrls());
              }}
              title="Send Sequantail Requests"
            />
            <CustomButton onPress={() => refetch()} title="Reload GraphQL" />
            <View>
              {loading && <Text>Loading...</Text>}
              {!loading && !error && <Text>GraphQL Data: {data.country.emoji}</Text>}
              {error && <Text>Error!</Text>}
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
