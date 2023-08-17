import '../mocks/mockInstabugUtils';

import * as CrashReporting from '../../src/modules/CrashReporting';
import { NativeCrashReporting } from '../../src/native/NativeCrashReporting';
import InstabugUtils from '../../src/utils/InstabugUtils';

describe('CrashReporting Module', () => {
  it('should call the native method setEnabled', () => {
    CrashReporting.setEnabled(true);

    expect(NativeCrashReporting.setEnabled).toBeCalledTimes(1);
    expect(NativeCrashReporting.setEnabled).toBeCalledWith(true);
  });

  it('should call the native method sendCrashReporting with JSON object and sendHandledJsCrash as a callback', () => {
    const error = { name: 'TypeError', message: 'Invalid type' };
    CrashReporting.reportError(error);

    expect(InstabugUtils.sendCrashReport).toBeCalledTimes(1);
    expect(InstabugUtils.sendCrashReport).toBeCalledWith(
      error,
      NativeCrashReporting.sendHandledJSCrash,
    );
  });
});
