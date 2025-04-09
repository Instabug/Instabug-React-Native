import { NativeModules as ReactNativeModules } from 'react-native';

import type { ApmNativeModule } from './NativeAPM';
import type { BugReportingNativeModule } from './NativeBugReporting';
import type { CrashReportingNativeModule } from './NativeCrashReporting';
import type { FeatureRequestsNativeModule } from './NativeFeatureRequests';
import type { InstabugNativeModule } from './NativeInstabug';
import type { RepliesNativeModule } from './NativeReplies';
import type { SurveysNativeModule } from './NativeSurveys';
import type { SessionReplayNativeModule } from './NativeSessionReplay';
import type { NetworkLoggerNativeModule } from './NativeNetworkLogger';

export interface InstabugNativePackage {
  IBGAPM: ApmNativeModule;
  IBGBugReporting: BugReportingNativeModule;
  IBGCrashReporting: CrashReportingNativeModule;
  IBGFeatureRequests: FeatureRequestsNativeModule;
  Instabug: InstabugNativeModule;
  IBGReplies: RepliesNativeModule;
  IBGSurveys: SurveysNativeModule;
  IBGSessionReplay: SessionReplayNativeModule;
  IBGNetworkLogger: NetworkLoggerNativeModule;
}

export const NativeModules = ReactNativeModules as InstabugNativePackage;
