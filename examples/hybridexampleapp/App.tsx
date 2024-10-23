/* eslint-disable react-native/no-inline-styles */
import {ReactNode, useEffect} from 'react';
import React from 'react';
import {Button, Image, SafeAreaView, Text} from 'react-native';
import Instabug, {CrashReporting, InvocationEvent, LogLevel, ReproStepsMode} from 'instabug-reactnative';

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

const App: () => ReactNode = () => {
  console.log('ayaaaaaa');
  useEffect(() => {
    Instabug.init({
      token: 'deb1910a7342814af4e4c9210c786f35',
      invocationEvents: [InvocationEvent.floatingButton],
      debugLogsLevel: LogLevel.verbose,
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
      <Text style={{fontSize: 21, fontWeight: '700'}}>React Native App</Text>
      <Button title="Handled Crash" onPress={throwHandled} />
      <Button title="Unhandled Crash" onPress={throwUnhandled} />
    </SafeAreaView>
  );
};

export default App;
