import type { NativeModule } from 'react-native';

import { NativeExampleModules } from './NativePackage';

export interface CrashReportingExampleNativeModule extends NativeModule {
  sendNativeNonFatal(): Promise<void>;
  sendNativeFatalCrash(): Promise<void>;
  sendFatalHang(): Promise<void>;
  sendANR(): Promise<void>;
  sendOOM(): Promise<void>;
}

export const NativeExampleCrashReporting = NativeExampleModules.CrashReportingExampleModule;
