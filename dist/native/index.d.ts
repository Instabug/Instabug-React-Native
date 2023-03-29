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
export declare const NativeModules: InstabugNativePackage;
export declare const NativeAPM: ApmNativeModule;
export declare const NativeBugReporting: BugReportingNativeModule;
export declare const NativeCrashReporting: CrashReportingNativeModule;
export declare const NativeFeatureRequests: FeatureRequestsNativeModule;
export declare const NativeInstabug: InstabugNativeModule;
export declare const NativeReplies: RepliesNativeModule;
export declare const NativeSurveys: SurveysNativeModule;
