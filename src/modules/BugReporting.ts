import { Platform } from 'react-native';
import { NativeBugReporting } from '../native';
import { ArgsRegistry } from '../utils/ArgsRegistry';
import IBGEventEmitter from '../utils/IBGEventEmitter';
import InstabugConstants from '../utils/InstabugConstants';

export namespace BugReporting {
  export import invocationEvent = ArgsRegistry.invocationEvent;
  export import extendedBugReportMode = ArgsRegistry.extendedBugReportMode;
  export import reportType = ArgsRegistry.reportType;
  export import option = ArgsRegistry.option;
  export import position = ArgsRegistry.position;

  /**
   * Enables and disables manual invocation and prompt options for bug and feedback.
   * @param isEnabled
   */
  export const setEnabled = (isEnabled: boolean) => {
    NativeBugReporting.setEnabled(isEnabled);
  };

  /**
   * Sets the events that invoke the feedback form.
   * Default is set by `Instabug.start`.
   * @param invocationEvents Array of events that invokes the feedback form.
   */
  export const setInvocationEvents = (invocationEvents: BugReporting.invocationEvent[]) => {
    NativeBugReporting.setInvocationEvents(invocationEvents);
  };

  /**
   * Sets the invocation options.
   * Default is set by `Instabug.start`.
   * @param options Array of invocation options
   */
  export const setOptions = (options: BugReporting.option[]) => {
    NativeBugReporting.setOptions(options);
  };

  /**
   * Sets a block of code to be executed just before the SDK's UI is presented.
   * This block is executed on the UI thread. Could be used for performing any
   * UI changes before the SDK's UI is shown.
   * @param handler A callback that gets executed before invoking the SDK
   */
  export const onInvokeHandler = (handler: () => void) => {
    IBGEventEmitter.addListener(NativeBugReporting, InstabugConstants.ON_INVOKE_HANDLER, handler);
    NativeBugReporting.setOnInvokeHandler(handler);
  };

  /**
   * Sets a block of code to be executed right after the SDK's UI is dismissed.
   * This block is executed on the UI thread. Could be used for performing any
   * UI changes after the SDK's UI is dismissed.
   * @param handler A callback to get executed after dismissing the SDK.
   */
  export const onSDKDismissedHandler = (
    handler: (dismissType: ArgsRegistry.dismissType, reportType: ArgsRegistry.dismissType) => void,
  ) => {
    IBGEventEmitter.addListener(
      NativeBugReporting,
      InstabugConstants.ON_SDK_DISMISSED_HANDLER,
      payload => {
        handler(payload.dismissType, payload.reportType);
      },
    );
    NativeBugReporting.setOnSDKDismissedHandler(handler);
  };

  /**
   * Sets the threshold value of the shake gesture for iPhone/iPod Touch
   * Default for iPhone is 2.5.
   * @param iPhoneShakingThreshold Threshold for iPhone.
   */
  export const setShakingThresholdForiPhone = (iPhoneShakingThreshold: number) => {
    if (Platform.OS === 'ios')
      NativeBugReporting.setShakingThresholdForiPhone(iPhoneShakingThreshold);
  };

  /**
   * Sets the threshold value of the shake gesture for iPad.
   * Default for iPad is 0.6.
   * @param iPadShakingThreshold Threshold for iPad.
   */
  export const setShakingThresholdForiPad = (iPadShakingThreshold: number) => {
    if (Platform.OS === 'ios') NativeBugReporting.setShakingThresholdForiPad(iPadShakingThreshold);
  };

  /**
   * Sets the threshold value of the shake gesture for android devices.
   * Default for android is an integer value equals 350.
   * you could increase the shaking difficulty level by
   * increasing the `350` value and vice versa
   * @param androidThreshold Threshold for android devices.
   */
  export const setShakingThresholdForAndroid = (androidThreshold: number) => {
    if (Platform.OS === 'android')
      NativeBugReporting.setShakingThresholdForAndroid(androidThreshold);
  };

  /**
   * Sets whether the extended bug report mode should be disabled, enabled with
   * required fields or enabled with optional fields.
   * @param extendedBugReportMode An enum to disable the extended bug report mode,
   * enable it with required or with optional fields.
   */
  export const setExtendedBugReportMode = (
    extendedBugReportMode: BugReporting.extendedBugReportMode,
  ) => {
    NativeBugReporting.setExtendedBugReportMode(extendedBugReportMode);
  };

