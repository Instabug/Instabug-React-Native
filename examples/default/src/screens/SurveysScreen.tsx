import React from 'react';

import { Surveys } from 'instabug-reactnative';

import { ListTile } from '../components/ListTile';
import { Screen } from '../components/Screen';

export const SurveysScreen: React.FC = () => {
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
      <ListTile title="Show Custom Survey" onPress={() => Surveys.switchTheUpdatingThread()} />
    </Screen>
  );
};
