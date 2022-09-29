/**
 * @format
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import 'react-native';
import { NativeModules, Platform } from 'react-native';
import '../mocks/mockXhrNetworkInterceptor';
import '../mocks/mockBugReporting';
import '../mocks/mockInstabugUtils';
import BugReporting from '../../src/modules/BugReporting';
import Instabug from '../../src/';
import IBGEventEmitter from '../../src/utils/IBGEventEmitter';
import IBGConstants from '../../src/utils/InstabugConstants';

const { IBGBugReporting: NativeIBGBugReporting } = NativeModules;

describe('Testing BugReporting Module', () => {
  beforeEach(() => {
    IBGEventEmitter.removeAllListeners();
  });

  it('should call the native method setBugReportingEnabled', () => {
    BugReporting.setEnabled(true);

    expect(NativeIBGBugReporting.setEnabled).toBeCalledTimes(1);
    expect(NativeIBGBugReporting.setEnabled).toBeCalledWith(true);
  });

  it('should call the native method setInvocationEvents with an array of invocationEvents', () => {
    const arrayOfInvocationEvents = [
      BugReporting.invocationEvent.floatingButton,
      BugReporting.invocationEvent.shake,
    ];
    BugReporting.setInvocationEvents(arrayOfInvocationEvents);

    expect(NativeIBGBugReporting.setInvocationEvents).toBeCalledTimes(1);
    expect(NativeIBGBugReporting.setInvocationEvents).toBeCalledWith(arrayOfInvocationEvents);
  });

  it('should call the native method setOptions with an array of options', () => {
    const arrayOfOptions = [BugReporting.option.commentFieldRequired];
    BugReporting.setOptions(arrayOfOptions);

    expect(NativeIBGBugReporting.setOptions).toBeCalledTimes(1);
    expect(NativeIBGBugReporting.setOptions).toBeCalledWith(arrayOfOptions);
  });

  it('should call the native method setShakingThresholdForiPhone with a float', () => {
    Platform.OS = 'ios';
    const value = 2.5;
    BugReporting.setShakingThresholdForiPhone(value);

    expect(NativeIBGBugReporting.setShakingThresholdForiPhone).toBeCalledTimes(1);
    expect(NativeIBGBugReporting.setShakingThresholdForiPhone).toBeCalledWith(value);
  });

  it('should not call the native method setShakingThresholdForiPhone when Platform.OS is android', () => {
    Platform.OS = 'android';
    BugReporting.setShakingThresholdForiPhone(2.5);

    expect(NativeIBGBugReporting.setShakingThresholdForiPhone).not.toBeCalled();
  });

  it('should call the native method setShakingThresholdForiPad with a float', () => {
    Platform.OS = 'ios';
    const value = 0.6;
    BugReporting.setShakingThresholdForiPad(value);

    expect(NativeIBGBugReporting.setShakingThresholdForiPad).toBeCalledTimes(1);
    expect(NativeIBGBugReporting.setShakingThresholdForiPad).toBeCalledWith(value);
  });

  it('should not call the native method setShakingThresholdForiPad when Platform.OS is android', () => {
    Platform.OS = 'android';
    BugReporting.setShakingThresholdForiPad(0.6);

    expect(NativeIBGBugReporting.setShakingThresholdForiPad).not.toBeCalled();
  });

  it('should call the native method setShakingThresholdForAndroid with a float', () => {
    Platform.OS = 'android';
    const value = 350;
    BugReporting.setShakingThresholdForAndroid(value);

    expect(NativeIBGBugReporting.setShakingThresholdForAndroid).toBeCalledTimes(1);
    expect(NativeIBGBugReporting.setShakingThresholdForAndroid).toBeCalledWith(value);
  });

  it('should not call the native method setShakingThresholdForAndroid when Platform.OS is android', () => {
    Platform.OS = 'ios';
    BugReporting.setShakingThresholdForAndroid(350);

    expect(NativeIBGBugReporting.setShakingThresholdForAndroid).not.toBeCalled();
  });

  it('should call the native method setExtendedBugReportMode with a boolean', () => {
    BugReporting.setExtendedBugReportMode(true);

    expect(NativeIBGBugReporting.setExtendedBugReportMode).toBeCalledTimes(1);
    expect(NativeIBGBugReporting.setExtendedBugReportMode).toBeCalledWith(true);
  });

  it('should call the native method setReportTypes with an array of reportTypes', () => {
    const arrayOfReportTypes = [BugReporting.reportType.bug];
    BugReporting.setReportTypes(arrayOfReportTypes);

    expect(NativeIBGBugReporting.setReportTypes).toBeCalledTimes(1);
    expect(NativeIBGBugReporting.setReportTypes).toBeCalledWith(arrayOfReportTypes);
  });

  it('should call the native method show with a reportType and array of options', () => {
    const reportType = BugReporting.reportType.bug;
    const arrayOfOptions = [BugReporting.option.commentFieldRequired];
    BugReporting.show(reportType, arrayOfOptions);

    expect(NativeIBGBugReporting.show).toBeCalledTimes(1);
    expect(NativeIBGBugReporting.show).toBeCalledWith(reportType, arrayOfOptions);
  });

  it('should call the native method setOnInvokeHandler with a function', () => {
    const callback = jest.fn();
    BugReporting.onInvokeHandler(callback);

    expect(NativeIBGBugReporting.setOnInvokeHandler).toBeCalledTimes(1);
    expect(NativeIBGBugReporting.setOnInvokeHandler).toBeCalledWith(callback);
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

    expect(NativeIBGBugReporting.setOnSDKDismissedHandler).toBeCalledTimes(1);
    expect(NativeIBGBugReporting.setOnSDKDismissedHandler).toBeCalledWith(callback);
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

    expect(NativeIBGBugReporting.setAutoScreenRecordingEnabled).toBeCalledTimes(1);
    expect(NativeIBGBugReporting.setAutoScreenRecordingEnabled).toBeCalledWith(true);
  });

  it('should call the native method setAutoScreenRecordingDuration on iOS', () => {
    Platform.OS = 'ios';
    BugReporting.setAutoScreenRecordingDurationIOS(30);
    expect(NativeIBGBugReporting.setAutoScreenRecordingDuration).toBeCalledTimes(1);
    expect(NativeIBGBugReporting.setAutoScreenRecordingDuration).toBeCalledWith(30);
  });

  it('should call the native method setViewHierarchyEnabled', () => {
    BugReporting.setViewHierarchyEnabled(true);

    expect(NativeIBGBugReporting.setViewHierarchyEnabled).toBeCalledTimes(1);
    expect(NativeIBGBugReporting.setViewHierarchyEnabled).toBeCalledWith(true);
  });

  it('should return on calling setDidSelectPromptOptionHandler when Platform is android', () => {
    Platform.OS = 'android';

    BugReporting.setDidSelectPromptOptionHandler(jest.fn());
    IBGEventEmitter.emit(IBGConstants.DID_SELECT_PROMPT_OPTION_HANDLER, {});

    expect(NativeIBGBugReporting.setDidSelectPromptOptionHandler).not.toBeCalled();
    expect(
      IBGEventEmitter.getListeners(IBGConstants.DID_SELECT_PROMPT_OPTION_HANDLER).length,
    ).toEqual(0);
  });

  it('should call the native method setDidSelectPromptOptionHandler with a function', () => {
    Platform.OS = 'ios';
    const callback = jest.fn();
    BugReporting.setDidSelectPromptOptionHandler(callback);

    expect(NativeIBGBugReporting.setDidSelectPromptOptionHandler).toBeCalledTimes(1);
    expect(NativeIBGBugReporting.setDidSelectPromptOptionHandler).toBeCalledWith(callback);
  });

  it('should call the native method setFloatingButtonEdge', () => {
    const offsetFromTop = 10;
    const edge = Instabug.floatingButtonEdge.left;
    BugReporting.setFloatingButtonEdge(edge, offsetFromTop);

    expect(NativeIBGBugReporting.setFloatingButtonEdge).toBeCalledTimes(1);
    expect(NativeIBGBugReporting.setFloatingButtonEdge).toBeCalledWith(edge, offsetFromTop);
  });

  it('should call the native method setEnabledAttachmentTypes', () => {
    BugReporting.setEnabledAttachmentTypes(true, true, false, true);

    expect(NativeIBGBugReporting.setEnabledAttachmentTypes).toBeCalledTimes(1);
    expect(NativeIBGBugReporting.setEnabledAttachmentTypes).toBeCalledWith(true, true, false, true);
  });

  it('should call the native method setVideoRecordingFloatingButtonPosition', () => {
    const position = 30;
    BugReporting.setVideoRecordingFloatingButtonPosition(position);

    expect(NativeIBGBugReporting.setVideoRecordingFloatingButtonPosition).toBeCalledTimes(1);
    expect(NativeIBGBugReporting.setVideoRecordingFloatingButtonPosition).toBeCalledWith(position);
  });
});
