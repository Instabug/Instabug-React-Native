import { NativeCrashReporting } from '../native/NativeCrashReporting';
import InstabugUtils from '../utils/InstabugUtils';
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
