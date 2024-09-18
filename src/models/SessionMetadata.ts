import type { LaunchType } from '../utils/Enums';

/**
 * network log item
 */
export interface NetworkLog {
  url: string;
  duration: number;
  statusCode: number;
}

export interface SessionMetadata {
  /**
   * app version of the session
   */
  appVersion: string;
  /**
   * operating system of the session
   */
  OS: string;
  /**
   * mobile device model of the session
   */
  device: string;
  /**
   * session duration in seconds
   */
  sessionDurationInSeconds: number;
  /**
   * list of netwrok requests occurred during the session
   */
  networkLogs: NetworkLog[];
  /**
   * launch type of the session
   */
  launchType: LaunchType;
  /**
   * is an in-app review occurred in the previous session.
   */
  hasLinkToAppReview: boolean;
  /**
   * app launch duration
   */
  launchDuration: number;
  /**
   * number of bugs in the session
   */
  bugsCount?: number;
  /**
   * number of fetal crashes in the session
   */
  fatalCrashCount?: number;
  /**
   * number of out of memory crashes in the session
   */
  oomCrashCount?: number;
}
