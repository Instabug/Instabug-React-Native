import type { NativeModule } from 'react-native';

import { NativeExampleModules } from './NativePackage';

export interface CrashReportingExampleNativeModule extends NativeModule {
  sendNativeNonFatal(): Promise<void>;
  sendNativeFatalCrash(): Promise<void>;
  sendFatalHang(): Promise<void>;
  sendANR(): Promise<void>;
  sendOOM(): Promise<void>;

  sendNDKCrash(): Promise<void>;

  causeSIGSEGVCrash(): Promise<void>;

  causeSIGABRTCrash(): Promise<void>;

  causeSIGFPECrash(): Promise<void>;

  causeSIGILLCrash(): Promise<void>;

  causeSIGBUSCrash(): Promise<void>;

  causeSIGTRAPCrash(): Promise<void>;
}

export const NativeExampleCrashReporting = NativeExampleModules.CrashReportingExampleModule;
