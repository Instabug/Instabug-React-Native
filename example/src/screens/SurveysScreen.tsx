import React from 'react';

import { Surveys } from 'instabug-reactnative';

import { Button } from '../components/Button';
import { Screen } from '../components/Screen';

export const SurveysScreen: React.FC = () => {
  return (
    <Screen>
      <Button onPress={() => Surveys.showSurvey('CHUJHGRx8s1qPcCSs85kFA')}>Show NPS Survey</Button>
      <Button onPress={() => Surveys.showSurvey('95s5cjU1i74m23h0M9t_Sg')}>
        Show Multiple Question Survey
      </Button>
    </Screen>
  );
};
