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
import IBGEventEmitter from '../utils/IBGEventEmitter';
import IBGConstants from '../utils/InstabugConstants';
import sinon from 'sinon';



describe('Testing BugReporting Module', () => {
  
  const setBugReportingEnabled = sinon.spy(NativeModules.Instabug, 'setBugReportingEnabled');
  const setInvocationEvents = sinon.spy(NativeModules.Instabug, 'setInvocationEvents');
  const setInvocationOptions = sinon.spy(NativeModules.Instabug, 'setInvocationOptions');
  const setShakingThresholdForiPhone = sinon.spy(NativeModules.Instabug, 'setShakingThresholdForiPhone');
  const setShakingThresholdForiPad = sinon.spy(NativeModules.Instabug, 'setShakingThresholdForiPad');
  const setShakingThresholdForAndroid = sinon.spy(NativeModules.Instabug, 'setShakingThresholdForAndroid');
  const setExtendedBugReportMode = sinon.spy(NativeModules.Instabug, 'setExtendedBugReportMode');
  const setReportTypes = sinon.spy(NativeModules.Instabug, 'setReportTypes');
  const showBugReportingWithReportTypeAndOptions = sinon.spy(NativeModules.Instabug, 'showBugReportingWithReportTypeAndOptions');
  const setPreInvocationHandler = sinon.spy(NativeModules.Instabug, 'setPreInvocationHandler');
  const setPostInvocationHandler = sinon.spy(NativeModules.Instabug, 'setPostInvocationHandler');
  const setAutoScreenRecordingEnabled = sinon.spy(NativeModules.Instabug, 'setAutoScreenRecordingEnabled');
  const setAutoScreenRecordingMaxDuration = sinon.spy(NativeModules.Instabug, 'setAutoScreenRecordingMaxDuration');
  const setViewHierarchyEnabled = sinon.spy(NativeModules.Instabug, 'setViewHierarchyEnabled');

  beforeEach(() => {
    setShakingThresholdForiPhone.resetHistory();
    setShakingThresholdForiPad.resetHistory();
    setShakingThresholdForAndroid.resetHistory();
    setPreInvocationHandler.resetHistory();
    setPostInvocationHandler.resetHistory();
    IBGEventEmitter.removeAllListeners();
  });

  it('should call the native method setBugReportingEnabled', () => {

    BugReporting.setEnabled(true);

    expect(setBugReportingEnabled.calledOnceWithExactly(true)).toBe(true);

  });

  it('should call the native method setInvocationEvents with an array of invocationEvents', () => {

    const arrayOfInvocationEvents = [BugReporting.invocationEvent.floatingButton, BugReporting.invocationEvent.shake];
    BugReporting.setInvocationEvents(arrayOfInvocationEvents);

    expect(setInvocationEvents.calledOnceWithExactly(arrayOfInvocationEvents)).toBe(true);

  });

  it('should call the native method setInvocationOptions with an array of invocationOptions', () => {

    const arrayOfInvocationOptions = [BugReporting.invocationOptions.commentFieldRequired];
    BugReporting.setInvocationOptions(arrayOfInvocationOptions);

    expect(setInvocationOptions.calledOnceWithExactly(arrayOfInvocationOptions)).toBe(true);

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

  it('should call the native method showBugReportingWithReportTypeAndOptions with a reportType and array of options', () => {

    const reportType = BugReporting.reportType.bug;
    const arrayOfOptions = [BugReporting.invocationOptions.commentFieldRequired];
    BugReporting.show(reportType, arrayOfOptions);

    expect(showBugReportingWithReportTypeAndOptions.calledOnceWithExactly(reportType, arrayOfOptions)).toBe(true);

  });

  it('should call the native method setPreInvocationHandler with a function', () => {

    const callback = jest.fn()
    BugReporting.onInvokeHandler(callback);

    expect(setPreInvocationHandler.calledOnceWithExactly(callback)).toBe(true);

  });

  it('should invoke callback on emitting the event IBGpreInvocationHandler', () => {

    const callback = jest.fn()
    BugReporting.onInvokeHandler(callback);
    IBGEventEmitter.emit(IBGConstants.ON_INVOKE_HANDLER);

    expect(IBGEventEmitter.getListeners(IBGConstants.ON_INVOKE_HANDLER).length).toEqual(1);
    expect(callback).toHaveBeenCalled();

  });

  it('should call the native method setPostInvocationHandler with a function', () => {

    const callback = jest.fn()
    BugReporting.onSDKDismissedHandler(callback);

    expect(setPostInvocationHandler.calledOnceWithExactly(callback)).toBe(true);

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

});
