import { NativeModules as ReactNativeModules } from 'react-native';

import type { ApmNativeModule } from './ApmNativeModule';
import type { BugReportingNativeModule } from './BugReportingNativeModule';
import type { CrashReportingNativeModule } from './CrashReportingNativeModule';
import type { FeatureRequestsNativeModule } from './FeatureRequestsNativeModule';
import type { InstabugNativeModule } from './InstabugNativeModule';
import type { RepliesNativeModule } from './RepliesNativeModule';
import type { SurveysNativeModule } from './SurveysNativeModule';

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

export const NativeAPM = NativeModules.IBGAPM;
export const NativeBugReporting = NativeModules.IBGBugReporting;
export const NativeCrashReporting = NativeModules.IBGCrashReporting;
export const NativeFeatureRequests = NativeModules.IBGFeatureRequests;
export const NativeInstabug = NativeModules.Instabug;
export const NativeReplies = NativeModules.IBGReplies;
export const NativeSurveys = NativeModules.IBGSurveys;
