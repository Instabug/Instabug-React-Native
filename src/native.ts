import { NativeModule, NativeModules } from 'react-native';

export interface IbgNativeModule extends NativeModule {
  [key: string]: any;
}

interface IbgNativeModules {
  Instabug: IbgNativeModule;
  IBGAPM: IbgNativeModule;
  IBGBugReporting: IbgNativeModule;
  IBGFeatureRequests: IbgNativeModule;
  IBGReplies: IbgNativeModule;
  IBGSurveys: IbgNativeModule;
}

export const { Instabug, IBGAPM, IBGBugReporting, IBGFeatureRequests, IBGReplies, IBGSurveys } =
  NativeModules as IbgNativeModules;
