import type { InvocationEvent, LogLevel, NetworkInterceptionMode } from '../utils/Enums';
export interface InstabugConfig {
    /**
     * The token that identifies the app. You can find it on your dashboard.
     */
    token: string;
    /**
     * An array of events that invoke the SDK's UI.
     */
    invocationEvents: InvocationEvent[];
    /**
     * An optional LogLevel to indicate the verbosity of SDK logs. Default is Error.
     */
    debugLogsLevel?: LogLevel;
    /**
     * An optional code push version to be used for all reports.
     */
    codePushVersion?: string;
    /**
     * An optional network interception mode, this determines whether network interception
     * is done in the JavaScript side or in the native Android and iOS SDK side.
     *
     * When set to `NetworkInterceptionMode.native`, configuring network logging
     * should be done through native code not JavaScript (e.g. network request obfuscation).
     *
     * @default NetworkInterceptionMode.javascript
     */
    networkInterceptionMode?: NetworkInterceptionMode;
}
