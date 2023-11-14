import { NativeEventEmitter, NativeModule } from 'react-native';
import type { DismissType, ExtendedBugReportMode, FloatingButtonPosition, InvocationEvent, InvocationOption, RecordingButtonPosition, ReportType } from '../utils/Enums';
export interface BugReportingNativeModule extends NativeModule {
    setEnabled(isEnabled: boolean): void;
    show(type: ReportType, options: InvocationOption[]): void;
    setInvocationEvents(events: InvocationEvent[]): void;
    setOptions(options: InvocationOption[]): void;
    setExtendedBugReportMode(mode: ExtendedBugReportMode): void;
    setReportTypes(types: ReportType[]): void;
    setDisclaimerText(text: string): void;
    setCommentMinimumCharacterCount(limit: number, reportTypes: ReportType[]): void;
    setFloatingButtonEdge(edge: FloatingButtonPosition, offset: number): void;
    setVideoRecordingFloatingButtonPosition(buttonPosition: RecordingButtonPosition): void;
    setEnabledAttachmentTypes(screenshot: boolean, extraScreenshot: boolean, galleryImage: boolean, screenRecording: boolean): void;
    setAutoScreenRecordingEnabled(isEnabled: boolean): void;
    setAutoScreenRecordingDuration(maxDuration: number): void;
    setViewHierarchyEnabled(isEnabled: boolean): void;
    setShakingThresholdForiPhone(threshold: number): void;
    setShakingThresholdForiPad(threshold: number): void;
    setShakingThresholdForAndroid(threshold: number): void;
    setOnInvokeHandler(handler: () => void): void;
    setDidSelectPromptOptionHandler(handler: (promptOption: string) => void): void;
    setOnSDKDismissedHandler(handler: (dismissType: DismissType, reportType: ReportType) => void): void;
}
export declare const NativeBugReporting: BugReportingNativeModule;
export declare enum NativeEvents {
    ON_INVOKE_HANDLER = "IBGpreInvocationHandler",
    ON_DISMISS_HANDLER = "IBGpostInvocationHandler",
    DID_SELECT_PROMPT_OPTION_HANDLER = "IBGDidSelectPromptOptionHandler"
}
export declare const emitter: NativeEventEmitter;
