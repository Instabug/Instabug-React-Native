import { RejectionTrackingOptions } from 'promise/setimmediate/rejection-tracking';
export interface HermesInternalType {
    enablePromiseRejectionTracker?: (options?: RejectionTrackingOptions) => void;
    hasPromise?: () => boolean;
}
/**
 * Tracks whether an unhandled Promise rejection happens and reports it.
 */
export declare function captureUnhandledRejections(): void;
