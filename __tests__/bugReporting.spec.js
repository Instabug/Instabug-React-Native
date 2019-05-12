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

  beforeEach(() => {
    setShakingThresholdForiPhone.resetHistory();
    setShakingThresholdForiPad.resetHistory();
    setShakingThresholdForAndroid.resetHistory();
    setPreInvocationHandler.resetHistory();
    setPostInvocationHandler.resetHistory();
  });

  it('should call the native method setBugReportingEnabled', () => {

    BugReporting.setEnabled(true);

    expect(setBugReportingEnabled.calledOnce).toBe(true);
    expect(setBugReportingEnabled.calledWith(true)).toBe(true);

  });

  it('should call the native method setInvocationEvents with an array of invocationEvents', () => {

    const arrayOfInvocationEvents = [BugReporting.invocationEvent.floatingButton, BugReporting.invocationEvent.shake];
    BugReporting.setInvocationEvents(arrayOfInvocationEvents);

    expect(setInvocationEvents.calledOnce).toBe(true);
    expect(setInvocationEvents.calledWith(arrayOfInvocationEvents)).toBe(true);

  });

  it('should call the native method setInvocationOptions with an array of invocationOptions', () => {

    const arrayOfInvocationOptions = [BugReporting.invocationOptions.commentFieldRequired];
    BugReporting.setInvocationOptions(arrayOfInvocationOptions);

    expect(setInvocationOptions.calledOnce).toBe(true);
    expect(setInvocationOptions.calledWith(arrayOfInvocationOptions)).toBe(true);

  });

  it('should call the native method setShakingThresholdForiPhone with a float', () => {

    Platform.OS = 'ios';
    const value = 2.5;
    BugReporting.setShakingThresholdForiPhone(value);

    expect(setShakingThresholdForiPhone.calledOnce).toBe(true);
    expect(setShakingThresholdForiPhone.calledWith(value)).toBe(true);

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

    expect(setShakingThresholdForiPad.calledOnce).toBe(true);
    expect(setShakingThresholdForiPad.calledWith(value)).toBe(true);

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

    expect(setShakingThresholdForAndroid.calledOnce).toBe(true);
    expect(setShakingThresholdForAndroid.calledWith(value)).toBe(true);

  });

  it('should not call the native method setShakingThresholdForAndroid when Platform.OS is android', () => {

    Platform.OS = 'ios';
    BugReporting.setShakingThresholdForAndroid(350);

    expect(setShakingThresholdForAndroid.notCalled).toBe(true);

  });
  
  it('should call the native method setExtendedBugReportMode with a boolean', () => {

    BugReporting.setExtendedBugReportMode(true);

    expect(setExtendedBugReportMode.calledOnce).toBe(true);
    expect(setExtendedBugReportMode.calledWith(true)).toBe(true);

  });

  it('should call the native method setReportTypes with an array of reportTypes', () => {

    const arrayOfReportTypes = [BugReporting.reportType.bug];
    BugReporting.setReportTypes(arrayOfReportTypes);

    expect(setReportTypes.calledOnce).toBe(true);
    expect(setReportTypes.calledWith(arrayOfReportTypes)).toBe(true);

  });

  it('should call the native method showBugReportingWithReportTypeAndOptions with a reportType and array of options', () => {

    const reportType = BugReporting.reportType.bug;
    const arrayOfOptions = [BugReporting.invocationOptions.commentFieldRequired];
    BugReporting.show(reportType, arrayOfOptions);

    expect(showBugReportingWithReportTypeAndOptions.calledOnce).toBe(true);
    expect(showBugReportingWithReportTypeAndOptions.calledWith(reportType, arrayOfOptions)).toBe(true);

  });

  it('should call the native method setPreInvocationHandler with a function', () => {

    const callback = jest.fn()
    BugReporting.onInvokeHandler(callback);

    expect(setPreInvocationHandler.calledOnce).toBe(true);
    expect(setPreInvocationHandler.calledWith(callback)).toBe(true);

  });

  it('should invoke callback on emitting the event IBGpreInvocationHandler', () => {

    const callback = jest.fn()
    BugReporting.onInvokeHandler(callback);
    IBGEventEmitter.emit(IBGConstants.ON_INVOKE_HANDLER);

    expect(callback).toHaveBeenCalled();

  });

  it('should call the native method setPostInvocationHandler with a function', () => {

    const callback = jest.fn()
    BugReporting.onSDKDismissedHandler(callback);

    expect(setPostInvocationHandler.calledOnce).toBe(true);
    expect(setPostInvocationHandler.calledWith(callback)).toBe(true);

  });

  it('should invoke callback on emitting the event IBGpostInvocationHandler', () => {

    const callback = jest.fn()
    const dismissType = 'cancel';
    const reportType = 'bug';
    BugReporting.onSDKDismissedHandler(callback);
    IBGEventEmitter.emit(IBGConstants.ON_SDK_DISMISSED_HANDLER, {dismissType: dismissType, reportType: reportType});

    expect(callback).toHaveBeenCalledWith(dismissType, reportType);

  });

});
