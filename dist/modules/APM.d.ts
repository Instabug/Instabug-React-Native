import Trace from '../models/Trace';
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
export declare const setLogLevel: (level: logLevel) => void;
/**
 * Enables or disables APM
 * @param isEnabled
 */
export declare const setEnabled: (isEnabled: boolean) => void;
/**
 * Enables or disables APM App Launch
 * @param isEnabled
 */
export declare const setAppLaunchEnabled: (isEnabled: boolean) => void;
/**
 * Ends app launch
 */
export declare const endAppLaunch: () => void;
/**
 * Enables or disables APM Network Metric
 * @param isEnabled
 */
export declare const setNetworkEnabledIOS: (isEnabled: boolean) => void;
/**
 * Enables or disables APM UI Responsiveness tracking feature
 * @param isEnabled
 */
export declare const setAutoUITraceEnabled: (isEnabled: boolean) => void;
/**
 * Starts a custom trace
 * Returns a promise, the promise delivers the trace reference if APM is enabled, otherwise it gets rejected
 * @param name
 */
export declare const startExecutionTrace: (name: string) => Promise<Trace>;
/**
 * Starts a custom trace
 * @param name
 */
export declare const startUITrace: (name: string) => void;
/**
 * Ends a custom trace
 */
export declare const endUITrace: () => void;
/**
 * Used for internal testing.
 */
export declare const _ibgSleep: () => void;
