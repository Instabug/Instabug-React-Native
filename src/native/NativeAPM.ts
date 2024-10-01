import { NativeEventEmitter, type NativeModule } from 'react-native';

import { NativeModules } from './NativePackage';

export interface ApmNativeModule extends NativeModule {
  // Essential APIs //
  setEnabled(isEnabled: boolean): void;

  // Network APIs //
  networkLogAndroid(
    requestStartTime: number,
    requestDuration: number,
    requestHeaders: string,
    requestBody: string,
    requestBodySize: number,
    requestMethod: string,
    requestUrl: string,
    requestContentType: string,
    responseHeaders: string,
    responseBody: string | null,
    responseBodySize: number,
    statusCode: number,
    responseContentType: string,
    errorDomain: string,
    gqlQueryName?: string,
    serverErrorMessage?: string,
  ): void;
  // registerNetworkLogsListener(): void;
  // updateNetworkLogSnapshot(networkData: string): void;
  // setNetworkLoggingRequestFilterPredicateIOS(value: boolean): void;

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
  setFlowAttribute(name: string, key: string, value?: string | null): void;

  // UI Traces APIs //
  setAutoUITraceEnabled(isEnabled: boolean): void;
  startUITrace(name: string): void;
  endUITrace(): void;
  ibgSleep(): void;

  // Feature Flags //
  isNativeInterceptionEnabled(): Promise<boolean>;
  isAPMNetworkEnabled(): Promise<boolean>;
  hasAPMNetworkPlugin(): Promise<boolean>;
}

export const NativeAPM = NativeModules.IBGAPM;

export enum NativeAPMEvent {
  NETWORK_LOGGER_HANDLER = 'IBGNetworkLoggerHandler',
}

export const APMEmitter = new NativeEventEmitter(NativeAPM);
