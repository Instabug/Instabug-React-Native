import type { NativeModule, NativeEventEmitter } from 'react-native';

import type { W3cExternalTraceAttributes } from '../utils/Types';
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
    W3cExternalTraceAttributes: W3cExternalTraceAttributes,
    gqlQueryName?: string,
    serverErrorMessage?: string,
  ): void;

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

  // W3C Feature Flags
  isW3ExternalTraceIDEnabled(): Promise<boolean>;
  isW3ExternalGeneratedHeaderEnabled(): Promise<boolean>;
  isW3CaughtHeaderEnabled(): Promise<boolean>;

  // W3C Feature Flags Listener for Android
  registerW3CFlagsChangeListener(
    handler: (payload: {
      isW3ExternalTraceIDEnabled: boolean;
      isW3ExternalGeneratedHeaderEnabled: boolean;
      isW3CaughtHeaderEnabled: boolean;
    }) => void,
  ): void;
}

export const NativeAPM = NativeModules.IBGAPM;

export enum NativeEvents {
  ON_W3C_FLAGS_CHANE = 'IBGAPMOnNewW3CFlagsUpdateReceivedCallback',
}

export const emitter = new NativeEventEmitter(NativeAPM);