  /**
   * Sets what type of reports, bug or feedback, should be invoked.
   * @param types Array of reportTypes
   */
  export const setReportTypes = (types: BugReporting.reportType[]) => {
    NativeBugReporting.setReportTypes(types);
  };

  /**
   * Invoke bug reporting with report type and options.
   * @param type
   * @param options
   */
  export const show = (type: BugReporting.reportType, options: BugReporting.option[]) => {
    NativeBugReporting.show(type, options ?? []);
  };

  /**
   * Enable/Disable screen recording
   * @param autoScreenRecordingEnabled enable/disable screen recording on crash feature
   */
  export const setAutoScreenRecordingEnabled = (autoScreenRecordingEnabled: boolean) => {
    NativeBugReporting.setAutoScreenRecordingEnabled(autoScreenRecordingEnabled);
  };

  /**
   * Sets auto screen recording maximum duration
   *
   * @param maxDuration maximum duration of the screen recording video in seconds.
   * The maximum duration is 30 seconds
   */
  export const setAutoScreenRecordingDurationIOS = (maxDuration: number) => {
    if (Platform.OS !== 'ios') return;
    NativeBugReporting.setAutoScreenRecordingDuration(maxDuration);
  };

  /**
   * Sets the default position at which the Instabug screen recording button will be shown.
   * Different orientations are already handled.
   * (Default for `position` is `bottomRight`)
   *
   * @param position is of type position `topLeft` to show on the top left of screen,
   * or `bottomRight` to show on the bottom right of scrren.
   */
  export const setVideoRecordingFloatingButtonPosition = (position: BugReporting.position) => {
    NativeBugReporting.setVideoRecordingFloatingButtonPosition(position);
  };

  /**
   * @summary Enables/disables inspect view hierarchy when reporting a bug/feedback.
   * @param viewHierarchyEnabled A boolean to set whether view hierarchy are enabled or disabled.
   */
  export const setViewHierarchyEnabled = (viewHierarchyEnabled: boolean) => {
    NativeBugReporting.setViewHierarchyEnabled(viewHierarchyEnabled);
  };

  /**
   * Sets a block of code to be executed when a prompt option is selected.
   * @param didSelectPromptOptionHandler - A callback that gets executed when a prompt option is selected.
   */
  export const setDidSelectPromptOptionHandler = (
    didSelectPromptOptionHandler: (promptOption: string) => void,
  ) => {
    if (Platform.OS === 'android') return;
    IBGEventEmitter.addListener(
      NativeBugReporting,
      InstabugConstants.DID_SELECT_PROMPT_OPTION_HANDLER,
      payload => {
        didSelectPromptOptionHandler(payload.promptOption);
      },
    );
    NativeBugReporting.setDidSelectPromptOptionHandler(didSelectPromptOptionHandler);
  };

  /**
   * Sets the default edge and offset from the top at which the floating button
   * will be shown. Different orientations are already handled.
   * Default for `floatingButtonEdge` is `floatingButtonEdge.right`.
   * Default for `offsetFromTop` is 50
   * @param floatingButtonEdge `maxX` to show on the right, or `minX` to show on the left.
   * @param offsetFromTop Top offset for floating button.
   */
  export const setFloatingButtonEdge = (
    floatingButtonEdge: ArgsRegistry.floatingButtonEdge,
    offsetFromTop: number,
  ) => {
    NativeBugReporting.setFloatingButtonEdge(floatingButtonEdge, offsetFromTop);
  };

  /**
   * Sets whether attachments in bug reporting and in-app messaging are enabled or not.
   * @param screenshot A boolean to enable or disable screenshot attachments.
   * @param  extraScreenshot A boolean to enable or disable extra screenshot attachments.
   * @param  galleryImage A boolean to enable or disable gallery image attachments. In iOS 10+,
   * NSPhotoLibraryUsageDescription should be set in info.plist to enable gallery image attachments.
   * @param screenRecording A boolean to enable or disable screen recording attachments.
   */
  export const setEnabledAttachmentTypes = (
    screenshot: boolean,
    extraScreenshot: boolean,
    galleryImage: boolean,
    screenRecording: boolean,
  ) => {
    NativeBugReporting.setEnabledAttachmentTypes(
      screenshot,
      extraScreenshot,
      galleryImage,
      screenRecording,
    );
  };
}
