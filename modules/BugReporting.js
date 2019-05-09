import {
  NativeModules,
  NativeAppEventEmitter,
  DeviceEventEmitter,
  Platform
} from 'react-native';
let { Instabug } = NativeModules;
import InstabugModule from '../index';

/**
 * BugReporting
 * @exports BugReporting
 */
export default {
  /**
   * Enables and disables manual invocation and prompt options for bug and feedback.
   * @param {boolean} isEnabled
   */
  setEnabled(isEnabled) {
    Instabug.setBugReportingEnabled(isEnabled);
  },

  /**
   * Sets the events that invoke the feedback form.
   * Default is set by `Instabug.startWithToken`.
   * @param {invocationEvent} invocationEvent Array of events that invokes the
   * feedback form.
   */
  setInvocationEvents: function(invocationEvents) {
    Instabug.setInvocationEvents(invocationEvents);
  },

  /**
   * @deprecated
   * Invokes the SDK manually with the default invocation mode.
   * Shows a view that asks the user whether they want to start a chat, report
   * a problem or suggest an improvement.
   */
  invoke: function() {
    Instabug.invoke();
  },

  /**
   * Sets the invocation options.
   * Default is set by `Instabug.startWithToken`.
   * @param {invocationOptions} invocationOptions Array of invocation options
   */
  setInvocationOptions: function(invocationOptions) {
    Instabug.setInvocationOptions(invocationOptions);
  },

  /**
   * @deprecated
   * Invokes the SDK with a specific mode.
   * Invokes the SDK and show a specific view, instead of showing a prompt for
   * users to choose from.
   * @param {invocationMode} invocationMode Specifies which mode the
   * SDK is going to start with.
   * @param {invocationOptions} invocationOptions Specifies which mode the
   * SDK is going to start with.
   */
  invokeWithInvocationModeAndOptions: function(
    invocationMode,
    invocationOptions
  ) {
    if (!invocationOptions) {
      invocationOptions = [];
    }
    Instabug.invokeWithInvocationModeAndOptions(
      invocationMode,
      invocationOptions
    );
  },

  /**
   * Sets a block of code to be executed just before the SDK's UI is presented.
   * This block is executed on the UI thread. Could be used for performing any
   * UI changes before the SDK's UI is shown.
   * @param {function} preInvocationHandler - A callback that gets executed before invoking the SDK
   */
  onInvokeHandler: function(preInvocationHandler) {
    if (Platform.OS === 'ios') {
      Instabug.addListener('IBGpreInvocationHandler');
      NativeAppEventEmitter.addListener(
        'IBGpreInvocationHandler',
        preInvocationHandler
      );
    } else {
      DeviceEventEmitter.addListener(
        'IBGpreInvocationHandler',
        preInvocationHandler
      );
    }

    Instabug.setPreInvocationHandler(preInvocationHandler);
  },

  /**
   * @deprecated Use {@link Instabug.onReportSubmitHandler} instead.
   * Sets a block of code to be executed before sending each report.
   * This block is executed in the background before sending each report. Could
   * be used for attaching logs and extra data to reports.
   * @param {function} preSendingHandler - A callback that gets executed before sending each bug
   * report.
   */
  onReportSubmitHandler: function(preSendingHandler) {
    InstabugModule.onReportSubmitHandler(preSendingHandler);
  },

  /**
   * Sets a block of code to be executed right after the SDK's UI is dismissed.
   * This block is executed on the UI thread. Could be used for performing any
   * UI changes after the SDK's UI is dismissed.
   * @param {function} postInvocationHandler - A callback to get executed after
   * dismissing the SDK.
   */
  onSDKDismissedHandler: function(postInvocationHandler) {
    if (Platform.OS === 'ios') {
      Instabug.addListener('IBGpostInvocationHandler');
      NativeAppEventEmitter.addListener('IBGpostInvocationHandler', function(
        payload
      ) {
        postInvocationHandler(payload['dismissType'], payload['reportType']);
      });
    } else {
      DeviceEventEmitter.addListener('IBGpostInvocationHandler', function(
        payload
      ) {
        postInvocationHandler(payload.dismissType, payload.reportType);
      });
    }

    Instabug.setPostInvocationHandler(postInvocationHandler);
  },

  /**
   * @deprecated
   * Enable/Disable prompt options when SDK invoked. When only a single option is enabled it
   * becomes the default
   * invocation option that SDK gets invoked with and prompt options screen will not show. When
   * none is enabled, Bug
   * reporting becomes the default invocation option.
   *
   * @param  {boolean} chat      whether Talk to us is enable or not
   * @param  {boolean} bug       whether Report a Problem is enable or not
   * @param  {boolean} feedback  whether General Feedback  is enable or not
   * */
  setPromptOptionsEnabled: function(chat, bug, feedback) {
    Instabug.setPromptOptionsEnabled(chat, bug, feedback);
  },

  /**
   * Sets the threshold value of the shake gesture for iPhone/iPod Touch
   * Default for iPhone is 2.5.
   * @param {number} iPhoneShakingThreshold Threshold for iPhone.
   */
  setShakingThresholdForiPhone: function(iPhoneShakingThreshold) {
    if (Platform.OS === 'ios')
      Instabug.setShakingThresholdForiPhone(iPhoneShakingThreshold);
  },

  /**
   * Sets the threshold value of the shake gesture for iPad.
   * Default for iPad is 0.6.
   * @param {number} iPadShakingThreshold Threshold for iPad.
   */
  setShakingThresholdForiPad: function(iPadShakingThreshold) {
    if (Platform.OS === 'ios')
      Instabug.setShakingThresholdForiPad(iPadShakingThreshold);
  },

  /**
   * Sets the threshold value of the shake gesture for android devices.
   * Default for android is an integer value equals 350.
   * you could increase the shaking difficulty level by
   * increasing the `350` value and vice versa
   * @param {number} androidThreshold Threshold for android devices.
   */
  setShakingThresholdForAndroid: function(androidThreshold) {
    if (Platform.OS === 'android')
      Instabug.setShakingThresholdForAndroid(androidThreshold);
  },

  /**
   * Sets whether the extended bug report mode should be disabled, enabled with
   * required fields or enabled with optional fields.
   * @param {extendedBugReportMode} extendedBugReportMode An enum to disable
   *                                the extended bug report mode, enable it
   *                                with required or with optional fields.
   */
  setExtendedBugReportMode: function(extendedBugReportMode) {
    Instabug.setExtendedBugReportMode(extendedBugReportMode);
  },

  /**
   * Sets what type of reports, bug or feedback, should be invoked.
   * @param {array} types - Array of reportTypes
   */
  setReportTypes(types) {
    Instabug.setReportTypes(types);
  },

  /**
   * @deprecated use {@link BugReporting.show}
   * Invoke bug reporting with report type and options.
   * @param {reportType} type 
   * @param {option} options 
   */
  showWithOptions(type, options) {
    this.show(type, options);
  },

  /**
   * Invoke bug reporting with report type and options.
   * @param {reportType} type 
   * @param {option} options 
   */
  show(type, options) {
    if (!options) {
      options = [];
    }
      Instabug.showBugReportingWithReportTypeAndOptions(type, options);
  },

  /**
   * Enable/Disable screen recording
   * @param {boolean} autoScreenRecordingEnabled boolean for enable/disable
   * screen recording on crash feature
   */
  setAutoScreenRecordingEnabled: function(autoScreenRecordingEnabled) {
    Instabug.setAutoScreenRecordingEnabled(autoScreenRecordingEnabled);
  },

  /**
   * Sets auto screen recording maximum duration
   *
   * @param autoScreenRecordingMaxDuration maximum duration of the screen recording video
   *                                       in seconds
   * The maximum duration is 30 seconds
   */
  setAutoScreenRecordingMaxDuration: function(autoScreenRecordingMaxDuration) {
    Instabug.setAutoScreenRecordingMaxDuration(autoScreenRecordingMaxDuration);
  },

  /**
   * @summary Enables/disables inspect view hierarchy when reporting a bug/feedback.
   * @param {boolean} viewHierarchyEnabled A boolean to set whether view hierarchy are enabled
   * or disabled.
   */
  setViewHierarchyEnabled: function(viewHierarchyEnabled) {
    Instabug.setViewHierarchyEnabled(viewHierarchyEnabled);
  },

  /**
   * The event used to invoke the feedback form
   * @readonly
   * @enum {number}
   */
  invocationEvent: {
    none: Instabug.invocationEventNone,
    shake: Instabug.invocationEventShake,
    screenshot: Instabug.invocationEventScreenshot,
    twoFingersSwipe: Instabug.invocationEventTwoFingersSwipeLeft,
    floatingButton: Instabug.invocationEventFloatingButton
  },

  /**
   *  The mode used upon invocating the SDK
   * @readonly
   * @enum {number}
   */
  invocationMode: {
    NA: Instabug.invocationModeNA,
    newBug: Instabug.invocationModeNewBug,
    newFeedback: Instabug.invocationModeNewFeedback,
    newChat: Instabug.invocationModeNewChat,
    chatsList: Instabug.invocationModeChatsList
  },

  /**
   * @deprecated use @link { option }
   * The options used upon invocating the SDK
   * @readonly
   * @enum {number}
   */
  invocationOptions: {
    emailFieldHidden: Instabug.emailFieldHidden,
    emailFieldOptional: Instabug.emailFieldOptional,
    commentFieldRequired: Instabug.commentFieldRequired,
    disablePostSendingDialog: Instabug.disablePostSendingDialog
  },

  /**
   *  The extended bug report mode
   * @readonly
   * @enum {number}
   */
  extendedBugReportMode: {
    enabledWithRequiredFields: Instabug.enabledWithRequiredFields,
    enabledWithOptionalFields: Instabug.enabledWithOptionalFields,
    disabled: Instabug.disabled
  },

  /**
   * Type of the report either feedback or bug.
   * @readonly
   * @enum {number}
   */
  reportType: {
    bug: Instabug.bugReportingReportTypeBug,
    feedback: Instabug.bugReportingReportTypeFeedback
  },

  /**
   * Options added while invoking bug reporting.
   * @readonly
   * @enum {number}
   */
  option: {
    emailFieldHidden: Instabug.optionEmailFieldHidden,
    emailFieldOptional: Instabug.optionEmailFieldOptional,
    commentFieldRequired: Instabug.optionCommentFieldRequired,
    disablePostSendingDialog: Instabug.optionDisablePostSendingDialog
  }
};
