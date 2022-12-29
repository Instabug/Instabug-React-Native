import { Platform } from 'react-native';

import Trace from '../models/Trace';
import { NativeAPM, NativeInstabug } from '../native';
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
export const setLogLevel = (level: logLevel) => {
  NativeAPM.setLogLevel(level);
};

/**
 * Enables or disables APM
 * @param isEnabled
 */
export const setEnabled = (isEnabled: boolean) => {
  NativeAPM.setEnabled(isEnabled);
};

/**
 * Enables or disables APM App Launch
 * @param isEnabled
 */
export const setAppLaunchEnabled = (isEnabled: boolean) => {
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
export const setNetworkEnabledIOS = (isEnabled: boolean) => {
  if (Platform.OS === 'ios') {
    NativeInstabug.setNetworkLoggingEnabled(isEnabled);
  }
};

/**
 * Enables or disables APM UI Responsiveness tracking feature
 * @param isEnabled
 */
export const setAutoUITraceEnabled = (isEnabled: boolean) => {
  NativeAPM.setAutoUITraceEnabled(isEnabled);
};

/**
 * Starts a custom trace
 * Returns a promise, the promise delivers the trace reference if APM is enabled, otherwise it gets rejected
 * @param name
 */
export const startExecutionTrace = (name: string): Promise<Trace> => {
  const TRACE_NOT_STARTED_APM_NOT_ENABLED = `Execution trace "${name}" wasn't created. Please make sure to enable APM first by following the instructions at this link: https://docs.instabug.com/reference#enable-or-disable-apm`;
  const timestamp = Date.now() + '';

  return new Promise((resolve, reject) => {
    NativeAPM.startExecutionTrace(name, timestamp, (id: string | null) => {
      if (id) {
        resolve(new Trace(id, name));
      } else {
        reject(new Error(TRACE_NOT_STARTED_APM_NOT_ENABLED));
      }
    });
  });
};

/**
 * Starts a custom trace
 * @param name
 */
export const startUITrace = (name: string) => {
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
