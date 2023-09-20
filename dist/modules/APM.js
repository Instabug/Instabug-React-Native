import { Platform } from 'react-native';
import Trace from '../models/Trace';
import { NativeAPM } from '../native/NativeAPM';
import { NativeInstabug } from '../native/NativeInstabug';
import { logLevel } from '../utils/ArgsRegistry';
export { logLevel };
/**
 * @deprecated Pass a LogLevel to debugLogsLevel in Instabug.init instead.
 *
 * Sets the printed logs priority. Filter to one of the following levels:
 *
 * - `logLevelNone` disables all APM SDK console logs.
 * - `logLevelError` prints errors only, we use this level to let you know if something goes wrong.
 * - `logLevelWarning` displays warnings that will not necessarily lead to errors but should be addressed nonetheless.
 * - `logLevelInfo` (default) logs information that we think is useful without being too verbose.
 * - `logLevelDebug` use this in case you are debugging an issue. Not recommended for production use.
 * - `logLevelVerbose` use this only if `logLevelDebug` was not enough and you need more visibility
 *   on what is going on under the hood. Similar to the `logLevelDebug` level, this is not meant
 *   to be used on production environments.
 *
 * Each log level will also include logs from all the levels above it. For instance,
 * `logLevelInfo` will include `logLevelInfo` logs as well as `logLevelWarning`
 * and `logLevelError` logs.
 *
 * @param level the printed logs priority.
 */
export const setLogLevel = (level) => {
    NativeAPM.setLogLevel(level);
};
/**
 * Enables or disables APM
 * @param isEnabled
 */
export const setEnabled = (isEnabled) => {
    NativeAPM.setEnabled(isEnabled);
};
/**
 * Enables or disables APM App Launch
 * @param isEnabled
 */
export const setAppLaunchEnabled = (isEnabled) => {
    NativeAPM.setAppLaunchEnabled(isEnabled);
};
/**
 * Ends app launch
 */
export const endAppLaunch = () => {
    NativeAPM.endAppLaunch();
};
/**
 * Enables or disables APM Network Metric
 * @param isEnabled
 */
export const setNetworkEnabledIOS = (isEnabled) => {
    if (Platform.OS === 'ios') {
        NativeInstabug.setNetworkLoggingEnabled(isEnabled);
    }
};
/**
 * Enables or disables APM UI Responsiveness tracking feature
 * @param isEnabled
 */
export const setAutoUITraceEnabled = (isEnabled) => {
    NativeAPM.setAutoUITraceEnabled(isEnabled);
};
/**
 * Starts a custom trace
 * Returns a promise, the promise delivers the trace reference if APM is enabled, otherwise it gets rejected
 * @param name
 */
export const startExecutionTrace = async (name) => {
    const TRACE_NOT_STARTED_APM_NOT_ENABLED = `Execution trace "${name}" wasn't created. Please make sure to enable APM first by following the instructions at this link: https://docs.instabug.com/reference#enable-or-disable-apm`;
    const timestamp = Date.now() + '';
    const id = await NativeAPM.startExecutionTrace(name, timestamp);
    if (!id) {
        throw new Error(TRACE_NOT_STARTED_APM_NOT_ENABLED);
    }
    return new Trace(id, name);
};
/**
 * Starts a custom trace
 * @param name
 */
export const startUITrace = (name) => {
    NativeAPM.startUITrace(name);
};
/**
 * Ends a custom trace
 */
export const endUITrace = () => {
    NativeAPM.endUITrace();
};
/**
 * Used for internal testing.
 */
export const _ibgSleep = () => {
    NativeAPM.ibgSleep();
};
