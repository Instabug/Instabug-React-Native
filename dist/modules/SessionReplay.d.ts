import type { SessionMetadata } from '../models/SessionMetadata';
/**
 * Enables or disables Session Replay for your Instabug integration.
 *
 * By default, Session Replay is enabled if it is available in your current plan
 *
 * @param isEnabled
 *
 * @example
 * ```ts
 * SessionReplay.setEnabled(true);
 * ```
 */
export declare const setEnabled: (isEnabled: boolean) => void;
/**
 * Enables or disables network logs for Session Replay.
 *
 * By default, network logs are enabled.
 *
 * @param isEnabled
 *
 * @example
 * ```ts
 * SessionReplay.setNetworkLogsEnabled(true);
 * ```
 */
export declare const setNetworkLogsEnabled: (isEnabled: boolean) => void;
/**
 * Enables or disables Instabug logs for Session Replay.
 *
 * By default, Instabug logs are enabled.
 *
 * @param isEnabled
 *
 * @example
 * ```ts
 * SessionReplay.setInstabugLogsEnabled(true);
 * ```
 */
export declare const setInstabugLogsEnabled: (isEnabled: boolean) => void;
/**
 * Enables or disables capturing of user steps  for Session Replay.
 *
 * By default, user steps are enabled.
 *
 * @param isEnabled
 *
 * @example
 * ```ts
 * SessionReplay.setUserStepsEnabled(true);
 * ```
 */
export declare const setUserStepsEnabled: (isEnabled: boolean) => void;
/**
 * Retrieves current session's replay link.
 *
 * @example
 * ```ts
 * SessionReplay.getSessionReplayLink();
 * ```
 */
export declare const getSessionReplayLink: () => Promise<string>;
/**
 * Set a callback for whether this session should sync
 *
 * @param handler

 * @example
 * ```ts
 * SessionReplay.setSyncCallback((metadata) => {
 *    return metadata.device == "Xiaomi M2007J3SY" &&
 *         metadata.os == "OS Level 33" &&
 *         metadata.appVersion == "3.1.4 (4)" ||
 *         metadata.sessionDurationInSeconds > 20;
 * });
 * ```
 */
export declare const setSyncCallback: (handler: (payload: SessionMetadata) => boolean) => Promise<void>;
