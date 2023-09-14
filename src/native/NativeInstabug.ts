import { NativeEventEmitter, NativeModule, ProcessedColorValue } from 'react-native';

import type Report from '../models/Report';
import type {
  colorTheme,
  invocationEvent,
  locale,
  reproStepsMode,
  sdkDebugLogsLevel,
  strings,
  welcomeMessageMode,
} from '../utils/ArgsRegistry';
import type {
  ColorTheme,
  InvocationEvent,
  Locale,
  LogLevel,
  ReproStepsMode,
  StringKey,
  WelcomeMessageMode,
} from '../utils/Enums';
import type { NetworkData } from '../utils/XhrNetworkInterceptor';
import type { NativeConstants } from './NativeConstants';
import { NativeModules } from './NativePackage';

export interface InstabugNativeModule extends NativeModule {
  getConstants(): NativeConstants;

  // Essential APIs //
  setEnabled(isEnabled: boolean): void;
  init(
    token: string,
    invocationEvents: InvocationEvent[] | invocationEvent[],
    debugLogsLevel: LogLevel,
  ): void;
  show(): void;

  // Misc APIs //
  setIBGLogPrintsToConsole(printsToConsole: boolean): void;
  setSessionProfilerEnabled(isEnabled: boolean): void;

  // Customization APIs //
  setLocale(sdkLocale: Locale | locale): void;
  setColorTheme(sdkTheme: ColorTheme | colorTheme): void;
  setPrimaryColor(color: ProcessedColorValue | null | undefined): void;
  setString(string: string, key: StringKey | strings): void;

  // Network APIs //
  networkLog(network: NetworkData | string): void;
  setNetworkLoggingEnabled(isEnabled: boolean): void;

  // Repro Steps APIs //
  /** @deprecated */
  setReproStepsMode(mode: ReproStepsMode | reproStepsMode): void;
  setReproStepsConfig(bugMode: ReproStepsMode, crashMode: ReproStepsMode): void;
  setTrackUserSteps(isEnabled: boolean): void;
  reportScreenChange(firstScreen: string): void;
  addPrivateView(nativeTag: number | null): void;
  removePrivateView(nativeTag: number | null): void;

  // Logging APIs //
  logVerbose(message: string): void;
  logInfo(message: string): void;
  logDebug(message: string): void;
  logError(message: string): void;
  logWarn(message: string): void;
  clearLogs(): void;

  // User APIs //
  identifyUser(email: string, name: string): void;
  logOut(): void;
  logUserEvent(name: string): void;
  setUserData(data: string): void;

  // User Attributes APIs //
  setUserAttribute(key: string, value: string): void;
  getUserAttribute(key: string): Promise<string>;
  removeUserAttribute(key: string): void;
  getAllUserAttributes(): Promise<Record<string, string>>;
  clearAllUserAttributes(): void;

  // Welcome Message APIs //
  showWelcomeMessageWithMode(mode: WelcomeMessageMode | welcomeMessageMode): void;
  setWelcomeMessageMode(mode: WelcomeMessageMode | welcomeMessageMode): void;

  // Tags APIs //
  appendTags(tags: string[]): void;
  resetTags(): void;
  getTags(): Promise<string[]>;

  // Experiments APIs //
  addExperiments(experiments: string[]): void;
  removeExperiments(experiments: string[]): void;
  clearAllExperiments(): void;

  // Files APIs //
  setFileAttachment(filePath: string, fileName?: string): void;

  // Report APIs //
  setPreSendingHandler(handler?: (report: Report) => void): void;
  appendTagToReport(tag: string): void;
  appendConsoleLogToReport(consoleLog: string): void;
  setUserAttributeToReport(key: string, value: string): void;
  logDebugToReport(log: string): void;
  logVerboseToReport(log: string): void;
  logWarnToReport(log: string): void;
  logErrorToReport(log: string): void;
  logInfoToReport(log: string): void;
  addFileAttachmentWithURLToReport(url: string, filename?: string): void;
  addFileAttachmentWithDataToReport(data: string, filename?: string): void;

  // Deprecated APIs //
  /** @deprecated */
  setSdkDebugLogsLevel(level: sdkDebugLogsLevel): void;
  /** @deprecated */
  setDebugEnabled(isEnabled: boolean): void;
  /** @deprecated */
  isRunningLive(callback: (isLive: boolean) => void): void;
  /** @deprecated */
  callPrivateApi(apiName: string, param: any[]): void;
}

export const NativeInstabug = NativeModules.Instabug;

export enum NativeEvents {
  PRESENDING_HANDLER = 'IBGpreSendingHandler',
}

export const emitter = new NativeEventEmitter(NativeInstabug);
