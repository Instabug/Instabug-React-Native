import React, { useState } from 'react';
import { ActivityIndicator } from 'react-native';
import { ListTile } from '../../components/ListTile';
import { Screen } from '../../components/Screen';
import { showNotification } from '../../utils/showNotification';

export const HttpScreen: React.FC = () => {
  const [loading, setLoading] = useState(false);

  const makeGetCall = async () => {
    setLoading(true);
    const url = 'https://httpbin.org/anything';
    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const responseBody = await response.json();
      console.log('Response:', responseBody);

      setLoading(false);
      showNotification('Success', 'Succeeded');
    } catch (error) {
      console.error('Error:', error);
      setLoading(false);
      showNotification('Error', 'Failed');
    }
  };

  const makePostCall = async () => {
    setLoading(true);
    const url = 'https://httpbin.org/post';
    const requestBody = {
      name: 'Islam',
    };
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });

      const responseBody = await response.json();
      console.log('Response:', responseBody);

      setLoading(false);
      showNotification('Success', 'Succeeded');
    } catch (error) {
      console.error('Error:', error);
      setLoading(false);
      showNotification('Error', 'Failed');
    }
  };

  const makeDeleteCall = async () => {
    setLoading(true);
    const url = 'https://httpbin.org/delete';
    try {
      const response = await fetch(url, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const responseBody = await response.json();
      console.log('Response:', responseBody);

      setLoading(false);
      showNotification('Success', 'Succeeded');
    } catch (error) {
      console.error('Error:', error);
      setLoading(false);
      showNotification('Error', 'Failed');
    }
  };

  const makePutCall = async () => {
    setLoading(true);
    const url = 'https://httpbin.org/put';
    const requestBody = {
      name: 'Islam',
    };
    try {
      const response = await fetch(url, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });

      const responseBody = await response.json();
      console.log('Response:', responseBody);

      setLoading(false);
      showNotification('Success', 'Succeeded');
    } catch (error) {
      console.error('Error:', error);
      setLoading(false);
      showNotification('Error', 'Failed');
    }
  };

  const makePatchCall = async () => {
    setLoading(true);
    const url = 'https://httpbin.org/patch';

    const jsonInputString = JSON.stringify({ name: 'Islam' });

    try {
      const response = await fetch(url, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: jsonInputString,
      });

      const responseBody = await response.json();
      console.log('Response:', responseBody);
      setLoading(false);
      showNotification('Success', 'Succeeded');
    } catch (error) {
      console.error('Error:', error);
      setLoading(false);
      showNotification('Error', 'Failed');
    }
  };

  const makeDownloadImageCall = async () => {
    setLoading(true);
    const url = 'https://httpbin.org/image/jpeg';
    try {
      const response = await fetch(url, {
        method: 'GET',
      });

      const responseBody = await response.blob();
      console.log('Response:', responseBody);

      setLoading(false);
      showNotification('Success', 'Succeeded');
    } catch (error) {
      console.error('Error:', error);
      setLoading(false);
      showNotification('Error', 'Failed');
    }
  };

  return (
    <Screen>
      {loading && <ActivityIndicator size="large" color="#0000ff" />}
      <ListTile title="GET" onPress={makeGetCall} />
      <ListTile title="POST" onPress={makePostCall} />
      <ListTile title="DELETE" onPress={makeDeleteCall} />
      <ListTile title="PUT" onPress={makePutCall} />
      <ListTile title="PATCH" onPress={makePatchCall} />
      <ListTile title="Download Image" onPress={makeDownloadImageCall} />
    </Screen>
  );
};
