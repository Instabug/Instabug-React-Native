import { Platform } from 'react-native';
import { NativeBugReporting, NativeEvents, emitter } from '../native/NativeBugReporting';
/**
 * Enables and disables manual invocation and prompt options for bug and feedback.
 * @param isEnabled
 */
export const setEnabled = (isEnabled) => {
    NativeBugReporting.setEnabled(isEnabled);
};
/**
 * Sets the events that invoke the feedback form.
 * Default is set by `Instabug.init`.
 * @param events Array of events that invokes the feedback form.
 */
export const setInvocationEvents = (events) => {
    NativeBugReporting.setInvocationEvents(events);
};
/**
 * Sets the invocation options.
 * Default is set by `Instabug.init`.
 * @param options Array of invocation options
 */
export const setOptions = (options) => {
    NativeBugReporting.setOptions(options);
};
/**
 * Sets a block of code to be executed just before the SDK's UI is presented.
 * This block is executed on the UI thread. Could be used for performing any
 * UI changes before the SDK's UI is shown.
 * @param handler A callback that gets executed before invoking the SDK
 */
export const onInvokeHandler = (handler) => {
    emitter.addListener(NativeEvents.ON_INVOKE_HANDLER, handler);
    NativeBugReporting.setOnInvokeHandler(handler);
};
/**
 * Sets a block of code to be executed right after the SDK's UI is dismissed.
 * This block is executed on the UI thread. Could be used for performing any
 * UI changes after the SDK's UI is dismissed.
 * @param handler A callback to get executed after dismissing the SDK.
 */
export const onSDKDismissedHandler = (handler) => {
    emitter.addListener(NativeEvents.ON_DISMISS_HANDLER, (payload) => {
        handler(payload.dismissType, payload.reportType);
    });
    NativeBugReporting.setOnSDKDismissedHandler(handler);
};
/**
 * Sets the threshold value of the shake gesture for iPhone/iPod Touch
 * Default for iPhone is 2.5.
 * @param threshold Threshold for iPhone.
 */
export const setShakingThresholdForiPhone = (threshold) => {
    if (Platform.OS === 'ios') {
        NativeBugReporting.setShakingThresholdForiPhone(threshold);
    }
};
/**
 * Sets the threshold value of the shake gesture for iPad.
 * Default for iPad is 0.6.
 * @param threshold Threshold for iPad.
 */
export const setShakingThresholdForiPad = (threshold) => {
    if (Platform.OS === 'ios') {
        NativeBugReporting.setShakingThresholdForiPad(threshold);
    }
};
/**
 * Sets the threshold value of the shake gesture for android devices.
 * Default for android is an integer value equals 350.
 * you could increase the shaking difficulty level by
 * increasing the `350` value and vice versa
 * @param threshold Threshold for android devices.
 */
export const setShakingThresholdForAndroid = (threshold) => {
    if (Platform.OS === 'android') {
        NativeBugReporting.setShakingThresholdForAndroid(threshold);
    }
};
/**
 * Sets whether the extended bug report mode should be disabled, enabled with
 * required fields or enabled with optional fields.
 * @param mode An enum to disable the extended bug report mode,
 * enable it with required or with optional fields.
 */
export const setExtendedBugReportMode = (mode) => {
    NativeBugReporting.setExtendedBugReportMode(mode);
};
/**
 * Sets what type of reports, bug or feedback, should be invoked.
 * @param types Array of reportTypes
 */
export const setReportTypes = (types) => {
    NativeBugReporting.setReportTypes(types);
};
/**
 * Invoke bug reporting with report type and options.
 * @param type
 * @param options
 */
export const show = (type, options) => {
    NativeBugReporting.show(type, options ?? []);
};
/**
 * Enable/Disable screen recording
 * @param isEnabled enable/disable screen recording on crash feature
 */
export const setAutoScreenRecordingEnabled = (isEnabled) => {
    NativeBugReporting.setAutoScreenRecordingEnabled(isEnabled);
};
/**
 * Sets auto screen recording maximum duration
 *
 * @param maxDuration maximum duration of the screen recording video in seconds.
 * The maximum duration is 30 seconds
 */
export const setAutoScreenRecordingDurationIOS = (maxDuration) => {
    if (Platform.OS !== 'ios') {
        return;
    }
    NativeBugReporting.setAutoScreenRecordingDuration(maxDuration);
};
/**
 * Sets the default position at which the Instabug screen recording button will be shown.
 * Different orientations are already handled.
 * (Default for `position` is `bottomRight`)
 *
 * @param buttonPosition is of type position `topLeft` to show on the top left
 * of screen, or `bottomRight` to show on the bottom right of screen.
 */
export const setVideoRecordingFloatingButtonPosition = (buttonPosition) => {
    NativeBugReporting.setVideoRecordingFloatingButtonPosition(buttonPosition);
};
/**
 * Enables/disables inspect view hierarchy when reporting a bug/feedback.
 * @param isEnabled A boolean to set whether view hierarchy are enabled or disabled.
 */
export const setViewHierarchyEnabled = (isEnabled) => {
    NativeBugReporting.setViewHierarchyEnabled(isEnabled);
};
/**
 * Sets a block of code to be executed when a prompt option is selected.
 * @param handler - A callback that gets executed when a prompt option is selected.
 */
export const setDidSelectPromptOptionHandler = (handler) => {
    if (Platform.OS === 'android') {
        return;
    }
    emitter.addListener(NativeEvents.DID_SELECT_PROMPT_OPTION_HANDLER, (payload) => {
        handler(payload.promptOption);
    });
    NativeBugReporting.setDidSelectPromptOptionHandler(handler);
};
/**
 * Sets the default edge and offset from the top at which the floating button
 * will be shown. Different orientations are already handled.
 * @param edge The screen edge to show the floating button onto. Default is `floatingButtonEdge.right`.
 * @param offset The offset of the floating button from the top of the screen. Default is 50.
 */
export const setFloatingButtonEdge = (edge, offset) => {
    NativeBugReporting.setFloatingButtonEdge(edge, offset);
};
/**
 * Sets whether attachments in bug reporting and in-app messaging are enabled or not.
 * @param screenshot A boolean to enable or disable screenshot attachments.
 * @param extraScreenshot A boolean to enable or disable extra screenshot attachments.
 * @param galleryImage A boolean to enable or disable gallery image attachments. In iOS 10+,
 * NSPhotoLibraryUsageDescription should be set in info.plist to enable gallery image attachments.
 * @param screenRecording A boolean to enable or disable screen recording attachments.
 */
export const setEnabledAttachmentTypes = (screenshot, extraScreenshot, galleryImage, screenRecording) => {
    NativeBugReporting.setEnabledAttachmentTypes(screenshot, extraScreenshot, galleryImage, screenRecording);
};
/**
 * Adds a disclaimer text within the bug reporting form, which can include hyperlinked text.
 * @param text String text.
 */
export const setDisclaimerText = (text) => {
    NativeBugReporting.setDisclaimerText(text);
};
/**
 * Sets a minimum number of characters as a requirement for the comments field in the different report types.
 * @param limit int number of characters.
 * @param reportTypes (Optional) Array of reportType. If it's not passed, the limit will apply to all report types.
 */
export const setCommentMinimumCharacterCount = (limit, reportTypes) => {
    NativeBugReporting.setCommentMinimumCharacterCount(limit, reportTypes ?? []);
};
