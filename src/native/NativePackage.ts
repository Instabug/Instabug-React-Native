import { NativeModules as ReactNativeModules } from 'react-native';

import type { ApmNativeModule } from './NativeAPM';
import type { BugReportingNativeModule } from './NativeBugReporting';
import type { CrashReportingNativeModule } from './NativeCrashReporting';
import type { InstabugNativeModule } from './NativeInstabug';
import type { RepliesNativeModule } from './NativeReplies';
import type { SessionReplayNativeModule } from './NativeSessionReplay';

export interface InstabugNativePackage {
  IBGAPM: ApmNativeModule;
  IBGBugReporting: BugReportingNativeModule;
  IBGCrashReporting: CrashReportingNativeModule;
  Instabug: InstabugNativeModule;
  IBGReplies: RepliesNativeModule;
  IBGSessionReplay: SessionReplayNativeModule;
}

export const NativeModules = ReactNativeModules as InstabugNativePackage;
