import React from 'react';
import { Alert, Platform, ScrollView, StyleSheet, Text } from 'react-native';
import { ListTile } from '../../components/ListTile';
import { Screen } from '../../components/Screen';
import { Section } from '../../components/Section';
import { PlatformListTile } from '../../components/PlatformListTile';
import { NativeExampleCrashReporting } from '../../native/NativeCrashReporting';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { HomeStackParamList } from '../../navigation/HomeStack';

const styles = StyleSheet.create({
  sectionBodyText: {
    color: 'gray',
  },
});

export const FatalCrashesScreen: React.FC<
  NativeStackScreenProps<HomeStackParamList, 'FatalCrashes'>
> = () => {
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
    <ScrollView>
      <Screen>
        <Section title="Fatal Crashes">
          <Text style={styles.sectionBodyText}>
            Fatal Crashes can only be tested in release mode
          </Text>
          <Text style={styles.sectionBodyText}>These buttons will crash the application.</Text>
          <ListTile
            title="Reject Unhandled Promise"
            onPress={() => throwUnhandledException(Error(), true)}
            testID="id_reject_unhandled_promise"
          />
          <ListTile
            title="Throw Unhandled Fatal Exception"
            onPress={() => throwUnhandledException(Error())}
            testID="id_throw_unhandled_fatal_exception"
          />
          <ListTile
            title="Throw Unhandled Syntax Exception"
            onPress={() => throwUnhandledException(new SyntaxError())}
            testID="id_throw_unhandled_syntax_exception"
          />
          <ListTile
            title="Throw Unhandled Range Exception"
            onPress={() => throwUnhandledException(new RangeError())}
            testID="id_throw_unhandled_range_exception"
          />
          <ListTile
            title="Throw Unhandled Reference Exception"
            onPress={() => throwUnhandledException(new ReferenceError())}
            testID="id_throw_unhandled_reference_exception"
          />
          <ListTile
            title="Throw Unhandled URIError Exception"
            onPress={() => throwUnhandledException(new URIError())}
            testID="id_throw_unhandled_uri_error_exception"
          />
          <ListTile
            title="Throw Unhandled Native Exception"
            onPress={() => NativeExampleCrashReporting.sendNativeFatalCrash()}
            testID="id_throw_unhandled_native_exception"
          />
          <ListTile
            title="Send Native Fatal Hang"
            onPress={() => NativeExampleCrashReporting.sendFatalHang()}
            testID="id_send_native_fatal_hang"
          />
          <PlatformListTile
            title="Send Native ANR"
            onPress={() => NativeExampleCrashReporting.sendANR()}
            platform={'android'}
            testID="id_send_native_anr"
          />
          <ListTile
            title="Throw Unhandled Native OOM Exception"
            onPress={() => NativeExampleCrashReporting.sendOOM()}
            testID="id_throw_unhandled_native_oom_exception"
          />
        </Section>

        {Platform.OS === 'android' && (
          <Section title="NDK Crashes">
            <Text style={styles.sectionBodyText}>
              NDK Crashes can only be tested in release mode.
            </Text>
            <Text style={styles.sectionBodyText}>These buttons will crash the application.</Text>
            <ListTile
              title="Throw Unhandled NDK SIGSEGV Crash"
              onPress={async () => {
                console.log('Sending NDK SIGSEGV Crash');
                await NativeExampleCrashReporting.causeSIGSEGVCrash();
              }}
              testID="id_throw_unhandled_ndk_sigsegv_crash"
            />
            <ListTile
              title="Throw Unhandled NDK SIGFPE Crash"
              onPress={async () => {
                console.log('Sending NDK SIGFPE Crash');
                await NativeExampleCrashReporting.causeSIGFPECrash();
              }}
              testID="id_throw_unhandled_ndk_sigfpe_crash"
            />
            <ListTile
              title="Throw Unhandled NDK SIGILL Crash"
              onPress={async () => {
                console.log('Sending NDK SIGILL Crash');
                await NativeExampleCrashReporting.causeSIGILLCrash();
              }}
              testID="id_throw_unhandled_ndk_sigill_crash"
            />
            <ListTile
              title="Throw Unhandled NDK SIGBUS Crash"
              onPress={async () => {
                console.log('Sending NDK SIGBUS Crash');
                await NativeExampleCrashReporting.causeSIGBUSCrash();
              }}
              testID="id_throw_unhandled_ndk_sigbus_crash"
            />
            <ListTile
              title="Throw Unhandled NDK SIGTRAP Crash"
              onPress={async () => {
                console.log('Sending NDK SIGTRAP Crash');
                await NativeExampleCrashReporting.causeSIGTRAPCrash();
              }}
              testID="id_throw_unhandled_ndk_sigtrap_crash"
            />
          </Section>
        )}
      </Screen>
    </ScrollView>
  );
};
