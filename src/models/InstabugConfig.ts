import type { invocationEvent } from '../utils/ArgsRegistry';
import type { InvocationEvent, LogLevel } from '../utils/Enums';

export interface InstabugConfig {
  /**
   * The token that identifies the app. You can find it on your dashboard.
   */
  token: string;
  /**
   * An array of events that invoke the SDK's UI.
   */
  invocationEvents: invocationEvent[] | InvocationEvent[];
  /**
   * An optional CodePush version label. Default is an empty string.
   * The version name and code are read from the native files
   * build.gradle and Info.plist for Android and iOS respectively.
   */
  codePushLabel?: string;
  /**
   * An optional LogLevel to indicate the verbosity of SDK logs. Default is Error.
   */
  debugLogsLevel?: LogLevel;
}
