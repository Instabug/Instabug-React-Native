import '../mocks/mockNativeModules';

import * as CrashReporting from '../../src/modules/CrashReporting';
import { NativeCrashReporting } from '../../src/native/NativeCrashReporting';
import { Platform } from 'react-native';
import { NonFatalErrorLevel } from '../../src';
import { getCrashDataFromError } from '../../src/utils/InstabugUtils';

describe('CrashReporting Module', () => {
  it('should call the native method setEnabled', () => {
    CrashReporting.setEnabled(true);

    expect(NativeCrashReporting.setEnabled).toBeCalledTimes(1);
    expect(NativeCrashReporting.setEnabled).toBeCalledWith(true);
  });

  it('should call the native method sendCrashReporting with JSON object and sendHandledJsCrash as a callback', async () => {
    const error = new TypeError('Invalid type');
    const fingerPrint = 'fingerprint';
    const level = NonFatalErrorLevel.critical;

    await CrashReporting.reportError(error, { fingerprint: fingerPrint, level });
    const crashData = getCrashDataFromError(error);
    expect(NativeCrashReporting.sendHandledJSCrash).toBeCalledWith(
      crashData,
      undefined,
      fingerPrint,
      level,
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
