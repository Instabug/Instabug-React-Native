import React, { useState } from 'react';

import Instabug, {
  BugReporting,
  ColorTheme,
  InvocationEvent,
  Locale,
  NetworkLogger,
  WelcomeMessageMode,
  ReproStepsMode,
} from 'instabug-reactnative';
import { InputGroup, InputLeftAddon, useToast, VStack, Button } from 'native-base';

import { ListTile } from '../../components/ListTile';
import { Screen } from '../../components/Screen';
import { Select } from '../../components/Select';
import { StyleSheet, View, ScrollView } from 'react-native';
import { VerticalListTile } from '../../components/VerticalListTile';
import { InputField } from '../../components/InputField';
import { useCallbackHandlers } from '../../contexts/callbackContext';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { HomeStackParamList } from '../../navigation/HomeStack';
import { UserStepsState } from './UserStepsStateScreen';

export const SettingsScreen: React.FC<NativeStackScreenProps<HomeStackParamList, 'Home'>> = ({
  navigation,
}) => {
  const [color, setColor] = useState('1D82DC');
  const [userEmail, setUserEmail] = useState('');
  const [userName, setUserName] = useState('');
  const [userID, setUserID] = useState('');
  const [userAttributeKey, setUserAttributeKey] = useState('');
  const [userAttributeValue, setUserAttributeValue] = useState('');
  const [userData, setUserData] = useState('')
  const [userEvent, setUserEvent] = useState('')
  const [tag, setTag] = useState('')
  const [instabugLogLevel, setInstabugLogLevel] = useState<'verbose' | 'debug' | 'info' | 'warn' | 'error'>('debug');
  const [instabugLog, setInstabugLog] = useState('')
  const [featureFlagName, setFeatureFlagName] = useState('');
  const [featureFlagVariant, setfeatureFlagVariant] = useState('');
  const [isUserStepEnabled, setIsUserStepEnabled] = useState<boolean>(true);
  const [isSessionProfilerEnabled, setIsSessionProfilerEnabled] = useState<boolean>(true);

  const toast = useToast();
  const [userAttributesFormError, setUserAttributesFormError] = useState<any>({});
  const [userDataFormError, setUserDataFormError] = useState<any>({})
  const [userEventFormError, setUserEventFormError] = useState<any>({})
  const [tagFormError, setTagFormError] = useState<any>({})
  const [featureFlagFormError, setFeatureFlagFormError] = useState<any>({});
  const { addItem } = useCallbackHandlers();

  const validateUserAttributeForm = () => {
    const errors: any = {};
    if (userAttributeValue.length === 0) {
      errors.userAttributeValue = 'Value is required';
    }
    if (userAttributeKey.length === 0) {
      errors.userAttributeKey = 'Key is required';
    }
    setUserAttributesFormError(errors);
    return Object.keys(errors).length === 0;
  };
  const validateUserDataForm = () => {
    const errors: any = {};
    if (userData.length === 0) {
      errors.userDataValue = 'Value is required';
    }
    setUserDataFormError(errors);
    return Object.keys(errors).length === 0;
  };
  const validateUserEventForm = () => {
    const errors: any = {};
    if (userData.length === 0) {
      errors.userEventValue = 'Value is required';
    }
    setUserEventFormError(errors);
    return Object.keys(errors).length === 0;
  };
  const validateTagForm = () => {
    const errors: any = {};
    if (userData.length === 0) {
      errors.tagValue = 'Value is required';
    }
    setTagFormError(errors);
    return Object.keys(errors).length === 0;
  };
  const validateFeatureFlagForm = () => {
    const errors: any = {};
    if (featureFlagName.length === 0) {
      errors.featureFlagName = 'Value is required';
    }

    setFeatureFlagFormError(errors);
    return Object.keys(errors).length === 0;
  };

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

  const clearUserAttributes = () => {
    Instabug.clearAllUserAttributes();
    toast.show({
      description: 'User Attributes cleared successfully',
    });
  };

  const saveUserAttributes = () => {
    if (validateUserAttributeForm()) {
      Instabug.setUserAttribute(userAttributeKey, userAttributeValue);
      toast.show({
        description: 'User Attributes added successfully',
      });
      setUserAttributeKey('');
      setUserAttributeValue('');
    }
  };

  const saveUserData = () => {
    if (validateUserDataForm()) {
      Instabug.setUserData(userData);
      toast.show({
        description: 'User Data added successfully',
      });
      setUserData('')
    }
  };
  const saveUserEvent = () => {
    if (validateUserEventForm()) {
      Instabug.logUserEvent(userEvent);
      toast.show({
        description: 'User Event added successfully',
      });
      setUserData('')
    }
  };
  const saveTag = () => {
    if (validateTagForm()) {
      Instabug.appendTags([tag])
      toast.show({
        description: 'Tag added successfully',
      });
      setTag('')
    }
  };
  
  const saveFeatureFlags = () => {
    if (validateFeatureFlagForm()) {
      Instabug.addFeatureFlag({
        name: featureFlagName,
        variant: featureFlagVariant,
      });
      toast.show({
        description: 'Feature Flag added successfully',
      });
      setFeatureFlagName('');
      setfeatureFlagVariant('');
    }
  };
  const removeFeatureFlags = () => {
    if (validateFeatureFlagForm()) {
      Instabug.removeFeatureFlag(featureFlagName);
      toast.show({
        description: 'Feature Flag removed successfully',
      });
      setFeatureFlagName('');
      setfeatureFlagVariant('');
    }
  };
  const removeAllFeatureFlags = () => {
    Instabug.removeAllFeatureFlags();
    toast.show({
      description: 'Feature Flags removed successfully',
    });
    setFeatureFlagName('');
    setfeatureFlagVariant('');
  };

  const logout = () => {
    Instabug.logOut();
    toast.show({
      description: 'User logout successfully',
    });
    setUserID('');
    setUserName('');
    setUserEmail('');
  };

  const identifyUser = () => {
    Instabug.identifyUser(userEmail, userName, userID);
    setUserID('');
    setUserName('');
    setUserEmail('');
    toast.show({
      description: 'User identified successfully',
    });
  };
  const logToInstabug = () => {
    if (!instabugLog.trim()) {
      toast.show({ description: 'Please enter a log message' });
      return;
    }
  
    switch (instabugLogLevel) {
      case 'verbose':
        Instabug.logVerbose(instabugLog);
        break;
      case 'debug':
        Instabug.logDebug(instabugLog);
        break;
      case 'info':
        Instabug.logInfo(instabugLog);
        break;
      case 'warn':
        Instabug.logWarn(instabugLog);
        break;
      case 'error':
        Instabug.logError(instabugLog);
        break;
    }
  
    toast.show({ description: `Logged ${instabugLogLevel} message` });
    setInstabugLog('');
  };
  

  return (
    <ScrollView>
      <Screen>
        <ListTile title="Invocation Event">
          <Select
            label="Select Invocation Event"
            items={[
              {
                label: 'None',
                value: InvocationEvent.none,
              },
              {
                label: 'Shake',
                value: InvocationEvent.shake,
              },
              {
                label: 'Screenshot',
                value: InvocationEvent.screenshot,
              },
              {
                label: 'Two fingers swipe left',
                value: InvocationEvent.twoFingersSwipe,
              },
              {
                label: 'Floating button',
                value: InvocationEvent.floatingButton,
                isInitial: true,
              },
            ]}
            onValueChange={(value) => {
              BugReporting.setInvocationEvents([value]);
            }}
          />
        </ListTile>

        <ListTile title="Primary Color">
          <InputGroup>
            <InputLeftAddon>#</InputLeftAddon>
            <InputField
              value={color}
              maxLength={6}
              accessibilityLabel="Primary Color Value"
              onChangeText={(value) => {
                setColor(value);
                if (/^[0-9A-F]{6}$/i.test(value)) {
                  Instabug.setPrimaryColor(`#${value}`);
                }
              }}
            />
          </InputGroup>
        </ListTile>
        <ListTile
          title="User Steps"
          subtitle={isUserStepEnabled ? 'Enabled' : 'Disabled'}
          onPress={() => {
            navigation.navigate('UserStepsState', {
              state: isUserStepEnabled ? UserStepsState.Enabled : UserStepsState.Disabled,
              setState: (newState: UserStepsState) => {
                const isEnabled = newState === UserStepsState.Enabled;
                setIsUserStepEnabled(isEnabled);
                Instabug.setTrackUserSteps(isEnabled);
                navigation.goBack();
              },
            });
          }}
          testID="id_user_steps_state"
        />
        <ListTile title="Theme">
          <Select
            label="Select Theme"
            items={[
              {
                label: 'Light',
                value: ColorTheme.light,
              },
              {
                label: 'Dark',
                value: ColorTheme.dark,
              },
            ]}
            onValueChange={Instabug.setColorTheme}
          />
        </ListTile>
        <ListTile
          title="Change Locale to Arabic"
          onPress={() => {
            Instabug.setLocale(Locale.arabic);
          }}
        />
        <ListTile
          title="Disable Repro Steps"
          onPress={() => {
            Instabug.setReproStepsConfig({
              all: ReproStepsMode.disabled,
            });
          }}
        />
        <ListTile
          title="Add Experiments"
          onPress={() => {
            Instabug.addExperiments(['exp1', 'exp2']);
          }}
        />
        <ListTile
          title="Remove Experiments"
          onPress={() => {
            Instabug.removeExperiments(['exp1', 'exp2']);
          }}
        />
            
            <ListTile
          title="Session Profiler"
          subtitle={isSessionProfilerEnabled ? 'Enabled' : 'Disabled'}
          onPress={() => {
            navigation.navigate('SessionProfiler', {
              isEnabled: isSessionProfilerEnabled,
              setIsEnabled: (enabled: boolean) => {
                setIsSessionProfilerEnabled(enabled);
                Instabug.setSessionProfilerEnabled(enabled);
                navigation.goBack();
              },
            });
          }}
          testID="id_session_profiler"
        />

        <ListTile
          title="Welcome message Beta"
          onPress={() => Instabug.showWelcomeMessage(WelcomeMessageMode.beta)}
        />
        <ListTile
          title="Welcome message Live"
          onPress={() => Instabug.showWelcomeMessage(WelcomeMessageMode.live)}
        />

        <VerticalListTile title="User Identification">
          <VStack>
            <View style={styles.formContainer}>
              <View style={styles.inputWrapper}>
                <InputField
                  placeholder="User Email"
                  keyboardType="email-address"
                  onChangeText={(name) => setUserEmail(name)}
                  value={userEmail}
                />
              </View>
              <View style={styles.inputWrapper}>
                <InputField
                  placeholder=" user name"
                  onChangeText={(name) => setUserName(name)}
                  value={userName}
                />
              </View>
              <View style={styles.inputWrapper}>
                <InputField
                  placeholder=" user id"
                  onChangeText={(name) => setUserID(name)}
                  value={userID}
                />
              </View>
            </View>
            <Button mt="4" onPress={identifyUser}>
              Identify user
            </Button>

            <Button mt="4" colorScheme="red" onPress={logout}>
              Logout user
            </Button>
          </VStack>
        </VerticalListTile>
        <VerticalListTile title="User Attributes">
          <VStack>
            <View style={styles.formContainer}>
              <View style={styles.inputWrapper}>
                <InputField
                  placeholder="User attribute key"
                  onChangeText={(key) => setUserAttributeKey(key)}
                  value={userAttributeKey}
                  errorText={userAttributesFormError.userAttributeKey}
                />
              </View>
              <View style={styles.inputWrapper}>
                <InputField
                  placeholder="User attribute value"
                  onChangeText={(value) => setUserAttributeValue(value)}
                  value={userAttributeValue}
                  errorText={userAttributesFormError.userAttributeValue}
                />
              </View>
            </View>

            <Button mt="4" onPress={saveUserAttributes}>
              Save user attributes
            </Button>

            <Button mt="4" colorScheme="red" onPress={clearUserAttributes}>
              Clear user attributes
            </Button>
          </VStack>
        </VerticalListTile>
        <VerticalListTile title="User Data">
          <VStack>
            <View style={styles.formContainer}>
              <View style={styles.inputWrapper}>
                <InputField
                  placeholder="User data"
                  onChangeText={(userData) => setUserData(userData)}
                  value={userData}
                  errorText={userDataFormError.userDataValue}
                />
              </View>
            </View>

            <Button mt="4" onPress={saveUserData}>
              Save user data
            </Button>
          </VStack>
        </VerticalListTile>
        <VerticalListTile title="User Event">
          <VStack>
            <View style={styles.formContainer}>
              <View style={styles.inputWrapper}>
                <InputField
                  placeholder="User event"
                  onChangeText={(userEvent) => setUserEvent(userEvent)}
                  value={userEvent}
                  errorText={userEventFormError.userEventValue}
                />
              </View>
            </View>

            <Button mt="4" onPress={saveUserEvent}>
              Save user event
            </Button>
          </VStack>
        </VerticalListTile>
        <VerticalListTile title="Tags">
          <VStack>
            <View style={styles.formContainer}>
              <View style={styles.inputWrapper}>
                <InputField
                  placeholder="tag"
                  onChangeText={(tag) => setTag(tag)}
                  value={tag}
                  errorText={tagFormError.tagValue}
                />
              </View>
            </View>

            <Button mt="4" onPress={saveTag}>
              Save tag
            </Button>
          </VStack>
        </VerticalListTile>
        <VerticalListTile title="Support varient">
          <VStack>
            <View style={styles.formContainer}>
              <View style={styles.inputWrapper}>
                <InputField
                  placeholder="FeatureFlag name"
                  onChangeText={(key) => setFeatureFlagName(key)}
                  value={featureFlagName}
                  errorText={featureFlagFormError.featureFlagName}
                />
              </View>
              <View style={styles.inputWrapper}>
                <InputField
                  placeholder="Feature Flag varient"
                  onChangeText={(value) => setfeatureFlagVariant(value)}
                  value={featureFlagVariant}
                />
              </View>
            </View>

            <Button mt="4" onPress={saveFeatureFlags}>
              Save Feature flag
            </Button>

            <Button mt="4" colorScheme="red" onPress={removeFeatureFlags}>
              remove Feature Flag
            </Button>
            <Button mt="4" colorScheme="red" onPress={removeAllFeatureFlags}>
              remove all Feature Flag
            </Button>
          </VStack>
        </VerticalListTile>

        <VerticalListTile title="Report submit Handler">
          <VStack>
            <ListTile
              testID="enable_report_submit_handler"
              title="Enable Report submit Callback Handler"
              onPress={() =>
                Instabug.onReportSubmitHandler(function (report) {
                  addItem('onReportSubmitHandler', {
                    id: `event-${Math.random()}`,
                    fields: [
                      { key: 'Date', value: new Date().toLocaleString() },
                      { key: 'userData', value: report.userAttributes.toString() },
                      { key: 'tags', value: report.tags.toString() },
                      { key: 'console Logs', value: report.consoleLogs.toString() },
                      { key: 'file Attachments', value: report.fileAttachments.toString() },
                      { key: 'Instabug Logs', value: report.instabugLogs.toString() },
                    ],
                  });

                  report.logDebug('debug message from on report submit handler');
                  report.logVerbose('on report submit handler callback is triggered');
                  report.logWarn('warning message from on report submit handler');
                  report.logInfo('info message from on report submit handler');
                  report.logError('error message from on report submit handler');
                })
              }
            />

            <ListTile
              testID="disable_report_submit_handler"
              title="Disable Report submit Callback Handler"
              onPress={() => Instabug.onReportSubmitHandler(function () {})}
            />

            <ListTile
              testID="crashing_report_submit_handler"
              title="Crashing Report submit Callback Handler"
              onPress={() =>
                Instabug.onReportSubmitHandler(function (report) {
                  addItem('onReportSubmitHandler', {
                    id: `event-${Math.random()}`,
                    fields: [
                      { key: 'Date', value: new Date().toLocaleString() },
                      { key: 'userData', value: report.userAttributes.toString() },
                      { key: 'tags', value: report.tags.toString() },
                      { key: 'console Logs', value: report.consoleLogs.toString() },
                      { key: 'file Attachments', value: report.fileAttachments.toString() },
                      { key: 'Instabug Logs', value: report.instabugLogs.toString() },
                    ],
                  });

                  report.logDebug('debug message from on report submit handler');
                  report.logVerbose('on report submit handler callback is triggered');
                  report.logWarn('warning message from on report submit handler');
                  report.logInfo('info message from on report submit handler');
                  report.logError('error message from on report submit handler');

                  throw new Error('report submit handler callback is triggered');
                })
              }
            />
          </VStack>
        </VerticalListTile>
        <VerticalListTile title="Instabug Logs">
          <VStack>
            <Select
              label="Select Log Level"
              items={[
                { label: 'Verbose', value: 'verbose' },
                { label: 'Debug', value: 'debug' },
                { label: 'Info', value: 'info' },
                { label: 'Warn', value: 'warn' },
                { label: 'Error', value: 'error' },
              ]}
              onValueChange={(value) => setInstabugLogLevel(value as any)}
            />

            <View style={styles.formContainer}>
              <View style={styles.inputWrapper}>
                <InputField
                  placeholder="Enter log message"
                  onChangeText={(text) => setInstabugLog(text)}
                  value={instabugLog}
                />
              </View>
            </View>

            <Button mt="4" onPress={logToInstabug}>
              Log Message
            </Button>
          </VStack>
        </VerticalListTile>
      </Screen>
    </ScrollView>
  );
};
