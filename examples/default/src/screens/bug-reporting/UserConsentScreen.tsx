import React, { useState } from 'react';
import { ScrollView, StyleSheet, View, Text, Alert } from 'react-native';
import { BugReporting, userConsentActionType } from 'instabug-reactnative';
import { Screen } from '../../components/Screen';
import { Section } from '../../components/Section';
import { Button, VStack } from 'native-base';
import { InputField } from '../../components/InputField';
import { Select } from '../../components/Select';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { HomeStackParamList } from '../../navigation/HomeStack';

const styles = StyleSheet.create({
  inputWrapper: {
    padding: 4,
    flex: 1,
  },
  inputTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    color: 'black',
    paddingLeft: 4,
    paddingBottom: 4,
  },
});

export const UserConsentScreen: React.FC<
  NativeStackScreenProps<HomeStackParamList, 'UserConsent'>
> = ({ navigation }) => {
  const [key, setKey] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [mandatory, setMandatory] = useState<boolean>(false);
  const [checked, setChecked] = useState<boolean>(false);
  const [actionType, setActionType] = useState<userConsentActionType | undefined>(undefined);

  const handleSubmit = () => {
    BugReporting.addUserConsent(key, description, mandatory, checked, actionType);
    Alert.alert('User Consent Added', 'User consent added successfully');
    navigation.goBack();
  };

  return (
    <ScrollView>
      <Screen>
        <Section title="User Consent">
          <VStack>
            <View style={styles.inputWrapper}>
              <Text style={styles.inputTitle}>Key</Text>
              <InputField
                placeholder="Key"
                onChangeText={setKey}
                value={key}
                testID="id_consent_key"
                accessibilityLabel="id_consent_key"
              />
            </View>
            <View style={styles.inputWrapper}>
              <Text style={styles.inputTitle}>Description</Text>
              <InputField
                placeholder="Description"
                onChangeText={setDescription}
                value={description}
                testID="id_consent_description"
                accessibilityLabel="id_consent_description"
              />
            </View>
            <View style={styles.inputWrapper}>
              <Text style={styles.inputTitle}>Mandatory</Text>
              <Select
                label="Mandatory"
                testID="id_consent_mandatory"
                items={[
                  {
                    label: 'Yes',
                    value: 'true',
                    isInitial: true,
                    testID: 'id_consent_mandatory_yes',
                  },
                  {
                    label: 'No',
                    value: 'false',
                    testID: 'id_consent_mandatory_no',
                  },
                ]}
                onValueChange={(value) => setMandatory(value === 'true')}
              />
            </View>
            <View style={styles.inputWrapper}>
              <Text style={styles.inputTitle}>Checked</Text>
              <Select
                label="Checked"
                testID="id_consent_checked"
                items={[
                  {
                    label: 'Yes',
                    value: 'true',
                    isInitial: true,
                    testID: 'id_consent_checked_yes',
                  },
                  {
                    label: 'No',
                    value: 'false',
                    testID: 'id_consent_checked_no',
                  },
                ]}
                onValueChange={(value) => setChecked(value === 'true')}
              />
            </View>
            <View style={styles.inputWrapper}>
              <Text style={styles.inputTitle}>Action Type</Text>
              <Select
                label="Action Type"
                testID="id_consent_action_type"
                items={[
                  {
                    value: userConsentActionType.dropAutoCapturedMedia,
                    label: 'Drop Auto Captured Media',
                    testID: 'id_consent_action_type_dropAutoCapturedMedia',
                  },
                  {
                    value: userConsentActionType.dropLogs,
                    label: 'Drop Logs',
                    testID: 'id_consent_action_type_dropLogs',
                  },
                  {
                    value: userConsentActionType.noChat,
                    label: 'No Chat',
                    testID: 'id_consent_action_type_noChat',
                  },
                  {
                    value: undefined,
                    label: 'None',
                    testID: 'id_consent_action_type_none',
                    isInitial: true,
                  },
                ]}
                onValueChange={setActionType}
              />
            </View>
            <Button
              mt="4"
              onPress={handleSubmit}
              testID="id_submit_consent"
              accessibilityLabel="id_submit_consent">
              Add User Consent
            </Button>
          </VStack>
        </Section>
      </Screen>
    </ScrollView>
  );
};
