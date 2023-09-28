import { NativeSessionReplay } from '../native/NativeSessionReplay';

/**
 * Enables or disables Session Replay for your Instabug integration.
 *
 * By default, Session Replay is enabled if it is available in your current plan
 *
 * @param isEnabled
 *
 * Example:
 * ```typescript
 * import { SessionReplay } from 'instabug-reactnative';
 *
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
 * Example:
 * ```typescript
 * import { SessionReplay } from 'instabug-reactnative';
 *
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
 * Example:
 * ```typescript
 * import { SessionReplay } from 'instabug-reactnative';
 *
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
 * Example:
 * ```typescript
 * import { SessionReplay } from 'instabug-reactnative';
 *
 * SessionReplay.setReproStepsEnabled(true);
 * ```
 */
export const setUserStepsEnabled = (isEnabled: boolean) => {
  NativeSessionReplay.setUserStepsEnabled(isEnabled);
};
