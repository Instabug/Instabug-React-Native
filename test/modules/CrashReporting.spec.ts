import '../mocks/mockInstabugUtils';

import * as CrashReporting from '../../src/modules/CrashReporting';
import { NativeCrashReporting } from '../../src/native/NativeCrashReporting';
import InstabugUtils from '../../src/utils/InstabugUtils';
import { Platform } from 'react-native';
import { NonFatalErrorType } from '../../src';

describe('CrashReporting Module', () => {
  it('should call the native method setEnabled', () => {
    CrashReporting.setEnabled(true);

    expect(NativeCrashReporting.setEnabled).toBeCalledTimes(1);
    expect(NativeCrashReporting.setEnabled).toBeCalledWith(true);
  });

  it('should call the native method sendCrashReporting with JSON object and sendHandledJsCrash as a callback', () => {
    const error = new TypeError('Invalid type');
    const userAttribute: Map<string, string> | null = null;
    const fingerPrint = 'fingerprint';
    const level = NonFatalErrorType.critical;
    CrashReporting.reportError(error, userAttribute, fingerPrint, level);

    expect(InstabugUtils.sendNonFatalCrashReport).toBeCalledTimes(1);
    expect(InstabugUtils.sendNonFatalCrashReport).toBeCalledWith(
      error,
      userAttribute,
      fingerPrint,
      level,
      NativeCrashReporting.sendHandledJSCrash,
    );
  });

  it('should call the native method setNDKCrashesEnabled for Android platform', () => {
    Platform.OS = 'android';
    CrashReporting.setNDKCrashesEnabled(true);

    expect(NativeCrashReporting.setNDKCrashesEnabled).toBeCalledTimes(1);
    expect(NativeCrashReporting.setNDKCrashesEnabled).toBeCalledWith(true);
  });

  it('should not call the native method setNDKCrashesEnabled for ios platform', () => {
    Platform.OS = 'ios';
    CrashReporting.setNDKCrashesEnabled(true);

    expect(NativeCrashReporting.setNDKCrashesEnabled).not.toBeCalled();
  });
});
