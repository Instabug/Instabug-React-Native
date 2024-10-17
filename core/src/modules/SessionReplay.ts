import { NativeSessionReplay } from '../native/NativeSessionReplay';

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
export const setEnabled = (isEnabled: boolean) => {
  NativeSessionReplay.setEnabled(isEnabled);
};

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
export const setNetworkLogsEnabled = (isEnabled: boolean) => {
  NativeSessionReplay.setNetworkLogsEnabled(isEnabled);
};

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
export const setInstabugLogsEnabled = (isEnabled: boolean) => {
  NativeSessionReplay.setInstabugLogsEnabled(isEnabled);
};

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
export const setUserStepsEnabled = (isEnabled: boolean) => {
  NativeSessionReplay.setUserStepsEnabled(isEnabled);
};

/**
 * Retrieves current session's replay link.
 *
 * @example
 * ```ts
 * SessionReplay.getSessionReplayLink();
 * ```
 */
export const getSessionReplayLink = async (): Promise<string> => {
  return NativeSessionReplay.getSessionReplayLink();
};
