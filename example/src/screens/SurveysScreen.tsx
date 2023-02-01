import React from 'react';

import { Surveys } from 'instabug-reactnative';

import { ListTile } from '../components/ListTile';
import { Screen } from '../components/Screen';

export const SurveysScreen: React.FC = () => {
  return (
    <Screen>
      <ListTile
        title="Show NPS Survey"
        onPress={() => Surveys.showSurvey('CHUJHGRx8s1qPcCSs85kFA')}
      />
      <ListTile
        title="Show Multiple Question Survey"
        onPress={() => Surveys.showSurvey('95s5cjU1i74m23h0M9t_Sg')}
      />
    </Screen>
  );
};
