import type { ExtendedError } from 'react-native/Libraries/Core/Devtools/parseErrorStack';
/**
 * Enables and disables everything related to crash reporting including intercepting
 * errors in the global error handler. It is enabled by default.
 * @param isEnabled
 */
export declare const setEnabled: (isEnabled: boolean) => void;
/**
 * @deprecated Use {@link reportError} instead.
 * Send handled JS error object
 * @param error Error object to be sent to Instabug's servers
 */
export declare const reportJSException: (error: any) => void;
/**
 * Send handled JS error object
 * @param error Error object to be sent to Instabug's servers
 */
export declare const reportError: (error: ExtendedError) => void;
