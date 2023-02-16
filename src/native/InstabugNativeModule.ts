import type { NativeModule, ProcessedColorValue } from 'react-native';

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
  setReproStepsMode(mode: ReproStepsMode | reproStepsMode): void;
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
  getUserAttribute(key: string, callback: (attribute: string) => void): void;
  removeUserAttribute(key: string): void;
  getAllUserAttributes(callback: (attributes: Record<string, string>) => void): void;
  clearAllUserAttributes(): void;

  // Welcome Message APIs //
  showWelcomeMessageWithMode(mode: WelcomeMessageMode | welcomeMessageMode): void;
  setWelcomeMessageMode(mode: WelcomeMessageMode | welcomeMessageMode): void;

  // Tags APIs //
  appendTags(tags: string[]): void;
  resetTags(): void;
  getTags(callback: (tags: string[]) => void): void;

  // Experiments APIs //
  addExperiments(experiments: string[]): void;
  removeExperiments(experiments: string[]): void;
  clearAllExperiments(): void;

  // Files APIs //
  setFileAttachment(filePath: string, fileName?: string): void;

  // Report APIs //
  getReport(): void;
  setPreSendingHandler(handler?: (report: Report) => void): void;
  appendTagToReport(tag: string): unknown;
  appendConsoleLogToReport(consoleLog: string): unknown;
  setUserAttributeToReport(key: string, value: string): unknown;
  logDebugToReport(log: string): unknown;
  logVerboseToReport(log: string): unknown;
  logWarnToReport(log: string): unknown;
  logErrorToReport(log: string): unknown;
  logInfoToReport(log: string): unknown;
  addFileAttachmentWithURLToReport(url: string, filename?: string): unknown;
  addFileAttachmentWithDataToReport(data: string, filename?: string): unknown;

  // Deprecated APIs //
  /** @deprecated */
  setSdkDebugLogsLevel(level: sdkDebugLogsLevel): void;
  /** @deprecated */
  setDebugEnabled(isEnabled: boolean): void;
  /** @deprecated */
  enable(): void;
  /** @deprecated */
  disable(): void;
  /** @deprecated */
  isRunningLive(callback: (isLive: boolean) => void): void;
  /** @deprecated */
  callPrivateApi(apiName: string, param: any[]): void;
}
