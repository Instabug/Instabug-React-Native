import React, { useState } from 'react';
import { ActivityIndicator } from 'react-native';
import Instabug from 'instabug-reactnative';
import { ListTile } from '../components/ListTile';
import { Screen } from '../components/Screen';
import { showNotification } from '../utils/showNotification';

export const LegacyModeScreen: React.FC = () => {
  const [loading, setLoading] = useState(false);

  const addMultipleInstabugLogs = async (numberOfLogs: number) => {
    setLoading(true);
    try {
      for (let i = 0; i < numberOfLogs; i++) {
        Instabug.logDebug(`log ${i}`);
      }
      showNotification('Success', 'Succeeded');
    } catch (error) {
      showNotification('Error', 'Failed');
    } finally {
      setLoading(false);
    }
  };

  const addMultipleUserEvents = async (numberOfLogs: number) => {
    setLoading(true);
    try {
      for (let i = 0; i < numberOfLogs; i++) {
        Instabug.logUserEvent(`test user event ${i}`);
      }
      showNotification('Success', 'Succeeded');
    } catch (error) {
      showNotification('Error', 'Failed');
    } finally {
      setLoading(false);
    }
  };

  const addMultipleTags = async (numberOfLogs: number) => {
    setLoading(true);
    try {
      for (let i = 0; i < numberOfLogs; i++) {
        Instabug.appendTags([`test tag ${i}`]);
      }
      showNotification('Success', 'Succeeded');
    } catch (error) {
      showNotification('Error', 'Failed');
    } finally {
      setLoading(false);
    }
  };

  const addMultipleUserAttributes = async (numberOfLogs: number) => {
    setLoading(true);
    try {
      for (let i = 0; i < numberOfLogs; i++) {
        Instabug.setUserAttribute(`user${i}`, `user${i} value`);
      }
      showNotification('Success', 'Succeeded');
    } catch (error) {
      showNotification('Error', 'Failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Screen>
      {loading && <ActivityIndicator size="large" color="#0000ff" />}

      <ListTile
        title="Attach 10 InstabugLogs at a time"
        onPress={() => addMultipleInstabugLogs(10)}
      />
      <ListTile title="Attach 10 events at a time" onPress={() => addMultipleUserEvents(10)} />
      <ListTile title="Attach 10 tags at a time" onPress={() => addMultipleTags(10)} />
      <ListTile
        title="Attach 10 user attributes at a time"
        onPress={() => addMultipleUserAttributes(10)}
      />
    </Screen>
  );
};
