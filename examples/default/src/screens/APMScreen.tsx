import React, { useState } from 'react';
import { Screen } from 'react-native-screens';
import { ListTile } from '../components/ListTile';
import { APM } from 'instabug-reactnative';
import { Image, ScrollView, Text, View } from 'react-native';
import { Section } from '../components/Section';
import { ClipboardTextInput } from '../components/ClipboardTextInput';
import { useQuery } from 'react-query';
import { HStack } from 'native-base';
import { request, gql } from 'graphql-request';

export const APMScreen: React.FC = () => {
  const [endpointUrl, setEndpointUrl] = useState('');

  async function sendRequestToUrl() {
    let urlToSend = '';

    if (endpointUrl.trim() !== '') {
      urlToSend = endpointUrl;
      console.log('endpoint');
    } else {
      // Use jsonplaceholder URL as a default if endpointUrl is empty
      console.log('sending to default');
      urlToSend = 'https://jsonplaceholder.typicode.com/posts/1';
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
      console.error('Error:', error);
      // Handle errors appropriately
    }
  }

  // Todo:
  const fetchGraphQlData = async () => {
    const document = gql`
      query {
        country(code: "EG") {
          emoji
          name
        }
      }
    `;

    const data = await request<{ country: { emoji: string; name: string } }>(
      'https://countries.trevorblades.com/graphql',
      document,
    );

    return data;
  };

  const { data, isError, isSuccess, isLoading, refetch } = useQuery('helloQuery', fetchGraphQlData);

  return (
    <Screen>
      <ScrollView>
        <Section title={'Network Logging'}>
          <ClipboardTextInput
            placeholder="Enter Endpoint Url"
            onChangeText={(text) => setEndpointUrl(text)}
            selectTextOnFocus={true}
            value={endpointUrl}
          />
          <ListTile title={'Send Request'} onPress={() => sendRequestToUrl()} />
          <ListTile title="Execution Trace" onPress={startExecutionTrace} />
          <View>
            {isLoading && <Text>Loading...</Text>}
            {isSuccess && <Text>Data: {data.country.emoji}</Text>}
            {isError && <Text>Error!</Text>}
            <ListTile title="Refetch Data" onPress={refetch} />
          </View>
        </Section>
        <Section title={'Images'}>
          <HStack>
            <Image
              source={{ uri: 'https://picsum.photos/200/300' }}
              style={{ width: 100, height: 150, alignItems: 'center' }}
            />
            <Image
              source={{ uri: 'https://dummyimage.com/600x400/000/fff' }}
              style={{ width: 100, height: 150, alignItems: 'center' }}
            />
          </HStack>
        </Section>
      </ScrollView>
    </Screen>
  );

  // Starts an execution trace and assigns it to a variable then waits for one second and ends the execution trace
  async function startExecutionTrace() {
    const executionTrace = await APM.startExecutionTrace('Execution Trace');
    executionTrace.setAttribute('key', 'value');
    setTimeout(() => {
      executionTrace.end();
    }, 1000);
  }
};
