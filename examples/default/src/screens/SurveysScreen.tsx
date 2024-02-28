import React, { useState } from 'react';

import { Surveys } from 'instabug-reactnative';

import { ListTile } from '../components/ListTile';
import { Screen } from '../components/Screen';
import { VerticalListTile } from '../components/VerticalListTile';
import { Button, Input, Text, useToast, VStack } from 'native-base';
import { StyleSheet, View } from 'react-native';

export const SurveysScreen: React.FC = () => {
  const [surveyToken, setSurveyToken] = useState('');
  const toast = useToast();
  const [userAttributesFormError, setUserAttributesFormError] = useState<any>({});

  const validateUserAttributeForm = () => {
    const errors: any = {};
    if (surveyToken.length === 0) {
      errors.surveyToken = 'Value is required';
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

  const checkIfUserHasResponded = async () => {
    if (validateUserAttributeForm()) {
      const hasResponded = await Surveys.hasRespondedToSurvey(surveyToken);
      toast.show({
        description: hasResponded ? 'YES' : 'NO',
      });
    }
  };

  const showSurveyWithToken = () => {
    if (validateUserAttributeForm()) {
      Surveys.showSurvey(surveyToken);
    }
  };

  return (
    <Screen>
      <ListTile
        title="Show NPS Survey"
        onPress={() => Surveys.showSurvey('KWjV8MqOm5HrsU5IKXxAmQ')}
      />
      <ListTile
        title="Show Custom Survey"
        onPress={() => Surveys.showSurvey('6ZaEI4nVdjg19r5uekS5nw')}
      />

      <VerticalListTile title="Survey token actions">
        <VStack>
          <View style={styles.formContainer}>
            <View style={styles.inputWrapper}>
              <Input
                placeholder="Survey token"
                onChangeText={(key) => setSurveyToken(key)}
                defaultValue={surveyToken}
              />
              {userAttributesFormError.surveyToken ? (
                <Text style={styles.errorText}>{userAttributesFormError.surveyToken}</Text>
              ) : null}
            </View>
          </View>

          <Button mt="4" onPress={showSurveyWithToken}>
            Show survey
          </Button>

          <Button mt="4" onPress={checkIfUserHasResponded}>
            If User has responded survey
          </Button>
        </VStack>
      </VerticalListTile>
    </Screen>
  );
};
