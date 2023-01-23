import '../mocks/mockInstabugUtils';

import { NativeModules, Platform } from 'react-native';

import * as CrashReporting from '../../src/modules/CrashReporting';
import { NativeCrashReporting } from '../../src/native';
import IBGEventEmitter from '../../src/utils/IBGEventEmitter';
import IBGConstants from '../../src/utils/InstabugConstants';
import InstabugUtils from '../../src/utils/InstabugUtils';

describe('CrashReporting Module', () => {
  it('should call the native method setEnabled', () => {
    CrashReporting.setEnabled(true);

    expect(NativeCrashReporting.setEnabled).toBeCalledTimes(1);
    expect(NativeCrashReporting.setEnabled).toBeCalledWith(true);
  });

  it('should call the native method sendHandledJSCrash when platform is ios', () => {
    Platform.OS = 'ios';
    const errorObject = { name: 'TypeError', message: 'Invalid type' };
    CrashReporting.reportError(errorObject);

    const expectedObject = {
      message: 'TypeError - Invalid type',
      e_message: 'Invalid type',
      e_name: 'TypeError',
      os: 'ios',
      platform: 'react_native',
      exception: 'javascriptStackTrace',
    };

    expect(NativeCrashReporting.sendHandledJSCrash).toBeCalledTimes(1);
    expect(NativeCrashReporting.sendHandledJSCrash).toBeCalledWith(expectedObject);
  });

  it('should call the native method sendHandledJSCrash when platform is android', () => {
    Platform.OS = 'android';
    const errorObject = { name: 'TypeError', message: 'Invalid type' };
    CrashReporting.reportError(errorObject);

    const expectedObject = {
      message: 'TypeError - Invalid type',
      e_message: 'Invalid type',
      e_name: 'TypeError',
      os: 'android',
      platform: 'react_native',
      exception: 'javascriptStackTrace',
    };

    expect(NativeCrashReporting.sendHandledJSCrash).toBeCalledTimes(1);
    expect(NativeCrashReporting.sendHandledJSCrash).toBeCalledWith(JSON.stringify(expectedObject));
  });

  //TODO: finish this
  it('should emit event IBGSendHandledJSCrash with the error object when platform is android', () => {
    Platform.OS = 'android';
    InstabugUtils.isOnReportHandlerSet = jest.fn().mockReturnValue(true);

    const errorObject = { name: 'TypeError', message: 'Invalid type' };
    const expectedObject = {
      message: 'TypeError - Invalid type',
      e_message: 'Invalid type',
      e_name: 'TypeError',
      os: 'android',
      platform: 'react_native',
      exception: 'javascriptStackTrace',
    };

    const crashHandler = jest.fn();
    IBGEventEmitter.addListener(
      NativeModules.Instabug,
      IBGConstants.SEND_HANDLED_CRASH,
      crashHandler,
    );

    CrashReporting.reportError(errorObject);
    expect(crashHandler).toBeCalledTimes(1);
    expect(crashHandler).toBeCalledWith(expectedObject);
  });
});
