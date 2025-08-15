import React from 'react';

import { ListTile } from '../../components/ListTile';
import { Screen } from '../../components/Screen';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { HomeStackParamList } from '../../navigation/HomeStack';
import { ReportType } from 'instabug-reactnative';

export interface BugReportingTypesScreenProp {
  selectedTypes: ReportType[];
  setSelectedTypes: (types: ReportType[]) => void;
}

export const BugReportingTypesScreen: React.FC<
  NativeStackScreenProps<HomeStackParamList, 'BugReportingTypes'>
> = ({ route }) => {
  const { selectedTypes, setSelectedTypes } = route.params;

  const isSelected = (types: ReportType[]) => {
    return (
      types.length === selectedTypes.length && types.every((type) => selectedTypes.includes(type))
    );
  };

  return (
    <Screen>
      <ListTile
        title="Bug Only"
        testID="id_bug_only"
        onPress={() => setSelectedTypes([ReportType.bug])}
        subtitle={isSelected([ReportType.bug]) ? 'Selected' : undefined}
      />
      <ListTile
        title="Feedback Only"
        testID="id_feedback_only"
        onPress={() => setSelectedTypes([ReportType.feedback])}
        subtitle={isSelected([ReportType.feedback]) ? 'Selected' : undefined}
      />
      <ListTile
        title="Question Only"
        testID="id_question_only"
        onPress={() => setSelectedTypes([ReportType.question])}
        subtitle={isSelected([ReportType.question]) ? 'Selected' : undefined}
      />
      <ListTile
        title="Bug, and Question"
        testID="id_bug_question"
        onPress={() => setSelectedTypes([ReportType.bug, ReportType.question])}
        subtitle={isSelected([ReportType.bug, ReportType.question]) ? 'Selected' : undefined}
      />
      <ListTile
        title="All"
        testID="id_all"
        onPress={() => setSelectedTypes([ReportType.bug, ReportType.feedback, ReportType.question])}
        subtitle={
          isSelected([ReportType.bug, ReportType.feedback, ReportType.question])
            ? 'Selected'
            : undefined
        }
      />
    </Screen>
  );
};
