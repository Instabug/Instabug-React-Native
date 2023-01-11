import { NativeModule as ReactNativeModule } from 'react-native';
export interface NativeModule extends ReactNativeModule, Record<string, any> {
}
interface InstabugNativeModules {
    IBGAPM: NativeModule;
    IBGBugReporting: NativeModule;
    IBGCrashReporting: NativeModule;
    IBGFeatureRequests: NativeModule;
    Instabug: NativeModule;
    IBGReplies: NativeModule;
    IBGSurveys: NativeModule;
}
export declare const NativeModules: InstabugNativeModules;
export declare const NativeAPM: NativeModule;
export declare const NativeBugReporting: NativeModule;
export declare const NativeCrashReporting: NativeModule;
export declare const NativeFeatureRequests: NativeModule;
export declare const NativeInstabug: NativeModule;
export declare const NativeReplies: NativeModule;
export declare const NativeSurveys: NativeModule;
export {};
