import tracking, { RejectionTrackingOptions } from 'promise/setimmediate/rejection-tracking';
import { sendCrashReport } from './InstabugUtils';
import { NativeCrashReporting } from '../native/NativeCrashReporting';
import { NonFatalErrorLevel } from './Enums';
import { Logger } from './logger';

export interface HermesInternalType {
  enablePromiseRejectionTracker?: (options?: RejectionTrackingOptions) => void;
  hasPromise?: () => boolean;
}

/**
 * A typed version of the `HermesInternal` global object with the properties
 * we use.
 */
function _getHermes(): HermesInternalType | null {
  return (global as any).HermesInternal;
}

/**
 * Checks whether the Promise object is provided by Hermes.
 *
 * @returns whether the `Promise` object is provided by Hermes.
 */
function _isHermesPromise() {
  const hermes = _getHermes();
  const hasPromise = hermes?.hasPromise?.() === true;
  const canTrack = hermes?.enablePromiseRejectionTracker != null;

  return hasPromise && canTrack;
}

/**
 * Enables unhandled Promise rejection tracking in Hermes.
 *
 * @param options Rejection tracking options.
 */
function _enableHermesRejectionTracking(options?: RejectionTrackingOptions) {
  const hermes = _getHermes();

  hermes!.enablePromiseRejectionTracker!(options);
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

  if (rejection instanceof Error) {
    sendCrashReport(rejection, (error) =>
      NativeCrashReporting.sendHandledJSCrash(error, null, null, NonFatalErrorLevel.error),
    );
  }
}

/* istanbul ignore next */
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
  Logger.warn(warning);
}
