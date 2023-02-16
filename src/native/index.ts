import {
  NativeModule as ReactNativeModule,
  NativeModules as ReactNativeModules,
} from 'react-native';

import type { ApmNativeModule } from './ApmNativeModule';
import type { BugReportingNativeModule } from './BugReportingNativeModule';
import type { CrashReportingNativeModule } from './CrashReportingNativeModule';
import type { FeatureRequestsNativeModule } from './FeatureRequestsNativeModule';
import type { InstabugNativeModule } from './InstabugNativeModule';

export interface NativeModule extends ReactNativeModule, Record<string, any> {
  getConstants: () => Record<string, any>;
}

interface InstabugNativeModules {
  IBGAPM: ApmNativeModule;
  IBGBugReporting: BugReportingNativeModule;
  IBGCrashReporting: CrashReportingNativeModule;
  IBGFeatureRequests: FeatureRequestsNativeModule;
  Instabug: InstabugNativeModule;
  IBGReplies: NativeModule;
  IBGSurveys: NativeModule;
}

export const NativeModules = ReactNativeModules as InstabugNativeModules;

export const NativeAPM = NativeModules.IBGAPM;
export const NativeBugReporting = NativeModules.IBGBugReporting;
export const NativeCrashReporting = NativeModules.IBGCrashReporting;
export const NativeFeatureRequests = NativeModules.IBGFeatureRequests;
export const NativeInstabug = NativeModules.Instabug;
export const NativeReplies = NativeModules.IBGReplies;
export const NativeSurveys = NativeModules.IBGSurveys;
