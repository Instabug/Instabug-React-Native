import { Platform } from 'react-native';
import type { ExtendedError } from 'react-native/Libraries/Core/Devtools/parseErrorStack';

import { NativeCrashReporting } from '../native';
import InstabugUtils from '../utils/InstabugUtils';

/**
 * Enables and disables everything related to crash reporting including intercepting
 * errors in the global error handler. It is enabled by default.
 * @param isEnabled
 */
export const setEnabled = (isEnabled: boolean) => {
  NativeCrashReporting.setEnabled(isEnabled);
};

/**
 * @deprecated Use {@link reportError} instead.
 * Send handled JS error object
 * @param error Error object to be sent to Instabug's servers
 */
export const reportJSException = (error: any) => {
  if (error instanceof Error) {
    reportError(error);
  }
};

/**
 * Send handled JS error object
 * @param error Error object to be sent to Instabug's servers
 */
export const reportError = (error: ExtendedError) => {
  const jsStackTrace = InstabugUtils.getStackTrace(error);

  const jsonObject = {
    message: error.name + ' - ' + error.message,
    e_message: error.message,
    e_name: error.name,
    os: Platform.OS,
    platform: 'react_native',
    exception: jsStackTrace,
  };

  if (Platform.OS === 'android') {
    NativeCrashReporting.sendHandledJSCrash(JSON.stringify(jsonObject));
  } else {
    NativeCrashReporting.sendHandledJSCrash(jsonObject);
  }
};
