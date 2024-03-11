import Trace from '../models/Trace';
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
 * Starts a custom execution trace.
 *
 * Returns a promise which resolves with the trace reference if APM is enabled; otherwise, the promise is rejected.
 *
 * @param name - The name of the trace to start.
 * @returns A promise that resolves with a Trace object.
 *
 * @deprecated Please migrate to the App Flows APIs: {@link startFlow}, {@link endFlow}, and {@link setFlowAttribute}.
 */
export declare const startExecutionTrace: (name: string) => Promise<Trace>;
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
export declare const startFlow: (name: string) => void;
/**
 * Ends an AppFlow with the given name.
 *
 * @param name - The name of the AppFlow to end. It cannot be an empty string or null.
 */
export declare const endFlow: (name: string) => void;
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
export declare const setFlowAttribute: (name: string, key: string, value?: string) => void;
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
