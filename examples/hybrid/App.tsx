/* eslint-disable react-native/no-inline-styles */
import { ReactNode, useEffect } from 'react';
import React from 'react';
import CodePush from 'react-native-code-push';
import axios from 'axios';
import { Button, Image, Platform, SafeAreaView, Text } from 'react-native';
import Instabug, {
  CrashReporting,
  InvocationEvent,
  LogLevel,
  NetworkInterceptionMode,
  ReproStepsMode,
} from 'instabug-reactnative';

const throwHandled = () => {
  try {
    throw Error('This is a handled JS Crash');
  } catch (err) {
    if (err instanceof Error) {
      CrashReporting.reportError(err);
    }
  }
};

const throwUnhandled = () => {
  throw Error('This is an unhandled JS Crash');
};

const sendGraphQLRequest = async () => {
  try {
    const response = await axios.post(
      'https://countries.trevorblades.com/graphql',
      {
        query: `
        query GetCountry {
          country(code: "EG") {
            emoji
            name
          }
        }
      `,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'ibg-graphql-header': 'GetCountry',
        },
      },
    );
    console.log('Response:', response.data.data);
  } catch (error) {
    console.error('Error:', error);
  }
};

const App: () => ReactNode = () => {
  useEffect(() => {
    Instabug.init({
      token: '0fcc87b8bf731164828cc411eccc802a',
      invocationEvents: [InvocationEvent.floatingButton],
      networkInterceptionMode:
        Platform.OS === 'ios' ? NetworkInterceptionMode.native : NetworkInterceptionMode.javascript,
      debugLogsLevel: LogLevel.verbose,
    });
    CodePush.getUpdateMetadata().then((metadata) => {
      if (metadata) {
        Instabug.setCodePushVersion(metadata.label);
      }
    });
    CrashReporting.setNDKCrashesEnabled(true);
    Instabug.setReproStepsConfig({
      all: ReproStepsMode.enabled,
    });
  }, []);

  return (
    <SafeAreaView
      style={{
        minHeight: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Image
        source={{
          uri: 'https://reactnative.dev/img/tiny_logo.png',
          height: 100,
          width: 100,
        }}
      />
      <Text style={{ fontSize: 21, fontWeight: '700' }}>React Native App</Text>
      <Button title="Handled Crash" onPress={throwHandled} />
      <Button title="Unhandled Crash" onPress={throwUnhandled} />
      <Button title="Send GQL Request" onPress={sendGraphQLRequest} />
    </SafeAreaView>
  );
};

export default App;
