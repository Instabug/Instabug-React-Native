import '../mocks/mockInstabugUtils';

import { Platform } from 'react-native';

import * as CrashReporting from '../../src/modules/CrashReporting';
import { NativeCrashReporting } from '../../src/native';

describe('CrashReporting Module', () => {
  it('should call the native method setEnabled', () => {
    CrashReporting.setEnabled(true);

    expect(NativeCrashReporting.setEnabled).toBeCalledTimes(1);
    expect(NativeCrashReporting.setEnabled).toBeCalledWith(true);
  });

  it('should call the native method sendHandledJSCrash with JSON object when platform is iOS', () => {
    Platform.OS = 'ios';
    const error = { name: 'TypeError', message: 'Invalid type' };
    CrashReporting.reportError(error);

    const expected = {
      message: 'TypeError - Invalid type',
      e_message: 'Invalid type',
      e_name: 'TypeError',
      os: 'ios',
      platform: 'react_native',
      exception: 'javascriptStackTrace',
    };

    expect(NativeCrashReporting.sendHandledJSCrash).toBeCalledTimes(1);
    expect(NativeCrashReporting.sendHandledJSCrash).toBeCalledWith(expected);
  });

  it('should call the native method sendHandledJSCrash with stringified JSON object when platform is Android', () => {
    Platform.OS = 'android';
    const error = { name: 'TypeError', message: 'Invalid type' };
    CrashReporting.reportError(error);

    const expected = JSON.stringify({
      message: 'TypeError - Invalid type',
      e_message: 'Invalid type',
      e_name: 'TypeError',
      os: 'android',
      platform: 'react_native',
      exception: 'javascriptStackTrace',
    });

    expect(NativeCrashReporting.sendHandledJSCrash).toBeCalledTimes(1);
    expect(NativeCrashReporting.sendHandledJSCrash).toBeCalledWith(expected);
  });
});
