import React from 'react';
import {useState } from 'react';
import {Text,Switch,ToastAndroid,Platform, ActivityIndicator,Alert } from 'react-native';
import { ListTile } from '../../components/ListTile';
import { Screen } from '../../components/Screen';




export const HttpScreen: React.FC = () => {
  const [isEnabled, setIsEnabled] = useState(false);
  const [loadingGet, setLoading] = useState(false);
  const [loadingPost, setLoading2] = useState(false);
  const [loadingDelete, setLoading3] = useState(false);
  const [loadingPut, setLoading4] = useState(false);
  const [loadingPatch, setLoading5] = useState(false);
  const [loadingDownloadImage, setLoading6] = useState(false);

  const [isSecureConnection, setIsSecureConnection] = useState(false);

  const [loading, setLoadingP] = useState(false);

  const makeGetCall = async () => {
    setLoading(true);
    const url = `https://httpbin.org/anything`;
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

      // Show success message
      if (Platform.OS === 'android') {
        ToastAndroid.show('Succeeded', ToastAndroid.SHORT);
      } else {
        Alert.alert('Success', 'Succeeded');
      }
    } catch (error) {
      console.error('Error:', error);
      setLoading(false);

      // Show error message
      if (Platform.OS === 'android') {
        ToastAndroid.show('Failed', ToastAndroid.SHORT);
      } else {
        Alert.alert('Error', 'Failed');
      }
    }
  };


  const makePostCall = async () => {
    setLoading2(true);
    const url = `https://httpbin.org/post`;
    // Create the body for the POST request
    const requestBody = {
    name: 'Islam'
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
      
      setLoading2(false);

      // Show success message
      if (Platform.OS === 'android') {
        ToastAndroid.show('Succeeded', ToastAndroid.SHORT);
      } else {
        Alert.alert('Success', 'Succeeded');
      }
    } catch (error) {
      console.error('Error:', error);
      setLoading2(false);

      // Show error message
      if (Platform.OS === 'android') {
        ToastAndroid.show('Failed', ToastAndroid.SHORT);
      } else {
        Alert.alert('Error', 'Failed');
      }
    }
  };


  const makeDeleteCall = async () => {
    setLoading3(true);
    const url = `https://httpbin.org/delete`;
    try {
      const response = await fetch(url, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const responseBody = await response.json();
      console.log('Response:', responseBody);
      
      setLoading3(false);

      if (Platform.OS === 'android') {
        ToastAndroid.show('Succeeded', ToastAndroid.SHORT);
      } else {
        Alert.alert('Success', 'Succeeded');
      }
    } catch (error) {
      console.error('Error:', error);
      setLoading3(false);

      if (Platform.OS === 'android') {
        ToastAndroid.show('Failed', ToastAndroid.SHORT);
      } else {
        Alert.alert('Error', 'Failed');
      }
    }
  };

  const makePutCall = async () => {
    setLoading4(true);
    const url = `https://httpbin.org/put`;
      const requestBody = {
        name: 'Islam'
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
      
      setLoading4(false);

      if (Platform.OS === 'android') {
        ToastAndroid.show('Succeeded', ToastAndroid.SHORT);
      } else {
        Alert.alert('Success', 'Succeeded');
      }
    } catch (error) {
      console.error('Error:', error);
      setLoading4(false);

      if (Platform.OS === 'android') {
        ToastAndroid.show('Failed', ToastAndroid.SHORT);
      } else {
        Alert.alert('Error', 'Failed');
      }
    }
  };
  
  const makePatchCall = async () => {

      setLoading5(true);
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
  
        setLoading5(false);

      if (Platform.OS === 'android') {
        ToastAndroid.show('Succeeded', ToastAndroid.SHORT);
      } else {
        Alert.alert('Success', 'Succeeded');
      }
    } catch (error) {
      console.error('Error:', error);
      setLoading5(false);

      if (Platform.OS === 'android') {
        ToastAndroid.show('Failed', ToastAndroid.SHORT);
      } else {
        Alert.alert('Error', 'Failed');
      }
    }
  };

  const makeDownloadImageCall = async () => {
    setLoading6(true);
    const url = `https://httpbin.org/image/jpeg`;
    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'image/jpeg',
        },
      });

      const responseBody = await response.blob();
      console.log('Response:', responseBody);
      
      setLoading6(false);

      if (Platform.OS === 'android') {
        ToastAndroid.show('Succeeded', ToastAndroid.SHORT);
      } else {
        Alert.alert('Success', 'Succeeded');
      }
    } catch (error) {
      console.error('Error:', error);
      setLoading6(false);

      if (Platform.OS === 'android') {
        ToastAndroid.show('Failed', ToastAndroid.SHORT);
      } else {
        Alert.alert('Error', 'Failed');
      }
    }
  };



  
  return (
    <Screen>

      <ListTile title="GET" onPress={makeGetCall} />
      {loadingGet && <ActivityIndicator size="large" color="#0000ff" />}

      <ListTile title="POST" onPress={makePostCall} />
      {loadingPost && <ActivityIndicator size="large" color="#0000ff" />}

      <ListTile title="DELETE" onPress={makeDeleteCall} />
      {loadingDelete && <ActivityIndicator size="large" color="#0000ff" />}

      <ListTile title="PUT" onPress={makePutCall} />
      {loadingPut && <ActivityIndicator size="large" color="#0000ff" />}

      <ListTile title="PATCH" onPress={makePatchCall} />
      {loadingPatch && <ActivityIndicator size="large" color="#0000ff" />}


      <ListTile title="Download Image" onPress={makeDownloadImageCall} />
      {loadingDownloadImage && <ActivityIndicator size="large" color="#0000ff" />}







    
    </Screen>
  );
};








