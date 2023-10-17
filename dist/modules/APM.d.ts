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
