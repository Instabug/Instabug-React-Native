/**
 * @format
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import 'react-native';
import { NativeModules, Platform } from 'react-native';
import '../jest/mockXhrNetworkInterceotor';
import '../jest/mockBugReporting';
import '../jest/mockInstabugUtils';
import BugReporting from '../modules/BugReporting'
import Instabug from '../';
import IBGEventEmitter from '../utils/IBGEventEmitter';
import IBGConstants from '../utils/InstabugConstants';
import sinon from 'sinon';



describe('Testing BugReporting Module', () => {
  
  const setEnabled = sinon.spy(NativeModules.IBGBugReporting, 'setEnabled');
  const setInvocationEvents = sinon.spy(NativeModules.IBGBugReporting, 'setInvocationEvents');
  const setOptions = sinon.spy(NativeModules.IBGBugReporting, 'setOptions');
  const setShakingThresholdForiPhone = sinon.spy(NativeModules.IBGBugReporting, 'setShakingThresholdForiPhone');
  const setShakingThresholdForiPad = sinon.spy(NativeModules.IBGBugReporting, 'setShakingThresholdForiPad');
  const setShakingThresholdForAndroid = sinon.spy(NativeModules.IBGBugReporting, 'setShakingThresholdForAndroid');
  const setExtendedBugReportMode = sinon.spy(NativeModules.IBGBugReporting, 'setExtendedBugReportMode');
  const setReportTypes = sinon.spy(NativeModules.IBGBugReporting, 'setReportTypes');
  const show = sinon.spy(NativeModules.IBGBugReporting, 'show');
  const setOnInvokeHandler = sinon.spy(NativeModules.IBGBugReporting, 'setOnInvokeHandler');
  const setOnSDKDismissedHandler = sinon.spy(NativeModules.IBGBugReporting, 'setOnSDKDismissedHandler');
  const setAutoScreenRecordingEnabled = sinon.spy(NativeModules.IBGBugReporting, 'setAutoScreenRecordingEnabled');
  const setAutoScreenRecordingMaxDuration = sinon.spy(NativeModules.IBGBugReporting, 'setAutoScreenRecordingMaxDuration');
  const setViewHierarchyEnabled = sinon.spy(NativeModules.IBGBugReporting, 'setViewHierarchyEnabled');
  const didSelectPromptOptionHandler = sinon.spy(NativeModules.IBGBugReporting, 'setDidSelectPromptOptionHandler');
  const setFloatingButtonEdge = sinon.spy(NativeModules.IBGBugReporting, 'setFloatingButtonEdge');
  const setEnabledAttachmentTypes = sinon.spy(NativeModules.IBGBugReporting, 'setEnabledAttachmentTypes');
  const setVideoRecordingFloatingButtonPosition = sinon.spy(NativeModules.IBGBugReporting, 'setVideoRecordingFloatingButtonPosition');


  beforeEach(() => {
    setShakingThresholdForiPhone.resetHistory();
    setShakingThresholdForiPad.resetHistory();
    setShakingThresholdForAndroid.resetHistory();
    setOnInvokeHandler.resetHistory();
    setOnSDKDismissedHandler.resetHistory();
    didSelectPromptOptionHandler.resetHistory();
    IBGEventEmitter.removeAllListeners();
  });

  it('should call the native method setBugReportingEnabled', () => {

    BugReporting.setEnabled(true);

    expect(setEnabled.calledOnceWithExactly(true)).toBe(true);

  });

  it('should call the native method setInvocationEvents with an array of invocationEvents', () => {

    const arrayOfInvocationEvents = [BugReporting.invocationEvent.floatingButton, BugReporting.invocationEvent.shake];
    BugReporting.setInvocationEvents(arrayOfInvocationEvents);

    expect(setInvocationEvents.calledOnceWithExactly(arrayOfInvocationEvents)).toBe(true);

  });

  it('should call the native method setInvocationOptions with an array of invocationOptions', () => {

    const arrayOfInvocationOptions = [BugReporting.invocationOptions.commentFieldRequired];
    BugReporting.setInvocationOptions(arrayOfInvocationOptions);

    expect(setOptions.calledOnceWithExactly(arrayOfInvocationOptions)).toBe(true);

  });

  it('should call the native method setShakingThresholdForiPhone with a float', () => {

    Platform.OS = 'ios';
    const value = 2.5;
    BugReporting.setShakingThresholdForiPhone(value);

    expect(setShakingThresholdForiPhone.calledOnceWithExactly(value)).toBe(true);

  });

  it('should not call the native method setShakingThresholdForiPhone when Platform.OS is android', () => {

    Platform.OS = 'android';
    BugReporting.setShakingThresholdForiPhone(2.5);

    expect(setShakingThresholdForiPhone.notCalled).toBe(true);

  });

  it('should call the native method setShakingThresholdForiPad with a float', () => {

    Platform.OS = 'ios';
    const value = 0.6;
    BugReporting.setShakingThresholdForiPad(value);

    expect(setShakingThresholdForiPad.calledOnceWithExactly(value)).toBe(true);

  });

  it('should not call the native method setShakingThresholdForiPad when Platform.OS is android', () => {

    Platform.OS = 'android';
    BugReporting.setShakingThresholdForiPad(0.6);

    expect(setShakingThresholdForiPad.notCalled).toBe(true);

  });

  it('should call the native method setShakingThresholdForAndroid with a float', () => {

    Platform.OS = 'android';
    const value = 350;
    BugReporting.setShakingThresholdForAndroid(value);

    expect(setShakingThresholdForAndroid.calledOnceWithExactly(value)).toBe(true);

  });

  it('should not call the native method setShakingThresholdForAndroid when Platform.OS is android', () => {

    Platform.OS = 'ios';
    BugReporting.setShakingThresholdForAndroid(350);

    expect(setShakingThresholdForAndroid.notCalled).toBe(true);

  });
  
  it('should call the native method setExtendedBugReportMode with a boolean', () => {

    BugReporting.setExtendedBugReportMode(true);

    expect(setExtendedBugReportMode.calledOnceWithExactly(true)).toBe(true);

  });

  it('should call the native method setReportTypes with an array of reportTypes', () => {

    const arrayOfReportTypes = [BugReporting.reportType.bug];
    BugReporting.setReportTypes(arrayOfReportTypes);

    expect(setReportTypes.calledOnceWithExactly(arrayOfReportTypes)).toBe(true);

  });

  it('should call the native method show with a reportType and array of options', () => {

    const reportType = BugReporting.reportType.bug;
    const arrayOfOptions = [BugReporting.invocationOptions.commentFieldRequired];
    BugReporting.show(reportType, arrayOfOptions);

    expect(show.calledOnceWithExactly(reportType, arrayOfOptions)).toBe(true);

  });

  it('should call the native method setOnInvokeHandler with a function', () => {

    const callback = jest.fn()
    BugReporting.onInvokeHandler(callback);

    expect(setOnInvokeHandler.calledOnceWithExactly(callback)).toBe(true);

  });

  it('should invoke callback on emitting the event IBGpreInvocationHandler', () => {

    const callback = jest.fn()
    BugReporting.onInvokeHandler(callback);
    IBGEventEmitter.emit(IBGConstants.ON_INVOKE_HANDLER);

    expect(IBGEventEmitter.getListeners(IBGConstants.ON_INVOKE_HANDLER).length).toEqual(1);
    expect(callback).toHaveBeenCalled();

  });

  it('should call the native method setOnSDKDismissedHandler with a function', () => {

    const callback = jest.fn()
    BugReporting.onSDKDismissedHandler(callback);

    expect(setOnSDKDismissedHandler.calledOnceWithExactly(callback)).toBe(true);

  });

  it('should invoke callback on emitting the event IBGpostInvocationHandler', (done) => {

    const dismissType = 'cancel';
    const reportType = 'bug';
    const callback = (dismiss, report) => {
      expect(dismiss).toBe(dismissType);
      expect(report).toBe(reportType);
      done();
    }
    BugReporting.onSDKDismissedHandler(callback);
    IBGEventEmitter.emit(IBGConstants.ON_SDK_DISMISSED_HANDLER, {dismissType: dismissType, reportType: reportType});

    expect(IBGEventEmitter.getListeners(IBGConstants.ON_SDK_DISMISSED_HANDLER).length).toEqual(1);

  });

  it('should call the native method setAutoScreenRecordingEnabled', () => {

    BugReporting.setAutoScreenRecordingEnabled(true);

    expect(setAutoScreenRecordingEnabled.calledOnceWithExactly(true)).toBe(true);

  });

  it('should call the native method setAutoScreenRecordingMaxDuration', () => {

    BugReporting.setAutoScreenRecordingMaxDuration(30);

    expect(setAutoScreenRecordingMaxDuration.calledOnceWithExactly(30)).toBe(true);

  });

  it('should call the native method setViewHierarchyEnabled', () => {

    BugReporting.setViewHierarchyEnabled(true);

    expect(setViewHierarchyEnabled.calledOnceWithExactly(true)).toBe(true);

  });

  it('should return on calling setDidSelectPromptOptionHandler when Platform is android', () => {

    Platform.OS = 'android';

    BugReporting.setDidSelectPromptOptionHandler(jest.fn());
    IBGEventEmitter.emit(IBGConstants.DID_SELECT_PROMPT_OPTION_HANDLER, {});

    expect(didSelectPromptOptionHandler.notCalled).toBe(true);
    expect(IBGEventEmitter.getListeners(IBGConstants.DID_SELECT_PROMPT_OPTION_HANDLER).length).toEqual(0);
  });

  it('should call the native method didSelectPromptOptionHandler with a function', () => {

    Platform.OS = 'ios';
    const callback = jest.fn()
    BugReporting.setDidSelectPromptOptionHandler(callback);

    expect(didSelectPromptOptionHandler.calledOnceWithExactly(callback)).toBe(true);

  });

  it('should call the native method setFloatingButtonEdge', () => {

    const offsetFromTop = 10;
    const edge = Instabug.floatingButtonEdge.left;
    BugReporting.setFloatingButtonEdge(edge, offsetFromTop);

    expect(setFloatingButtonEdge.calledOnceWithExactly(edge, offsetFromTop)).toBe(true);

  });

  it('should call the native method setEnabledAttachmentTypes', () => {

    BugReporting.setEnabledAttachmentTypes(true, true, false, true);

    expect(setEnabledAttachmentTypes.calledOnceWithExactly(true, true, false, true)).toBe(true);

  });

  it('should call the native method setVideoRecordingFloatingButtonPosition', () => {

    const position = 30;
    BugReporting.setVideoRecordingFloatingButtonPosition(position);

    expect(setVideoRecordingFloatingButtonPosition.calledOnceWithExactly(position)).toBe(true);

  });
});
