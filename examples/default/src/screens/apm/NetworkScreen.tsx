import React, { useState } from 'react';
import { Image, ScrollView, StyleSheet, Text, useWindowDimensions, View } from 'react-native';
import { Section } from '../../components/Section';
import { Screen } from '../../components/Screen';
import { ClipboardTextInput } from '../../components/ClipboardTextInput';
import { useQuery } from 'react-query';
import { HStack, VStack } from 'native-base';
import { gql, GraphQLClient } from 'graphql-request';
import { CustomButton } from '../../components/CustomButton';
import axios from 'axios';
import type { HomeStackParamList } from '../../navigation/HomeStack';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ListTile } from '../../components/ListTile';

export const NetworkScreen: React.FC<
  NativeStackScreenProps<HomeStackParamList, 'NetworkTraces'>
> = ({ navigation }) => {
  const [endpointUrl, setEndpointUrl] = useState('');
  const { width, height } = useWindowDimensions();
  const defaultRequestBaseUrl = 'https://jsonplaceholder.typicode.com/posts/';
  const shortenLink = 'https://shorturl.at/3Ufj3';
  const defaultRequestUrl = `${defaultRequestBaseUrl}1`;

  const imageUrls = [
    'https://fastly.picsum.photos/id/57/200/300.jpg?hmac=l908G1qVr4r7dP947-tak2mY8Vvic_vEYzCXUCKKskY',
    'https://fastly.picsum.photos/id/619/200/300.jpg?hmac=WqBGwlGjuY9RCdpzRaG9G-rc9Fi7TGUINX_-klAL2kA',
  ];

  async function sendRequestToUrl() {
    let urlToSend: string;

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

  async function sendRequestToUrlUsingAxios() {
    let urlToSend: string;

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
      const response = await axios.get(urlToSend);
      // Format the JSON response for better logging
      const formattedData = JSON.stringify(response.data, null, 2);

      // Log the formatted response
      console.log('Response:', formattedData);
    } catch (error) {
      // Handle errors appropriately
      console.error('Error:', error);
    }
  }

  async function sendRedirectRequestToUrl() {
    try {
      console.log('Sending request to: ', shortenLink);
      const response = await fetch(shortenLink);
      console.log('Received from: ', response.url);

      // Format the JSON response for better logging
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
    const client = new GraphQLClient('https://countries.trevorblades.com/graphql', {
      headers: {
        'ibg-graphql-header': 'AndrewQL', // change Query Name here
      },
    });

    const document = gql`
      query {
        country(code: "EG") {
          emoji
          name
        }
      }
    `;

    return client.request<{ country: { emoji: string; name: string } }>(document);
  };

  const { data, isError, isSuccess, isLoading, refetch } = useQuery('helloQuery', fetchGraphQlData);

  function generateUrls(count: number = 10) {
    const urls = [];
    for (let i = 1; i <= count; i++) {
      urls.push(defaultRequestBaseUrl + i);
    }
    return urls;
  }

  async function makeSequentialApiCalls(urls: string[]): Promise<any[]> {
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
      return await Promise.all(fetchPromises);
    } catch (error) {
      console.error('Error making parallel API calls:', error);
      throw error;
    }
  }

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
              onPress={sendRedirectRequestToUrl}
              title="Send Redirection Request To Url"
            />
            <CustomButton
              onPress={sendRequestToUrlUsingAxios}
              title="Send Request To Url Using Axios"
            />

            <CustomButton
              onPress={() => makeParallelApiCalls(generateUrls())}
              title="Send Parallel Requests"
            />
            <CustomButton
              onPress={() => makeSequentialApiCalls(generateUrls())}
              title="Send Sequantail Requests"
            />

            <CustomButton onPress={() => refetch()} title="Reload GraphQL" />
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
        <ListTile title="HTTP Screen" onPress={() => navigation.navigate('HttpScreen')} />
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
