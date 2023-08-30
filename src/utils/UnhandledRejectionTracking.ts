import tracking, { RejectionTrackingOptions } from 'promise/setimmediate/rejection-tracking';
import { errorifyIfNotError, sendCrashReport } from './InstabugUtils';
import { NativeCrashReporting } from '../native/NativeCrashReporting';

interface HermesInternalType {
  enablePromiseRejectionTracker?: (options?: RejectionTrackingOptions) => void;
  hasPromise?: () => boolean;
}

/**
 * A typed version of the `HermesInternal` global object with the properties
 * we use.
 */
const _hermes = (global as any).HermesInternal as HermesInternalType | null;

/**
 * Checks whether the Promise object is provided by Hermes.
 *
 * @returns whether the `Promise` object is provided by Hermes.
 */
function _isHermesPromise(): boolean {
  const hasPromise = _hermes?.hasPromise?.() === true;
  const canTrack = _hermes?.enablePromiseRejectionTracker != null;

  return hasPromise && canTrack;
}

/**
 * Enables unhandled Promise rejection tracking in Hermes.
 *
 * @param options Rejection tracking options.
 */
function _enableHermesRejectionTracking(options?: RejectionTrackingOptions) {
  _hermes!.enablePromiseRejectionTracker!(options);
}

/**
 * Enables unhandled Promise rejection tracking in the default `promise` polyfill.
 *
 * @param options Rejection tracking options.
 */
function _enableDefaultRejectionTracking(options?: RejectionTrackingOptions) {
  tracking.enable(options);
}

/**
 * Tracks whether an unhandled Promise rejection happens and reports it.
 */
export function captureUnhandledRejections() {
  const options: RejectionTrackingOptions = {
    allRejections: true,
    onUnhandled: _onUnhandled,
  };

  if (_isHermesPromise()) {
    _enableHermesRejectionTracking(options);
  } else {
    _enableDefaultRejectionTracking(options);
  }
}

/**
 * The callback passed in the rejection tracking options to report unhandled
 * Promise rejection
 */
function _onUnhandled(id: number, rejection: unknown) {
  _originalOnUnhandled(id, rejection);

  if (__DEV__) {
    return;
  }

  const error = errorifyIfNotError(rejection);

  sendCrashReport(error, NativeCrashReporting.sendHandledJSCrash);
}

/**
 * The default unhandled promise rejection handler set by React Native.
 *
 * In fact, this is copied from the React Native repo but modified to work well
 * with our static analysis setup.
 *
 * https://github.com/facebook/react-native/blob/f2447e6048a6b519c3333767d950dbf567149b75/packages/react-native/Libraries/promiseRejectionTrackingOptions.js#L15-L49
 */
function _originalOnUnhandled(id: number, rejection: unknown = {}) {
  let message: string;
  let stack: string | undefined;

  const stringValue = Object.prototype.toString.call(rejection);
  if (stringValue === '[object Error]') {
    message = Error.prototype.toString.call(rejection);
    const error = rejection as Error;
    stack = error.stack;
  } else {
    try {
      message = require('pretty-format')(rejection);
    } catch {
      message = typeof rejection === 'string' ? rejection : JSON.stringify(rejection);
    }
  }

  const warning =
    `Possible Unhandled Promise Rejection (id: ${id}):\n` +
    `${message ?? ''}\n` +
    (stack == null ? '' : stack);
  console.warn(warning);
}
