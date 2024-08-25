import React from 'react';

import {useState } from 'react';
import {Text,Switch,ToastAndroid,Platform, ActivityIndicator,Alert,View,StyleSheet } from 'react-native';
import Instabug, { WelcomeMessageMode,BugReporting,APM, InvocationOption, ReportType } from 'instabug-reactnative';


import { ListTile } from '../components/ListTile';
import axios from 'axios';

import { Screen } from '../components/Screen';




export const LegacyModeScreen: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState(null);

  const logInstabug = (log:string): Promise<void>  => {
    return new Promise<void>((resolve) => {
        setTimeout(() => {
          Instabug.logDebug(log);
            resolve();
        }, 100); // Simulate some asynchronous operation
    });
};
// const logNetwork = (event:string): Promise<void>  => {
//   return new Promise<void>((resolve) => {
//       setTimeout(() => {
//         Instabug.logUserEvent(event);
//           resolve();
//       }, 100); // Simulate some asynchronous operation
//   });
// };
const logUserEvent = (event:string): Promise<void>  => {
  return new Promise<void>((resolve) => {
      setTimeout(() => {
        Instabug.logUserEvent(event);
          resolve();
      }, 100); // Simulate some asynchronous operation
  });
};
const addTag = (tag:string): Promise<void>  => {
  return new Promise<void>((resolve) => {
      setTimeout(() => {
        Instabug.appendTags([tag]);
          resolve();
      }, 100); // Simulate some asynchronous operation
  });
};
const addUserAttributes = (key:string,value:string): Promise<void>  => {
  return new Promise<void>((resolve) => {
      setTimeout(() => {
        Instabug.setUserAttribute(key,value);
          resolve();
      }, 100); // Simulate some asynchronous operation
  });
};

  const getInstabugLogs = async (numberOfLogs: number) => {
    setLoading(true);
    try {
        const logPromises = [];
        for (let i = 0; i < numberOfLogs; i++) {
            logPromises.push(logInstabug(`log ${i}`));
        }

        await Promise.all(logPromises);
        // Logs completed
        if (Platform.OS === 'android') {
        ToastAndroid.show('Succeeded', ToastAndroid.SHORT);
      } else {
        Alert.alert('Success', 'Succeeded');
      }

      } catch (error) {
        if (Platform.OS === 'android') {
          ToastAndroid.show('Failed', ToastAndroid.SHORT);
        } else {
          Alert.alert('Error', 'Failed');
        }
      } finally {
        setLoading(false);
    }
};


  // const getNetworkLogs = async (numberOfLogs: number) => {

  //   setLoading(true);
  //   try {
  //       const logPromises = [];
  //       for (let i = 0; i < numberOfLogs; i++) {
  //           logPromises.push(logNetwork(`log ${i}`));
  //       }

  //       await Promise.all(logPromises);
  //       // Logs completed
  //       if (Platform.OS === 'android') {
  //       ToastAndroid.show('Succeeded', ToastAndroid.SHORT);
  //     } else {
  //       Alert.alert('Success', 'Succeeded');
  //     }

  //     } catch (error) {
  //       if (Platform.OS === 'android') {
  //         ToastAndroid.show('Failed', ToastAndroid.SHORT);
  //       } else {
  //         Alert.alert('Error', 'Failed');
  //       }
  //     } finally {
  //       setLoading(false);
  //   }

  // }



  const getUserEvents = async (numberOfLogs: number) => {
    setLoading(true);
    try {
        const logPromises = [];
        for (let i = 0; i < numberOfLogs; i++) {
            logPromises.push(logUserEvent(`test user event ${i}`));
        }

        await Promise.all(logPromises);
        // Logs completed
        if (Platform.OS === 'android') {
        ToastAndroid.show('Succeeded', ToastAndroid.SHORT);
      } else {
        Alert.alert('Success', 'Succeeded');
      }

      } catch (error) {
        if (Platform.OS === 'android') {
          ToastAndroid.show('Failed', ToastAndroid.SHORT);
        } else {
          Alert.alert('Error', 'Failed');
        }
      } finally {
        setLoading(false);
    }
};


  const getTags = async (numberOfLogs: number) => {

    setLoading(true);
    try {
        const logPromises = [];
        for (let i = 0; i < numberOfLogs; i++) {
            logPromises.push(addTag(`test tag ${i}`));
        }

        await Promise.all(logPromises);
        // Logs completed
        if (Platform.OS === 'android') {
        ToastAndroid.show('Succeeded', ToastAndroid.SHORT);
      } else {
        Alert.alert('Success', 'Succeeded');
      }

      } catch (error) {
        if (Platform.OS === 'android') {
          ToastAndroid.show('Failed', ToastAndroid.SHORT);
        } else {
          Alert.alert('Error', 'Failed');
        }
      } finally {
        setLoading(false);
    }

  }


  const getUserAttributes = async (numberOfLogs: number) => {

    setLoading(true);
    try {
        const logPromises = [];
        for (let i = 0; i < numberOfLogs; i++) {
            logPromises.push(addUserAttributes(`user${i}`, `user${i} value`));
        }

        await Promise.all(logPromises);
        // Logs completed
        if (Platform.OS === 'android') {
        ToastAndroid.show('Succeeded', ToastAndroid.SHORT);
      } else {
        Alert.alert('Success', 'Succeeded');
      }

      } catch (error) {
        if (Platform.OS === 'android') {
          ToastAndroid.show('Failed', ToastAndroid.SHORT);
        } else {
          Alert.alert('Error', 'Failed');
        }
      } finally {
        setLoading(false);
    }

  }

  // Similar functions for PUT, DELETE, etc. can be added here

  return (
    <Screen>

          {loading && <ActivityIndicator size="large" color="#0000ff" />}

          <ListTile title="Attach 10 InstabugLogs at a time" onPress={() => getInstabugLogs(10)} />
          {/* <ListTile title="Attacg 10 networks at a time" onPress={() => getNetworkLogs(10)} /> */}
          <ListTile title="Attach 10 events at a time" onPress={() => getUserEvents(10)} />
          <ListTile title="Attach 10 tags at a time" onPress={() => getTags(10)} />
          <ListTile title="Attach 10 user attributes at a time" onPress={() => getUserAttributes(10)} />

          {response && <Text>{JSON.stringify(response)}</Text>}
    
    
    </Screen>


  );
};

