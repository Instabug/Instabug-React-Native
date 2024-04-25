import type { ExtendedError } from 'react-native/Libraries/Core/Devtools/parseErrorStack';

import { NativeCrashReporting } from '../native/NativeCrashReporting';
import InstabugUtils from '../utils/InstabugUtils';
import { Platform } from 'react-native';
import type { NonFatalErrorType } from '../utils/Enums';

/**
 * Enables and disables everything related to crash reporting including intercepting
 * errors in the global error handler. It is enabled by default.
 * @param isEnabled
 */
export const setEnabled = (isEnabled: boolean) => {
  NativeCrashReporting.setEnabled(isEnabled);
};

/**
 * Send handled JS error object
 * @param error Error object to be sent to Instabug's servers
 * @param userAttributes (Optional) extra user attributes attached to the crash
 * @param fingerprint (Optional) key used to customize how crashes are grouped together
 * @param levelType different severity levels for errors
 */
export const reportError = (
  error: ExtendedError,
  userAttributes: Object | null,
  fingerprint: string | null,
  levelType: NonFatalErrorType,
) => {
  return InstabugUtils.sendNonFatalCrashReport(
    error,
    userAttributes,
    fingerprint,
    levelType,
    NativeCrashReporting.sendHandledJSCrash,
  );
};

/**
 * Enables and disables capturing native C++ NDK crashes.
 * @param isEnabled
 */
export const setNDKCrashesEnabled = (isEnabled: boolean) => {
  if (Platform.OS === 'android') {
    NativeCrashReporting.setNDKCrashesEnabled(isEnabled);
  }
};
