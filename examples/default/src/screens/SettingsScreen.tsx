import React, { useState } from 'react';

import Instabug, { BugReporting, ColorTheme, InvocationEvent } from 'instabug-reactnative';
import { InputGroup, InputLeftAddon, useToast, VStack, Button } from 'native-base';

import { ListTile } from '../components/ListTile';
import { Screen } from '../components/Screen';
import { Select } from '../components/Select';
import { StyleSheet, View, ScrollView } from 'react-native';
import { VerticalListTile } from '../components/VerticalListTile';
import { InputField } from '../components/InputField';

export const SettingsScreen: React.FC = () => {
  const [color, setColor] = useState('1D82DC');
  const [userEmail, setUserEmail] = useState('');
  const [userName, setUserName] = useState('');
  const [userID, setUserID] = useState('');
  const [userAttributeKey, setUserAttributeKey] = useState('');
  const [userAttributeValue, setUserAttributeValue] = useState('');
  const [featureFlagName, setFeatureFlagName] = useState('');
  const [featureFlagVariant, setfeatureFlagVariant] = useState('');

  const toast = useToast();
  const [userAttributesFormError, setUserAttributesFormError] = useState<any>({});
  const [featureFlagFormError, setFeatureFlagFormError] = useState<any>({});

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
      </Screen>
    </ScrollView>
  );
};
