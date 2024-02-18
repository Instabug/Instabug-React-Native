import { NativeModules as ReactNativeModules } from 'react-native';

import type { CrashReportingExampleNativeModule } from './NativeCrashReporting';

export interface InstabugExampleNativePackage {
  CrashReportingExampleModule: CrashReportingExampleNativeModule;
}

export const NativeExampleModules = ReactNativeModules as InstabugExampleNativePackage;
