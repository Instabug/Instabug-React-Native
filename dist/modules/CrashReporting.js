import { NativeCrashReporting } from '../native/NativeCrashReporting';
import InstabugUtils from '../utils/InstabugUtils';
import { Platform } from 'react-native';
import { NonFatalErrorLevel } from '../utils/Enums';
/**
 * Enables and disables everything related to crash reporting including intercepting
 * errors in the global error handler. It is enabled by default.
 * @param isEnabled
 */
export const setEnabled = (isEnabled) => {
    NativeCrashReporting.setEnabled(isEnabled);
};
/**
 * Send handled JS error object
 * @param error Error object to be sent to Instabug's servers
 * @param nonFatalOptions extra config for the non-fatal error sent with Error Object
 */
export const reportError = (error, nonFatalOptions = {}) => {
    if (error instanceof Error) {
        let level = NonFatalErrorLevel.error;
        if (nonFatalOptions.level != null) {
            level = nonFatalOptions.level;
        }
        return InstabugUtils.sendCrashReport(error, (data) => NativeCrashReporting.sendHandledJSCrash(data, nonFatalOptions.userAttributes, nonFatalOptions.fingerprint, level));
    }
    else {
        console.warn(`IBG-RN: The error ${error} has been omitted because only error type is supported.`);
        return;
    }
};
/**
 * Enables and disables capturing native C++ NDK crashes.
 * @param isEnabled
 */
export const setNDKCrashesEnabled = (isEnabled) => {
    if (Platform.OS === 'android') {
        NativeCrashReporting.setNDKCrashesEnabled(isEnabled);
    }
};
