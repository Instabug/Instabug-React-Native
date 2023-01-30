import React from 'react';

import { Surveys } from 'instabug-reactnative';
import { Button, VStack } from 'native-base';

export const SurveysScreen: React.FC = () => {
  return (
    <VStack alignItems="stretch" padding="8" space="4">
      <Button onPress={() => Surveys.showSurvey('CHUJHGRx8s1qPcCSs85kFA')}>Show NPS Survey</Button>
      <Button onPress={() => Surveys.showSurvey('95s5cjU1i74m23h0M9t_Sg')}>
        Show Multiple Question Survey
      </Button>
    </VStack>
  );
};
