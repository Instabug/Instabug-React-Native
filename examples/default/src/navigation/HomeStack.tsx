import React from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { BugReportingScreen } from '../screens/bug-reporting/BugReportingScreen';
import {
  BugReportingStateScreen,
  type BugReportingStateScreenProp,
} from '../screens/bug-reporting/BugReportingStateScreen';
import {
  ExtendedBugReportStateScreen,
  type ExtendedBugReportStateScreenProp,
} from '../screens/bug-reporting/ExtendedBugReportStateScreen';
import {
  BugReportingTypesScreen,
  type BugReportingTypesScreenProp,
} from '../screens/bug-reporting/BugReportingTypesScreen';
import {
  DisclaimerTextScreen,
  type DisclaimerTextScreenProp,
} from '../screens/bug-reporting/DisclaimerTextScreen';
import {
  InvocationOptionsScreen,
  type InvocationOptionsScreenProp,
} from '../screens/bug-reporting/InvocationOptionsScreen';
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
import { WebViewsScreen } from '../screens/apm/webViews/WebViewsScreen';
import { FullWebViewsScreen } from '../screens/apm/webViews/FullWebViewsScreen';
import { PartialWebViewsScreen } from '../screens/apm/webViews/PartialWebViewsScreen';
import {
  InvocationEventsScreen,
  type InvocationEventsScreenProp,
} from '../screens/bug-reporting/InvocationEventsScreen';
import {
  SessionProfilerScreen,
  type SessionProfilerScreenProp,
} from '../screens/bug-reporting/SessionProfilerScreen';

export type HomeStackParamList = {
  Home: undefined;

  // Bug Reporting //
  BugReporting: undefined;
  BugReportingState: BugReportingStateScreenProp;
  ExtendedBugReportState: ExtendedBugReportStateScreenProp;
  BugReportingTypes: BugReportingTypesScreenProp;
  DisclaimerText: DisclaimerTextScreenProp;
  InvocationEvents: InvocationEventsScreenProp;
  SessionProfiler: SessionProfilerScreenProp;
  InvocationOptions: InvocationOptionsScreenProp;

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
  LegacyMode: undefined;
  HttpScreen: undefined;

  // APM //
  APM: undefined;
  NetworkTraces: undefined;
  ExecutionTraces: undefined;
  AppFlows: undefined;
  WebViews: undefined;
  FullWebViews: undefined;
  PartialWebViews: undefined;
};

const HomeStack = createNativeStackNavigator<HomeStackParamList>();

export const HomeStackNavigator: React.FC = () => {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen name="Home" component={HomeScreen} />

      {/* Bug Reporting */}
      <HomeStack.Screen
        name="BugReporting"
        component={BugReportingScreen}
        options={{ title: 'Bug Reporting' }}
      />
      <HomeStack.Screen
        name="BugReportingState"
        component={BugReportingStateScreen}
        options={{ title: 'Bug Reporting State' }}
      />
      <HomeStack.Screen
        name="ExtendedBugReportState"
        component={ExtendedBugReportStateScreen}
        options={{ title: 'Extended Bug Report State' }}
      />
      <HomeStack.Screen
        name="BugReportingTypes"
        component={BugReportingTypesScreen}
        options={{ title: 'Bug Reporting Types' }}
      />
      <HomeStack.Screen
        name="DisclaimerText"
        component={DisclaimerTextScreen}
        options={{ title: 'Disclaimer Text' }}
      />
      <HomeStack.Screen
        name="InvocationEvents"
        component={InvocationEventsScreen}
        options={{ title: 'Invocation Events' }}
      />
      <HomeStack.Screen
        name="SessionProfiler"
        component={SessionProfilerScreen}
        options={{ title: 'Session Profiler' }}
      />
      <HomeStack.Screen
        name="InvocationOptions"
        component={InvocationOptionsScreen}
        options={{ title: 'Invocation Options' }}
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
      <HomeStack.Screen name="HttpScreen" component={HttpScreen} options={{ title: 'HTTP' }} />
      <HomeStack.Screen
        name="WebViews"
        component={WebViewsScreen}
        options={{ title: 'WebViews' }}
      />
      <HomeStack.Screen
        name="FullWebViews"
        component={FullWebViewsScreen}
        options={{ title: 'FullWebViews' }}
      />
      <HomeStack.Screen
        name="PartialWebViews"
        component={PartialWebViewsScreen}
        options={{ title: 'PartialWebViews' }}
      />
    </HomeStack.Navigator>
  );
};
