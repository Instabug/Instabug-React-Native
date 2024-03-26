import { NativeEventEmitter, NativeModule, ProcessedColorValue } from 'react-native';
import type Report from '../models/Report';
import type { ColorTheme, InvocationEvent, Locale, LogLevel, ReproStepsMode, StringKey, WelcomeMessageMode } from '../utils/Enums';
import type { NetworkData } from '../utils/XhrNetworkInterceptor';
import type { NativeConstants } from './NativeConstants';
export interface InstabugNativeModule extends NativeModule {
    getConstants(): NativeConstants;
    setEnabled(isEnabled: boolean): void;
    init(token: string, invocationEvents: InvocationEvent[], debugLogsLevel: LogLevel, useNativeNetworkInterception: boolean, codePushVersion?: string): void;
    show(): void;
    setIBGLogPrintsToConsole(printsToConsole: boolean): void;
    setSessionProfilerEnabled(isEnabled: boolean): void;
    setLocale(sdkLocale: Locale): void;
    setColorTheme(sdkTheme: ColorTheme): void;
    setPrimaryColor(color: ProcessedColorValue | null | undefined): void;
    setString(string: string, key: StringKey): void;
    networkLog(network: NetworkData | string): void;
    setNetworkLoggingEnabled(isEnabled: boolean): void;
    setReproStepsConfig(bugMode: ReproStepsMode, crashMode: ReproStepsMode, sessionReplay: ReproStepsMode): void;
    setTrackUserSteps(isEnabled: boolean): void;
    reportScreenChange(firstScreen: string): void;
    reportCurrentViewChange(screenName: string): void;
    addPrivateView(nativeTag: number | null): void;
    removePrivateView(nativeTag: number | null): void;
    logVerbose(message: string): void;
    logInfo(message: string): void;
    logDebug(message: string): void;
    logError(message: string): void;
    logWarn(message: string): void;
    clearLogs(): void;
    identifyUser(email: string, name: string, id?: string): void;
    logOut(): void;
    logUserEvent(name: string): void;
    setUserData(data: string): void;
    setUserAttribute(key: string, value: string): void;
    getUserAttribute(key: string): Promise<string>;
    removeUserAttribute(key: string): void;
    getAllUserAttributes(): Promise<Record<string, string>>;
    clearAllUserAttributes(): void;
    showWelcomeMessageWithMode(mode: WelcomeMessageMode): void;
    setWelcomeMessageMode(mode: WelcomeMessageMode): void;
    appendTags(tags: string[]): void;
    resetTags(): void;
    getTags(): Promise<string[]>;
    addExperiments(experiments: string[]): void;
    removeExperiments(experiments: string[]): void;
    clearAllExperiments(): void;
    setFileAttachment(filePath: string, fileName?: string): void;
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
    setOnNetworkDiagnosticsHandler(): void;
}
export declare const NativeInstabug: InstabugNativeModule;
export declare enum NativeEvents {
    PRESENDING_HANDLER = "IBGpreSendingHandler",
    NETWORK_DIAGNOSTICS_HANDLER = "IBGNetworkDiagnosticsHandler"
}
export declare const emitter: NativeEventEmitter;
