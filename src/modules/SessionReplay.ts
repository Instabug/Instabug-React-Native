import { NativeSessionReplay, NativeEvents, emitter } from '../native/NativeSessionReplay';
import type { LaunchType } from '../utils/Enums';
export interface networkLog {
  url: string;
  duration: number;
  statusCode: number;
}

export interface sessionData {
  appVersion: string;
  OS: string;
  device: string;
  sessionDurationInSeconds: number;
  networkLogs: Array<networkLog>;
  launchType: LaunchType;
  hasLinkToAppReview: boolean;
  launchDuration: number;
  bugsCount?: number;
  fatalCrashCount?: number;
  oomCrashCount?: number;
}
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

/**
 * Set a callback for weather this session should sync
 *
 * @param handler

 * @example
 * ```ts
 * SessionReplay.setSyncCallback((payload)=>{
 *    if(payload.device == "Xiaomi M2007J3SY" &&
 *         payload.os == "OS Level 33" &&
 *         payload.appVersion == "3.1.4 (4)" ||
 *         payload.sessionDurationInSeconds > 20 )
 *    {return true}
 * });
 * ```
 */
export const setSyncCallback = async (
  handler: (payload: sessionData) => boolean,
): Promise<void> => {
  emitter.addListener(NativeEvents.SESSION_REPLAY_ON_SYNC_CALLBACK_INVOCATION, (payload) => {
    const result = handler(payload);
    const shouldSync = Boolean(result);

    if (typeof result !== 'boolean') {
      console.warn(
        `IBG-RN: The callback passed to SessionReplay.setSyncCallback was expected to return a boolean but returned "${result}". The value has been cast to boolean, proceeding with ${shouldSync}.`,
      );
    }

    NativeSessionReplay.evaluateSync(shouldSync);
  });

  return NativeSessionReplay.setSyncCallback();
};
