import React, { useState } from 'react';
import { Alert, ScrollView, StyleSheet, View } from 'react-native';
import { CrashReporting, NonFatalErrorLevel } from 'instabug-reactnative';
import { ListTile } from '../../components/ListTile';
import { Screen } from '../../components/Screen';
import { Section } from '../../components/Section';
import { NativeExampleCrashReporting } from '../../native/NativeCrashReporting';
import { Button, Divider, VStack } from 'native-base';
import { InputField } from '../../components/InputField';
import { Select } from '../../components/Select';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { HomeStackParamList } from '../../navigation/HomeStack';

const styles = StyleSheet.create({
  inputWrapper: {
    padding: 4,
    flex: 1,
  },
  formContainer: {
    flexDirection: 'row',
    alignItems: 'stretch',
  },
});

export const NonFatalCrashesScreen: React.FC<
  NativeStackScreenProps<HomeStackParamList, 'NonFatalCrashes'>
> = () => {
  const [userAttributeKey, setUserAttributeKey] = useState('');
  const [userAttributeValue, setUserAttributeValue] = useState('');
  const [crashNameValue, setCrashNameValue] = useState('');
  const [crashFingerprint, setCrashFingerprint] = useState('');
  const [crashLevelValue, setCrashLevelValue] = useState<NonFatalErrorLevel>(
    NonFatalErrorLevel.error,
  );

  function throwHandledException(error: Error) {
    try {
      if (!error.message) {
        const appName = 'Instabug Test App';
        error.message = `Handled ${error.name} From ${appName}`;
      }
      throw error;
    } catch (err) {
      if (err instanceof Error) {
        CrashReporting.reportError(err, { level: NonFatalErrorLevel.critical })?.then(() =>
          Alert.alert(`Crash report for ${err.name} is Sent!`),
        );
      }
    }
  }

  function sendCrash() {
    try {
      const error = new Error(crashNameValue);
      throw error;
    } catch (err) {
      if (err instanceof Error) {
        const userAttributes: Record<string, string> = {};
        if (userAttributeKey && userAttributeValue) {
          userAttributes[userAttributeKey] = userAttributeValue;
        }
        const fingerprint = crashFingerprint.length === 0 ? undefined : crashFingerprint;

        CrashReporting.reportError(err, {
          userAttributes: userAttributes,
          fingerprint: fingerprint,
          level: crashLevelValue,
        })?.then(() => {
          Alert.alert(`Crash report for ${crashNameValue} is Sent!`);
        });
      }
    }
  }

  return (
    <ScrollView>
      <Screen>
        <Section title="Non-Fatals">
          <ListTile
            title="Throw Handled Exception"
            onPress={() => throwHandledException(new Error())}
            testID="id_throw_handled_exception"
          />
          <ListTile
            title="Throw Handled Syntax Exception"
            onPress={() => throwHandledException(new SyntaxError())}
            testID="id_throw_handled_syntax_exception"
          />
          <ListTile
            title="Throw Handled Range Exception"
            onPress={() => throwHandledException(new RangeError())}
            testID="id_throw_handled_range_exception"
          />
          <ListTile
            title="Throw Handled Reference Exception"
            onPress={() => throwHandledException(new ReferenceError())}
            testID="id_throw_handled_reference_exception"
          />
          <ListTile
            title="Throw Handled URIError Exception"
            onPress={() => throwHandledException(new URIError())}
            testID="id_throw_handled_uri_error_exception"
          />
          <ListTile
            title="Throw Handled Native Exception"
            onPress={() => NativeExampleCrashReporting.sendNativeNonFatal()}
            testID="id_throw_handled_native_exception"
          />

          <Divider my={5} />

          <Section title="Throw Handeld crash">
            <VStack>
              <View style={styles.inputWrapper}>
                <InputField
                  placeholder="Crash name"
                  onChangeText={(key) => setCrashNameValue(key)}
                  value={crashNameValue}
                  testID="id_crash_name"
                />
              </View>
              <View style={styles.formContainer}>
                <View style={styles.inputWrapper}>
                  <InputField
                    placeholder="User attribute key"
                    onChangeText={(key) => setUserAttributeKey(key)}
                    value={userAttributeKey}
                    testID="id_user_attribute_key"
                  />
                </View>
                <View style={styles.inputWrapper}>
                  <InputField
                    placeholder="User attribute value"
                    onChangeText={(value) => setUserAttributeValue(value)}
                    value={userAttributeValue}
                    testID="id_user_attribute_value"
                  />
                </View>
              </View>
              <View style={styles.inputWrapper}>
                <Select
                  label="Select Error Level"
                  testID="id_error_level"
                  items={[
                    {
                      label: 'Error',
                      value: NonFatalErrorLevel.error,
                      isInitial: true,
                      testID: 'id_error_level_error',
                    },
                    {
                      label: 'Info',
                      value: NonFatalErrorLevel.info,
                      testID: 'id_error_level_info',
                    },
                    {
                      label: 'Critical',
                      value: NonFatalErrorLevel.critical,
                      testID: 'id_error_level_critical',
                    },
                    {
                      label: 'Warning',
                      value: NonFatalErrorLevel.warning,
                      testID: 'id_error_level_warning',
                    },
                  ]}
                  onValueChange={(value) => {
                    setCrashLevelValue(value);
                  }}
                />
              </View>

              <View style={styles.inputWrapper}>
                <InputField
                  placeholder="Fingerprint"
                  onChangeText={(text) => setCrashFingerprint(text)}
                  value={crashFingerprint}
                  testID="id_crash_fingerprint"
                />
              </View>
              <Button mt="4" onPress={sendCrash} testID="id_send_crash">
                Send Crash
              </Button>
            </VStack>
          </Section>
        </Section>
      </Screen>
    </ScrollView>
  );
};
