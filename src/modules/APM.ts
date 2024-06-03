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
 * @deprecated Please migrate to the App Flows APIs: {@link startFlow}, {@link endFlow}, and {@link setFlowAttribute}.
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
 * Starts an AppFlow with the specified name.
 *
 * On starting two flows with the same name, the older flow will end with a force abandon end reason.
 * The AppFlow name cannot exceed 150 characters; otherwise, it's truncated,
 * leading and trailing whitespaces are also ignored.
 *
 * @param name - The name of the AppFlow. It cannot be an empty string or null.
 *               A new AppFlow is started if APM is enabled, the feature is enabled,
 *               and the Instabug SDK is initialized.
 */
export const startFlow = (name: string) => {
  NativeAPM.startFlow(name);
};

/**
 * Ends an AppFlow with the given name.
 *
 * @param name - The name of the AppFlow to end. It cannot be an empty string or null.
 */
export const endFlow = (name: string) => {
  NativeAPM.endFlow(name);
};

/**
 * Sets custom attributes for an AppFlow with a given name.
 *
 * Setting an attribute value to null will remove the corresponding key if it already exists.
 * Attribute keys cannot exceed 30 characters and leading/trailing whitespaces are ignored.
 * Empty strings or null for attribute keys are not accepted.
 *
 * Attribute values cannot exceed 60 characters and leading/trailing whitespaces are ignored.
 * Empty strings for attribute values are not accepted, but null can be used to remove an attribute.
 *
 * If an AppFlow is ended, attributes will not be added and existing ones will not be updated.
 *
 * @param name - The name of the AppFlow. It cannot be an empty string or null.
 * @param key - The key of the attribute. It cannot be an empty string or null.
 * @param [value] - The value of the attribute. It cannot be an empty string. Use null to remove the attribute.
 */

export const setFlowAttribute = (name: string, key: string, value?: string | null) => {
  NativeAPM.setFlowAttribute(name, key, value);
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

/**
 * Returns weather W3C key flag is enabled
 */
export const _getw3ExternalTraceIDEnabled = async (): Promise<boolean> => {
  const isw3ExternalTraceIDEnabled = await NativeAPM.getw3ExternalTraceIDEnabled();
  return isw3ExternalTraceIDEnabled;
};

/**
 * Returns weather we should generate W3C header
 */
export const _getw3ExternalGeneratedHeaderEnabled = async (): Promise<boolean> => {
  const isExternalGeneratedHeaderEnabled = await NativeAPM.getw3ExternalGeneratedHeaderEnabled();
  return isExternalGeneratedHeaderEnabled;
};

/**
 * Returns weather W3C was caught
 */
export const _getW3CaughtHeaderEnabled = async (): Promise<boolean> => {
  const isW3CaughtHeaderEnabled = await NativeAPM.getW3CaughtHeaderEnabled();
  return isW3CaughtHeaderEnabled;
};
