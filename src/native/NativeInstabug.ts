import { NativeEventEmitter, NativeModule, ProcessedColorValue } from 'react-native';

import type Report from '../models/Report';
import type {
  AutoMaskingType,
  ColorTheme,
  InvocationEvent,
  Locale,
  LogLevel,
  ReproStepsMode,
  StringKey,
  WelcomeMessageMode,
} from '../utils/Enums';
import type { NativeConstants } from './NativeConstants';
import type { W3cExternalTraceAttributes } from '../models/W3cExternalTraceAttributes';
import { NativeModules } from './NativePackage';

export interface InstabugNativeModule extends NativeModule {
  getConstants(): NativeConstants;

  // Essential APIs //
  setEnabled(isEnabled: boolean): void;
  init(
    token: string,
    invocationEvents: InvocationEvent[],
    debugLogsLevel: LogLevel,
    useNativeNetworkInterception: boolean,
    codePushVersion?: string,
    options?: {
      ignoreAndroidSecureFlag?: boolean;
    },
    appVariant?: string,
  ): void;
  show(): void;

  // Misc APIs //
  setCodePushVersion(version: string): void;
  setAppVariant(appVariant: string): void;
  setIBGLogPrintsToConsole(printsToConsole: boolean): void;
  setSessionProfilerEnabled(isEnabled: boolean): void;

  // Customization APIs //
  setLocale(sdkLocale: Locale): void;
  setColorTheme(sdkTheme: ColorTheme): void;
  setPrimaryColor(color: ProcessedColorValue | null | undefined): void;
  setString(string: string, key: StringKey): void;

  // Network APIs //
  networkLogAndroid(
    url: string,
    requestBody: string,
    responseBody: string | null,
    method: string,
    responseCode: number,
    requestHeaders: string,
    responseHeaders: string,
    duration: number,
  ): void;

  networkLogIOS(
    url: string,
    method: string,
    requestBody: string | null,
    requestBodySize: number,
    responseBody: string | null,
    responseBodySize: number,
    responseCode: number,
    requestHeaders: Record<string, string>,
    responseHeaders: Record<string, string>,
    contentType: string,
    errorDomain: string,
    errorCode: number,
    startTime: number,
    duration: number,
    gqlQueryName: string | undefined,
    serverErrorMessage: string | undefined,
    W3cExternalTraceAttributes: W3cExternalTraceAttributes,
  ): void;

  setNetworkLoggingEnabled(isEnabled: boolean): void;
  setNetworkLogBodyEnabled(isEnabled: boolean): void;

  // Repro Steps APIs //
  setReproStepsConfig(
    bugMode: ReproStepsMode,
    crashMode: ReproStepsMode,
    sessionReplay: ReproStepsMode,
  ): void;
  setTrackUserSteps(isEnabled: boolean): void;
  reportScreenChange(firstScreen: string): void;
  reportCurrentViewChange(screenName: string): void;
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
  identifyUser(email: string, name: string, id?: string): void;
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
  showWelcomeMessageWithMode(mode: WelcomeMessageMode): void;
  setWelcomeMessageMode(mode: WelcomeMessageMode): void;

  // Tags APIs //
  appendTags(tags: string[]): void;
  resetTags(): void;
  getTags(): Promise<string[]>;

  // Experiments APIs //
  addExperiments(experiments: string[]): void;
  removeExperiments(experiments: string[]): void;
  clearAllExperiments(): void;

  addFeatureFlags(featureFlags: Record<string, string | undefined>): void;

  removeFeatureFlags(featureFlags: string[]): void;

  removeAllFeatureFlags(): void;

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
  willRedirectToStore(): void;

  // W3C Feature Flags
  isW3ExternalTraceIDEnabled(): Promise<boolean>;

  isW3ExternalGeneratedHeaderEnabled(): Promise<boolean>;

  isW3CaughtHeaderEnabled(): Promise<boolean>;

  // Feature Flags Listener for Android
  registerFeatureFlagsChangeListener(): void;

  setOnFeaturesUpdatedListener(handler?: (params: any) => void): void; // android only
  enableAutoMasking(autoMaskingTypes: AutoMaskingType[]): void;
  getNetworkBodyMaxSize(): Promise<number>;
}

export const NativeInstabug = NativeModules.Instabug;

export enum NativeEvents {
  PRESENDING_HANDLER = 'IBGpreSendingHandler',
  IBG_ON_FEATURES_UPDATED_CALLBACK = 'IBGOnFeatureUpdatedCallback',
  ON_FEATURE_FLAGS_CHANGE = 'IBGOnNewFeatureFlagsUpdateReceivedCallback',
}

export const emitter = new NativeEventEmitter(NativeInstabug);
