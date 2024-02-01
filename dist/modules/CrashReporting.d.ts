import type { ExtendedError } from 'react-native/Libraries/Core/Devtools/parseErrorStack';
/**
 * Enables and disables everything related to crash reporting including intercepting
 * errors in the global error handler. It is enabled by default.
 * @param isEnabled
 */
export declare const setEnabled: (isEnabled: boolean) => void;
/**
 * Send handled JS error object
 * @param error Error object to be sent to Instabug's servers
 */
export declare const reportError: (error: ExtendedError) => Promise<void>;
