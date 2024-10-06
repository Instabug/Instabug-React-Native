import React, { useState } from 'react';
import { ActivityIndicator } from 'react-native';
import Instabug from 'instabug-reactnative';
import { ListTile } from '../components/ListTile';
import { Screen } from '../components/Screen';
import { showNotification } from '../utils/showNotification';

export const LegacyModeScreen: React.FC = () => {
  const [loading, setLoading] = useState(false);

  const addInstabugLog = (log: string): Promise<void> => {
    return new Promise<void>((resolve) => {
      Instabug.logDebug(log);
      resolve();
    });
  };

  const addUserEvent = (event: string): Promise<void> => {
    return new Promise<void>((resolve) => {
      Instabug.logUserEvent(event);
      resolve();
    });
  };
  const addTag = (tag: string): Promise<void> => {
    return new Promise<void>((resolve) => {
      Instabug.appendTags([tag]);
      resolve();
    });
  };
  const addUserAttributes = (key: string, value: string): Promise<void> => {
    return new Promise<void>((resolve) => {
      Instabug.setUserAttribute(key, value);
      resolve();
    });
  };

  const addMultipleInstabugLogs = async (numberOfLogs: number) => {
    setLoading(true);
    try {
      const logPromises: Promise<void>[] = [];
      for (let i = 0; i < numberOfLogs; i++) {
        logPromises.push(addInstabugLog(`log ${i}`));
      }
      await Promise.all(logPromises);
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
      const logPromises: Promise<void>[] = [];
      for (let i = 0; i < numberOfLogs; i++) {
        logPromises.push(addUserEvent(`test user event ${i}`));
      }
      await Promise.all(logPromises);
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
      const logPromises: Promise<void>[] = [];
      for (let i = 0; i < numberOfLogs; i++) {
        logPromises.push(addTag(`test tag ${i}`));
      }
      await Promise.all(logPromises);
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
      const logPromises: Promise<void>[] = [];
      for (let i = 0; i < numberOfLogs; i++) {
        logPromises.push(addUserAttributes(`user${i}`, `user${i} value`));
      }
      await Promise.all(logPromises);
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
