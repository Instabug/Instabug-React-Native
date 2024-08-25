import React from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { BugReportingScreen } from '../screens/BugReportingScreen';
import { CrashReportingScreen } from '../screens/CrashReportingScreen';
import { FeatureRequestsScreen } from '../screens/FeatureRequestsScreen';
import { HomeScreen } from '../screens/HomeScreen';
import { RepliesScreen } from '../screens/RepliesScreen';
import { SurveysScreen } from '../screens/SurveysScreen';
import { UserStepsScreen } from '../screens/user-steps/UserStepsScreen';
import { BasicComponentsScreen } from '../screens/user-steps/BasicComponentsScreen';
import { ScrollViewScreen } from '../screens/user-steps/ScrollViewScreen';
import { FlatListScreen } from '../screens/user-steps/FlatListScreen';
import { ComplexViewsScreen } from '../screens/user-steps/ComplexViewsScreen';
import { SectionListScreen } from '../screens/user-steps/SectionListScreen';
import { GesturesScreen } from '../screens/user-steps/GesturesScreen';
import {
  BackAndForthScreen,
  type BackAndForthScreenProp,
} from '../screens/user-steps/BackAndForthScreen';
import { GoogleMapsScreen } from '../screens/user-steps/GoogleMapsScreen';
import { LargeImageListScreen } from '../screens/user-steps/LargeImageListScreen';
import { APMScreen } from '../screens/apm/APMScreen';
import { TracesScreen } from '../screens/apm/TracesScreen';
import { NetworkScreen } from '../screens/apm/NetworkScreen';
import { FlowsScreen } from '../screens/apm/FlowsScreen';
import { SessionReplayScreen } from '../screens/SessionReplayScreen';
import { LegacyModeScreen } from '../screens/LegacyModeScreen';
import { HttpScreen } from '../screens/apm/HttpScreen';



export type HomeStackParamList = {
  Home: undefined;
  BugReporting: undefined;
  CrashReporting: undefined;
  FeatureRequests: undefined;
  Replies: undefined;
  Surveys: undefined;
  UserSteps: undefined;
  BasicComponents: undefined;
  ScrollView: undefined;
  FlatList: undefined;
  ComplexViews: undefined;
  SectionList: undefined;
  Gestures: undefined;
  GoogleMapsScreen: undefined;
  LargeImageList: undefined;
  SessionReplay: undefined;
  BackAndForthScreen: BackAndForthScreenProp;
  LegacyMode:undefined;
  HttpScreen:undefined;


  // APM //
  APM: undefined;
  NetworkTraces: undefined;
  ExecutionTraces: undefined;
  AppFlows: undefined;
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
      <HomeStack.Screen
        name="SessionReplay"
        component={SessionReplayScreen}
        options={{ title: 'Session Replay' }}
      />

      <HomeStack.Screen
        name="UserSteps"
        component={UserStepsScreen}
        options={{ title: 'User Steps' }}
      />
      <HomeStack.Screen
        name="GoogleMapsScreen"
        component={GoogleMapsScreen}
        options={{ title: 'Google  Map screen' }}
      />
      <HomeStack.Screen
        name="BasicComponents"
        component={BasicComponentsScreen}
        options={{ title: 'Basic Components' }}
      />
      <HomeStack.Screen
        name="ComplexViews"
        component={ComplexViewsScreen}
        options={{ title: 'Basic Components' }}
      />
      <HomeStack.Screen
        name="ScrollView"
        component={ScrollViewScreen}
        options={{ title: 'Scroll View' }}
      />
      <HomeStack.Screen
        name="FlatList"
        component={FlatListScreen}
        options={{ title: 'Flat List' }}
      />
      <HomeStack.Screen
        name="SectionList"
        component={SectionListScreen}
        options={{ title: 'Section List' }}
      />
      <HomeStack.Screen
        name="BackAndForthScreen"
        component={BackAndForthScreen}
        options={{ title: 'Back And Forth Screen' }}
      />
      <HomeStack.Screen
        name="LargeImageList"
        component={LargeImageListScreen}
        options={{ title: 'Large Image List' }}
      />
      <HomeStack.Screen name="Gestures" component={GesturesScreen} />
      <HomeStack.Screen name="APM" component={APMScreen} />
      <HomeStack.Screen name="NetworkTraces" component={NetworkScreen} />
      <HomeStack.Screen name="ExecutionTraces" component={TracesScreen} />
      <HomeStack.Screen name="AppFlows" component={FlowsScreen} />
      <HomeStack.Screen
        name="LegacyMode"
        component={LegacyModeScreen}
        options={{ title: 'LegacyMode' }}
      />
      <HomeStack.Screen
        name="HttpScreen"
        component={HttpScreen}
        options={{ title: 'HTTP' }}
      />
    </HomeStack.Navigator>
  );
};
