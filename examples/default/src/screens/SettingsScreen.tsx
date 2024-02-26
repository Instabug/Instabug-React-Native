import React, { useState } from 'react';

import Instabug, { BugReporting, ColorTheme, InvocationEvent } from 'instabug-reactnative';
import { Input, InputGroup, InputLeftAddon, useToast, VStack, Button, Text } from 'native-base';

import { ListTile } from '../components/ListTile';
import { Screen } from '../components/Screen';
import { Select } from '../components/Select';
import { StyleSheet, View } from 'react-native';
import { VerticalListTile } from '../components/VerticalListTile';

export const SettingsScreen: React.FC = () => {
  const [color, setColor] = useState('1D82DC');
  const [userEmail, setUserEmail] = useState('');
  const [userName, setUserName] = useState('');
  const [userID, setUserID] = useState('');
  const [userAttributeKey, setUserAttributeKey] = useState('');
  const [userAttributeValue, setUserAttributeValue] = useState('');
  const toast = useToast();
  const [userAttributesFormError, setUserAttributesFormError] = useState<any>({});

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
  const styles = StyleSheet.create({
    inputWrapper: {
      padding: 4,
      flex: 1,
    },
    errorText: {
      color: '#ff0000',
    },
    formContainer: {
      flexDirection: 'row',
      alignItems: 'stretch',
    },
  });

  return (
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
          <Input
            value={color}
            maxLength={6}
            flex={1}
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
              <Input
                placeholder="User Email"
                keyboardType="email-address"
                onChangeText={(name) => setUserEmail(name)}
                defaultValue={userEmail}
              />
            </View>
            <View style={styles.inputWrapper}>
              <Input
                placeholder=" user name"
                onChangeText={(name) => setUserName(name)}
                defaultValue={userName}
              />
            </View>
            <View style={styles.inputWrapper}>
              <Input
                placeholder=" user id"
                onChangeText={(name) => setUserID(name)}
                defaultValue={userID}
              />
            </View>
          </View>
          <Button
            mt="4"
            onPress={() => {
              Instabug.identifyUser(userEmail, userName, userID);
              setUserID('');
              setUserName('');
              setUserEmail('');
              toast.show({
                description: 'User identified successfully',
              });
            }}>
            Identify user
          </Button>

          <Button
            mt="4"
            colorScheme="red"
            onPress={() => {
              Instabug.logOut();
              toast.show({
                description: 'User logout successfully',
              });
              setUserID('');
              setUserName('');
              setUserEmail('');
            }}>
            Logout user
          </Button>
        </VStack>
      </VerticalListTile>
      <VerticalListTile title="User Attributes">
        <VStack>
          <View style={styles.formContainer}>
            <View style={styles.inputWrapper}>
              <Input
                placeholder="User attribute key"
                onChangeText={(key) => setUserAttributeKey(key)}
                defaultValue={userAttributeKey}
              />
              {userAttributesFormError.userAttributeKey ? (
                <Text style={styles.errorText}>{userAttributesFormError.userAttributeKey}</Text>
              ) : null}
            </View>
            <View style={styles.inputWrapper}>
              <Input
                placeholder="User attribute value"
                onChangeText={(value) => setUserAttributeValue(value)}
                defaultValue={userAttributeValue}
              />
              {userAttributesFormError.userAttributeValue ? (
                <Text style={styles.errorText}>{userAttributesFormError.userAttributeValue}</Text>
              ) : null}
            </View>
          </View>

          <Button
            mt="4"
            onPress={() => {
              if (validateUserAttributeForm()) {
                Instabug.setUserAttribute(userAttributeKey, userAttributeValue);
                toast.show({
                  description: 'User Attributes added successfully',
                });
                setUserAttributeKey('');
                setUserAttributeValue('');
              }
            }}>
            Save user attributes
          </Button>

          <Button
            mt="4"
            colorScheme="red"
            onPress={() => {
              Instabug.clearAllUserAttributes();
              toast.show({
                description: 'User Attributes cleared successfully',
              });
            }}>
            Clear user attributes
          </Button>
        </VStack>
      </VerticalListTile>
    </Screen>
  );
};
