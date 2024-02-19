import { Platform } from 'react-native';

import Trace from '../models/Trace';
import { NativeAPM } from '../native/NativeAPM';
import { NativeInstabug } from '../native/NativeInstabug';

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
 * Starts a custom execution trace.
 *
 * Returns a promise which resolves with the trace reference if APM is enabled; otherwise, the promise is rejected.
 *
 * @param name - The name of the trace to start.
 * @returns A promise that resolves with a Trace object.
 *
 * @deprecated Please migrate to the App Flows APIs: {@link startAppFlow}, {@link endFlow}, and {@link setFlowAttribute}.
 */
export const startExecutionTrace = async (name: string): Promise<Trace> => {
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
