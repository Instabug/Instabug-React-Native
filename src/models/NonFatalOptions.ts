import type { NonFatalErrorLevel } from '../utils/Enums';

export interface NonFatalOptions {
  /**
   * An Optional extra user attributes attached to the crash
   * */
  userAttributes?: Record<string, string>;
  /**
   * An Optional key used to customize how crashes are grouped together
   * */
  fingerprint?: string;
  /**
   * An Optional different severity levels for errors
   * */
  level?: NonFatalErrorLevel;
}
