import type { NativeModule } from 'react-native';

import { NativeModules } from './NativePackage';

export interface ApmNativeModule extends NativeModule {
  // Essential APIs //
  setEnabled(isEnabled: boolean): void;

  // Network APIs //
  networkLog(data: string): void;

  // App Launches APIs //
  setAppLaunchEnabled(isEnabled: boolean): void;
  endAppLaunch(): void;

  // Execution Traces APIs //
  startExecutionTrace(name: string, timestamp: string): Promise<string | null>;
  setExecutionTraceAttribute(id: string, key: string, value: string): void;
  endExecutionTrace(id: string): void;

  // App Flows APIs //
  startFlow(name: string): void;
  endFlow(name: string): void;
  setFlowAttribute(name: string, key: string, value?: string): void;

  // UI Traces APIs //
  setAutoUITraceEnabled(isEnabled: boolean): void;
  startUITrace(name: string): void;
  endUITrace(): void;
  ibgSleep(): void;

  sendOkHttpRequest(): void;
  sendApolloGraphQlRequest(): void;
}

export const NativeAPM = NativeModules.IBGAPM;
