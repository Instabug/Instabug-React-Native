import { Platform } from 'react-native';

import * as BugReporting from '../../src/modules/BugReporting';
import * as Instabug from '../../src/modules/Instabug';
import { NativeBugReporting } from '../../src/native';
import IBGEventEmitter from '../../src/utils/IBGEventEmitter';
import IBGConstants from '../../src/utils/InstabugConstants';

describe('Testing BugReporting Module', () => {
  it('should call the native method setBugReportingEnabled', () => {
    BugReporting.setEnabled(true);

    expect(NativeBugReporting.setEnabled).toBeCalledTimes(1);
    expect(NativeBugReporting.setEnabled).toBeCalledWith(true);
  });

  it('should call the native method setInvocationEvents with an array of invocationEvents', () => {
    const arrayOfInvocationEvents = [
      BugReporting.invocationEvent.floatingButton,
      BugReporting.invocationEvent.shake,
    ];
    BugReporting.setInvocationEvents(arrayOfInvocationEvents);

    expect(NativeBugReporting.setInvocationEvents).toBeCalledTimes(1);
    expect(NativeBugReporting.setInvocationEvents).toBeCalledWith(arrayOfInvocationEvents);
  });

  it('should call the native method setOptions with an array of options', () => {
    const arrayOfOptions = [BugReporting.option.commentFieldRequired];
    BugReporting.setOptions(arrayOfOptions);

    expect(NativeBugReporting.setOptions).toBeCalledTimes(1);
    expect(NativeBugReporting.setOptions).toBeCalledWith(arrayOfOptions);
  });

  it('should call the native method setShakingThresholdForiPhone with a float', () => {
    Platform.OS = 'ios';
    const value = 2.5;
    BugReporting.setShakingThresholdForiPhone(value);

    expect(NativeBugReporting.setShakingThresholdForiPhone).toBeCalledTimes(1);
    expect(NativeBugReporting.setShakingThresholdForiPhone).toBeCalledWith(value);
  });

  it('should not call the native method setShakingThresholdForiPhone when Platform.OS is android', () => {
    Platform.OS = 'android';
    BugReporting.setShakingThresholdForiPhone(2.5);

    expect(NativeBugReporting.setShakingThresholdForiPhone).not.toBeCalled();
  });

  it('should call the native method setShakingThresholdForiPad with a float', () => {
    Platform.OS = 'ios';
    const value = 0.6;
    BugReporting.setShakingThresholdForiPad(value);

    expect(NativeBugReporting.setShakingThresholdForiPad).toBeCalledTimes(1);
    expect(NativeBugReporting.setShakingThresholdForiPad).toBeCalledWith(value);
  });

  it('should not call the native method setShakingThresholdForiPad when Platform.OS is android', () => {
    Platform.OS = 'android';
    BugReporting.setShakingThresholdForiPad(0.6);

    expect(NativeBugReporting.setShakingThresholdForiPad).not.toBeCalled();
  });

  it('should call the native method setShakingThresholdForAndroid with a float', () => {
    Platform.OS = 'android';
    const value = 350;
    BugReporting.setShakingThresholdForAndroid(value);

    expect(NativeBugReporting.setShakingThresholdForAndroid).toBeCalledTimes(1);
    expect(NativeBugReporting.setShakingThresholdForAndroid).toBeCalledWith(value);
  });

  it('should not call the native method setShakingThresholdForAndroid when Platform.OS is android', () => {
    Platform.OS = 'ios';
    BugReporting.setShakingThresholdForAndroid(350);

    expect(NativeBugReporting.setShakingThresholdForAndroid).not.toBeCalled();
  });

  it('should call the native method setExtendedBugReportMode with disabled', () => {
    BugReporting.setExtendedBugReportMode(BugReporting.extendedBugReportMode.disabled);

    expect(NativeBugReporting.setExtendedBugReportMode).toBeCalledTimes(1);
    expect(NativeBugReporting.setExtendedBugReportMode).toBeCalledWith(
      BugReporting.extendedBugReportMode.disabled,
    );
  });

  it('should call the native method setReportTypes with an array of reportTypes', () => {
    const arrayOfReportTypes = [BugReporting.reportType.bug];
    BugReporting.setReportTypes(arrayOfReportTypes);

    expect(NativeBugReporting.setReportTypes).toBeCalledTimes(1);
    expect(NativeBugReporting.setReportTypes).toBeCalledWith(arrayOfReportTypes);
  });

  it('should call the native method show with a reportType and array of options', () => {
    const reportType = BugReporting.reportType.bug;
    const arrayOfOptions = [BugReporting.option.commentFieldRequired];
    BugReporting.show(reportType, arrayOfOptions);

    expect(NativeBugReporting.show).toBeCalledTimes(1);
    expect(NativeBugReporting.show).toBeCalledWith(reportType, arrayOfOptions);
  });

  it('should call the native method show with a reportType and default options to an empty array', () => {
    const reportType = BugReporting.reportType.bug;
    BugReporting.show(reportType, []);

    expect(NativeBugReporting.show).toBeCalledTimes(1);

    expect(NativeBugReporting.show).toBeCalledWith(reportType, []);
  });

  it('should call the native method setOnInvokeHandler with a function', () => {
    const callback = jest.fn();
    BugReporting.onInvokeHandler(callback);

    expect(NativeBugReporting.setOnInvokeHandler).toBeCalledTimes(1);
    expect(NativeBugReporting.setOnInvokeHandler).toBeCalledWith(callback);
  });

  it('should invoke callback on emitting the event IBGpreInvocationHandler', () => {
    const callback = jest.fn();
    BugReporting.onInvokeHandler(callback);
    IBGEventEmitter.emit(IBGConstants.ON_INVOKE_HANDLER);

    expect(IBGEventEmitter.getListeners(IBGConstants.ON_INVOKE_HANDLER).length).toEqual(1);
    expect(callback).toHaveBeenCalled();
  });

  it('should call the native method setOnSDKDismissedHandler with a function', () => {
    const callback = jest.fn();
    BugReporting.onSDKDismissedHandler(callback);

    expect(NativeBugReporting.setOnSDKDismissedHandler).toBeCalledTimes(1);
    expect(NativeBugReporting.setOnSDKDismissedHandler).toBeCalledWith(callback);
  });

  it('should invoke callback on emitting the event IBGpostInvocationHandler', () => {
    const dismissType = 'cancel';
    const reportType = 'bug';
    const callback = jest.fn();

    BugReporting.onSDKDismissedHandler(callback);
    IBGEventEmitter.emit(IBGConstants.ON_SDK_DISMISSED_HANDLER, {
      dismissType: dismissType,
      reportType: reportType,
    });

    expect(IBGEventEmitter.getListeners(IBGConstants.ON_SDK_DISMISSED_HANDLER).length).toEqual(1);
    expect(callback).toBeCalledTimes(1);
    expect(callback).toBeCalledWith(dismissType, reportType);
  });

  it('should call the native method setAutoScreenRecordingEnabled', () => {
    BugReporting.setAutoScreenRecordingEnabled(true);

    expect(NativeBugReporting.setAutoScreenRecordingEnabled).toBeCalledTimes(1);
    expect(NativeBugReporting.setAutoScreenRecordingEnabled).toBeCalledWith(true);
  });

  it('should call the native method setAutoScreenRecordingDuration on iOS', () => {
    Platform.OS = 'ios';
    BugReporting.setAutoScreenRecordingDurationIOS(30);
    expect(NativeBugReporting.setAutoScreenRecordingDuration).toBeCalledTimes(1);
    expect(NativeBugReporting.setAutoScreenRecordingDuration).toBeCalledWith(30);
  });

  it('should not call the native method setAutoScreenRecordingDuration on Android', () => {
    Platform.OS = 'android';
    BugReporting.setAutoScreenRecordingDurationIOS(30);
    expect(NativeBugReporting.setAutoScreenRecordingDuration).not.toBeCalled();
  });

  it('should call the native method setViewHierarchyEnabled', () => {
    BugReporting.setViewHierarchyEnabled(true);

    expect(NativeBugReporting.setViewHierarchyEnabled).toBeCalledTimes(1);
    expect(NativeBugReporting.setViewHierarchyEnabled).toBeCalledWith(true);
  });

  it('should return on calling setDidSelectPromptOptionHandler when Platform is android', () => {
    Platform.OS = 'android';

    BugReporting.setDidSelectPromptOptionHandler(jest.fn());
    IBGEventEmitter.emit(IBGConstants.DID_SELECT_PROMPT_OPTION_HANDLER, {});

    expect(NativeBugReporting.setDidSelectPromptOptionHandler).not.toBeCalled();
    expect(
      IBGEventEmitter.getListeners(IBGConstants.DID_SELECT_PROMPT_OPTION_HANDLER).length,
    ).toEqual(0);
  });

  it('should call setDidSelectPromptOptionHandler event listener when platform is iOS', () => {
    Platform.OS = 'ios';
    const callback = jest.fn();
    const payload = { promptOption: 'bug' };

    BugReporting.setDidSelectPromptOptionHandler(callback);
    IBGEventEmitter.emit(IBGConstants.DID_SELECT_PROMPT_OPTION_HANDLER, payload);

    const listeners = IBGEventEmitter.getListeners(IBGConstants.DID_SELECT_PROMPT_OPTION_HANDLER);
    expect(listeners.length).toBe(1);
    expect(callback).toBeCalledTimes(1);
    expect(callback).toBeCalledWith(payload.promptOption);
  });

  it('should call the native method setDidSelectPromptOptionHandler with a function', () => {
    Platform.OS = 'ios';
    const callback = jest.fn();
    BugReporting.setDidSelectPromptOptionHandler(callback);

    expect(NativeBugReporting.setDidSelectPromptOptionHandler).toBeCalledTimes(1);
    expect(NativeBugReporting.setDidSelectPromptOptionHandler).toBeCalledWith(callback);
  });

  it('should call the native method setFloatingButtonEdge', () => {
    const offsetFromTop = 10;
    const edge = Instabug.floatingButtonEdge.left;
    BugReporting.setFloatingButtonEdge(edge, offsetFromTop);

    expect(NativeBugReporting.setFloatingButtonEdge).toBeCalledTimes(1);
    expect(NativeBugReporting.setFloatingButtonEdge).toBeCalledWith(edge, offsetFromTop);
  });

  it('should call the native method setEnabledAttachmentTypes', () => {
    BugReporting.setEnabledAttachmentTypes(true, true, false, true);

    expect(NativeBugReporting.setEnabledAttachmentTypes).toBeCalledTimes(1);
    expect(NativeBugReporting.setEnabledAttachmentTypes).toBeCalledWith(true, true, false, true);
  });

  it('should call the native method setVideoRecordingFloatingButtonPosition', () => {
    const position = 30;
    BugReporting.setVideoRecordingFloatingButtonPosition(position);

    expect(NativeBugReporting.setVideoRecordingFloatingButtonPosition).toBeCalledTimes(1);
    expect(NativeBugReporting.setVideoRecordingFloatingButtonPosition).toBeCalledWith(position);
  });

  it('should call the native method setDisclaimerText', () => {
    const text = 'This is a disclaimer text!';
    BugReporting.setDisclaimerText(text);

    expect(NativeBugReporting.setDisclaimerText).toBeCalledTimes(1);
    expect(NativeBugReporting.setDisclaimerText).toBeCalledWith(text);
  });

  it('should call the native method setCommentMinimumCharacterCount', () => {
    const count = 20;
    const reportTypes = [BugReporting.reportType.bug];

    BugReporting.setCommentMinimumCharacterCount(count, reportTypes);

    expect(NativeBugReporting.setCommentMinimumCharacterCount).toBeCalledTimes(1);
    expect(NativeBugReporting.setCommentMinimumCharacterCount).toBeCalledWith(count, reportTypes);
  });
});
