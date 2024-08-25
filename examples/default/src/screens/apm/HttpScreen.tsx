import React from 'react';

import {useState } from 'react';
import {Text,Switch,ToastAndroid,Platform, ActivityIndicator,Alert,View } from 'react-native';
import Instabug, { BugReporting,APM, InvocationOption, ReportType } from 'instabug-reactnative';

import { ListTile } from '../../components/ListTile';
import axios from 'axios';

import { Screen } from '../../components/Screen';





export const HttpScreen: React.FC = () => {
  const [isEnabled, setIsEnabled] = useState(false);
  const [loadingGet, setLoading] = useState(false);
  const [loadingPost, setLoading2] = useState(false);
  const [loadingDelete, setLoading3] = useState(false);
  const [loadingPut, setLoading4] = useState(false);
  const [isSecureConnection, setIsSecureConnection] = useState(false);

  const [loading, setLoadingP] = useState(false);



  const toggleSwitch = (value: boolean) => {
    setIsEnabled(value);

    // Update APM state here
    APM.setEnabled(value); 

    // Show Toast message
    Alert.alert("Set APM enabled to " + value);
  };


  const makeGetCall = async () => {
    // setIsSecureConnection(!isSecureConnection);
    setLoading(true);
    // const url = `http${isSecureConnection ? 's' : ''}://httpbin.org/anything`;
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
    // setIsSecureConnection(!isSecureConnection);
    setLoading2(true);
    // const url = `http${isSecureConnection ? 's' : ''}://httpbin.org/anything`;
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
    // setIsSecureConnection(!isSecureConnection);
    setLoading3(true);
    // const url = `http${isSecureConnection ? 's' : ''}://httpbin.org/anything`;
    const url = `https://httpbin.org/delete`;
    // Create the body for the POST request
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

      // Show success message
      if (Platform.OS === 'android') {
        ToastAndroid.show('Succeeded', ToastAndroid.SHORT);
      } else {
        Alert.alert('Success', 'Succeeded');
      }
    } catch (error) {
      console.error('Error:', error);
      setLoading3(false);

      // Show error message
      if (Platform.OS === 'android') {
        ToastAndroid.show('Failed', ToastAndroid.SHORT);
      } else {
        Alert.alert('Error', 'Failed');
      }
    }
  };

  const makePutCall = async () => {
    // setIsSecureConnection(!isSecureConnection);
    setLoading4(true);
    // const url = `http${isSecureConnection ? 's' : ''}://httpbin.org/anything`;
    const url = `https://httpbin.org/put`;
    // Create the body for the POST request
      const requestBody = {
        name: 'Islam'
      };
    // Create the body for the POST request
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

      // Show success message
      if (Platform.OS === 'android') {
        ToastAndroid.show('Succeeded', ToastAndroid.SHORT);
      } else {
        Alert.alert('Success', 'Succeeded');
      }
    } catch (error) {
      console.error('Error:', error);
      setLoading4(false);

      // Show error message
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







    
    </Screen>
  );
};








