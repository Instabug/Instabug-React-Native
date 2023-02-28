import { NativeModules as ReactNativeModules } from 'react-native';

import type { ApmNativeModule } from './NativeAPM';
import type { BugReportingNativeModule } from './NativeBugReporting';
import type { CrashReportingNativeModule } from './NativeCrashReporting';
import type { FeatureRequestsNativeModule } from './NativeFeatureRequests';
import type { InstabugNativeModule } from './NativeInstabug';
import type { RepliesNativeModule } from './NativeReplies';
import type { SurveysNativeModule } from './NativeSurveys';

export interface InstabugNativePackage {
  IBGAPM: ApmNativeModule;
  IBGBugReporting: BugReportingNativeModule;
  IBGCrashReporting: CrashReportingNativeModule;
  IBGFeatureRequests: FeatureRequestsNativeModule;
  Instabug: InstabugNativeModule;
  IBGReplies: RepliesNativeModule;
  IBGSurveys: SurveysNativeModule;
}

export const NativeModules = ReactNativeModules as InstabugNativePackage;

// export const NativeBugReporting = NativeModules.IBGBugReporting;
// export const NativeCrashReporting = NativeModules.IBGCrashReporting;
// export const NativeFeatureRequests = NativeModules.IBGFeatureRequests;
// export const NativeInstabug = NativeModules.Instabug;
// export const NativeReplies = NativeModules.IBGReplies;
// export const NativeSurveys = NativeModules.IBGSurveys;
