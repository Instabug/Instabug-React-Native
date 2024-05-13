import React from 'react';
import { Alert, Platform, ScrollView, Text, View } from 'react-native';

import { CrashReporting } from '@instabug/instabug-reactnative-dream11';

import { ListTile } from '../components/ListTile';
import { Screen } from '../components/Screen';
import { Section } from '../components/Section';
import { PlatformListTile } from '../components/PlatformListTile';
import { NativeExampleCrashReporting } from '../native/NativeCrashReporting';

export const CrashReportingScreen: React.FC = () => {
  function throwHandledException(error: Error) {
    try {
      if (!error.message) {
        const appName = 'Instabug Test App';
        error.message = `Handled ${error.name} From ${appName}`;
      }
      throw error;
    } catch (err) {
      if (err instanceof Error) {
        CrashReporting.reportError(err).then(() =>
          Alert.alert(`Crash report for ${error.name} is Sent!`),
        );
      }
    }
  }

  function throwUnhandledException(error: Error, isPromise: boolean = false) {
    const appName = 'Instabug Test App';
    const rejectionType = isPromise ? 'Promise Rejection ' : '';
    const errorMessage = `Unhandled ${rejectionType}${error.name} from ${appName}`;

    if (!error.message) {
      console.log(`IBG-CRSH | Error message: ${error.message}`);
      error.message = errorMessage;
    }

    if (isPromise) {
      console.log('IBG-CRSH | Promise');
      Promise.reject(error).then(() =>
        Alert.alert(`Promise Rejection Crash report for ${error.name} is Sent!`),
      );
    } else {
      throw error;
    }
  }

  return (
    <Screen>
      <ScrollView>
        <Section title="Non-Fatals">
          <ListTile
            title="Throw Handled Exception"
            onPress={() => throwHandledException(new Error())}
          />
          <ListTile
            title="Throw Handled Syntax Exception"
            onPress={() => throwHandledException(new SyntaxError())}
          />
          <ListTile
            title="Throw Handled Range Exception"
            onPress={() => throwHandledException(new RangeError())}
          />
          <ListTile
            title="Throw Handled Reference Exception"
            onPress={() => throwHandledException(new ReferenceError())}
          />
          <ListTile
            title="Throw Handled URIError Exception"
            onPress={() => throwHandledException(new URIError())}
          />
          <ListTile
            title="Throw Handled Native Exception"
            onPress={() => NativeExampleCrashReporting.sendNativeNonFatal()}
          />
        </Section>
        <Section title={'Fatal Crashes'}>
          <Text>Fatal Crashes can only be tested in release mode </Text>
          <Text>These buttons will crash the application.</Text>
          <ListTile
            title="Reject Unhandled Promise"
            onPress={() => throwUnhandledException(Error(), true)}
          />
          <ListTile
            title="Throw Unhandled Fatal Exception"
            onPress={() => throwUnhandledException(Error())}
          />
          <ListTile
            title="Throw Unhandled Syntax Exception"
            onPress={() => throwUnhandledException(new SyntaxError())}
          />
          <ListTile
            title="Throw Unhandled Range Exception"
            onPress={() => throwUnhandledException(new RangeError())}
          />
          <ListTile
            title="Throw Unhandled Reference Exception"
            onPress={() => throwUnhandledException(new ReferenceError())}
          />
          <ListTile
            title="Throw Unhandled URIError Exception"
            onPress={() => throwUnhandledException(new URIError())}
          />
          <ListTile
            title="Throw Unhandled Native Exception"
            onPress={() => NativeExampleCrashReporting.sendNativeFatalCrash()}
          />
          <ListTile
            title="Send Native Fatal Hang"
            onPress={() => NativeExampleCrashReporting.sendFatalHang()}
          />
          <PlatformListTile
            title="Send Native ANR"
            onPress={() => NativeExampleCrashReporting.sendANR()}
            platform={'android'}
          />
          <ListTile
            title="Throw Unhandled Native OOM Exception"
            onPress={() => NativeExampleCrashReporting.sendOOM()}
          />
        </Section>
        {Platform.OS === 'android' ? (
          <Section title={'NDK Crashes'}>
            <Text>NDK Crashes can only be tested in release mode </Text>
            <Text>These buttons will crash the application.</Text>
            <ListTile
              title="Throw Unhandled NDK SIGSEGV Crash"
              onPress={async () => {
                console.log('Sending NDK SIGSEGV Crash');
                await NativeExampleCrashReporting.causeSIGSEGVCrash();
              }}
            />
            <ListTile
              title="Throw Unhandled NDK SIGFPE Crash"
              onPress={async () => {
                console.log('Sending NDK SIGFPE Crash');
                await NativeExampleCrashReporting.causeSIGFPECrash();
              }}
            />
            <ListTile
              title="Throw Unhandled NDK SIGILL Crash"
              onPress={async () => {
                console.log('Sending NDK SIGILL Crash');
                await NativeExampleCrashReporting.causeSIGILLCrash();
              }}
            />

            <ListTile
              title="Throw Unhandled NDK SIGBUS Crash"
              onPress={async () => {
                console.log('Sending NDK SIGBUS Crash');
                await NativeExampleCrashReporting.causeSIGBUSCrash();
              }}
            />
            <ListTile
              title="Throw Unhandled NDK SIGTRAP Crash"
              onPress={async () => {
                console.log('Sending NDK SIGTRAP Crash');
                await NativeExampleCrashReporting.causeSIGTRAPCrash();
              }}
            />
          </Section>
        ) : (
          <View />
        )}
      </ScrollView>
    </Screen>
  );
};
