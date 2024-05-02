import { NativeCrashReporting } from '../native/NativeCrashReporting';
import InstabugUtils from '../utils/InstabugUtils';
import { Platform } from 'react-native';
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
 */
export const reportError = (error) => {
    return InstabugUtils.sendCrashReport(error, NativeCrashReporting.sendHandledJSCrash);
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