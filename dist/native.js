import { NativeModules as ReactNativeModules, } from 'react-native';
export const NativeModules = ReactNativeModules;
export const NativeAPM = NativeModules.IBGAPM;
export const NativeBugReporting = NativeModules.IBGBugReporting;
export const NativeCrashReporting = NativeModules.IBGCrashReporting;
export const NativeFeatureRequests = NativeModules.IBGFeatureRequests;
export const NativeInstabug = NativeModules.Instabug;
export const NativeReplies = NativeModules.IBGReplies;
export const NativeSurveys = NativeModules.IBGSurveys;
