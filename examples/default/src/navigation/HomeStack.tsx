import React from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { BugReportingScreen } from '../screens/BugReportingScreen';
import { CrashReportingScreen } from '../screens/CrashReportingScreen';
import { FeatureRequestsScreen } from '../screens/FeatureRequestsScreen';
import { HomeScreen } from '../screens/HomeScreen';
import { RepliesScreen } from '../screens/RepliesScreen';
import { SurveysScreen } from '../screens/SurveysScreen';

export type HomeStackParamList = {
  Home: undefined;
  BugReporting: undefined;
  CrashReporting: undefined;
  FeatureRequests: undefined;
  Replies: undefined;
  Surveys: undefined;
};

const HomeStack = createNativeStackNavigator<HomeStackParamList>();

export const HomeStackNavigator: React.FC = () => {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen name="Home" component={HomeScreen} />
      <HomeStack.Screen
        name="BugReporting"
        component={BugReportingScreen}
        options={{ title: 'Bug Reporting' }}
      />
      <HomeStack.Screen
        name="CrashReporting"
        component={CrashReportingScreen}
        options={{ title: 'Crash Reporting' }}
      />
      <HomeStack.Screen
        name="FeatureRequests"
        component={FeatureRequestsScreen}
        options={{ title: 'Feature Requests' }}
      />
      <HomeStack.Screen name="Replies" component={RepliesScreen} />
      <HomeStack.Screen name="Surveys" component={SurveysScreen} />
    </HomeStack.Navigator>
  );
};
