import type { ExtendedError } from 'react-native/Libraries/Core/Devtools/parseErrorStack';
import type { NonFatalOptions } from '../models/NonFatalOptions';
/**
 * Enables and disables everything related to crash reporting including intercepting
 * errors in the global error handler. It is enabled by default.
 * @param isEnabled
 */
export declare const setEnabled: (isEnabled: boolean) => void;
/**
 * Send handled JS error object
 * @param error Error object to be sent to Instabug's servers
 * @param nonFatalOptions extra config for the non-fatal error sent with Error Object
 */
export declare const reportError: (error: ExtendedError, nonFatalOptions?: NonFatalOptions) => Promise<void>;
/**
 * Enables and disables capturing native C++ NDK crashes.
 * @param isEnabled
 */
export declare const setNDKCrashesEnabled: (isEnabled: boolean) => void;
