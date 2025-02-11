import { Platform } from 'react-native';
import parseErrorStackLib, {
  ExtendedError,
  StackFrame,
} from 'react-native/Libraries/Core/Devtools/parseErrorStack';

import type { NavigationState as NavigationStateV5, PartialState } from '@react-navigation/native';
import type { NavigationState as NavigationStateV4 } from 'react-navigation';

import type { CrashData } from '../native/NativeCrashReporting';
import { NativeCrashReporting } from '../native/NativeCrashReporting';
import type { NetworkData } from './XhrNetworkInterceptor';
import { NativeInstabug } from '../native/NativeInstabug';
import { NativeAPM } from '../native/NativeAPM';
import * as NetworkLogger from '../modules/NetworkLogger';
import {
  NativeNetworkLogger,
  NativeNetworkLoggerEvent,
  NetworkListenerType,
  NetworkLoggerEmitter,
} from '../native/NativeNetworkLogger';

type ApmNetworkFlags = {
  isNativeInterceptionFeatureEnabled: boolean;
  hasAPMNetworkPlugin: boolean;
  shouldEnableNativeInterception: boolean;
};

let apmFlags: ApmNetworkFlags = {
  isNativeInterceptionFeatureEnabled: false,
  hasAPMNetworkPlugin: false,
  shouldEnableNativeInterception: false,
};

export function setApmNetworkFlagsIfChanged(flags: ApmNetworkFlags): boolean {
  if (
    flags.hasAPMNetworkPlugin === apmFlags.hasAPMNetworkPlugin &&
    flags.isNativeInterceptionFeatureEnabled === apmFlags.isNativeInterceptionFeatureEnabled &&
    flags.shouldEnableNativeInterception === apmFlags.shouldEnableNativeInterception
  ) {
    return false;
  }
  apmFlags = flags;
  return true;
}

export const parseErrorStack = (error: ExtendedError): StackFrame[] => {
  return parseErrorStackLib(error);
};

export const getCrashDataFromError = (error: Error) => {
  const jsStackTrace = getStackTrace(error);

  const jsonObject: CrashData = {
    message: error.name + ' - ' + error.message,
    e_message: error.message,
    e_name: error.name,
    os: Platform.OS,
    platform: 'react_native',
    exception: jsStackTrace,
  };
  return jsonObject;
};

export const getActiveRouteName = (navigationState: NavigationStateV4): string | null => {
  if (!navigationState) {
    return null;
  }
  const route = navigationState.routes[navigationState.index];
  // dive into nested navigators
  if (route.routes) {
    return getActiveRouteName(route);
  }
  return route.routeName;
};

function getFullRoute(state: NavigationStateV5 | PartialState<NavigationStateV5>): string {
  try {
    if (!state.routes[state.index!].state) {
      return state.routes[state.index!].name;
    }
    return getFullRoute(state.routes[state.index!].state!);
  } catch (e) {
    return '';
  }
}

export const getStackTrace = (e: ExtendedError): StackFrame[] => {
  let jsStackTrace;
  if (Platform.hasOwnProperty('constants')) {
    // RN version >= 0.63
    if (Platform.constants.reactNativeVersion.minor >= 64) {
      // RN version >= 0.64 -> Stacktrace as string
      // @ts-ignore
      jsStackTrace = parseErrorStackLib(e.stack);
    }
    // RN version == 0.63 -> Stacktrace as string
    else {
      jsStackTrace = parseErrorStackLib(e);
    }
  }
  // RN version < 0.63 -> Stacktrace as string
  else {
    jsStackTrace = parseErrorStackLib(e);
  }
  return jsStackTrace;
};

export const captureJsErrors = () => {
  if (!process.env.JEST_WORKER_ID) {
    if (__DEV__) {
      return;
    }
  }

  const originalErrorHandler = ErrorUtils.getGlobalHandler();

  const instabugErrorHandler = (err: any, _isFatal?: boolean): Promise<void> => {
    return sendCrashReport(err, NativeCrashReporting.sendJSCrash);
  };

  ErrorUtils.setGlobalHandler(async (err, isFatal) => {
    await instabugErrorHandler(err, isFatal);

    if (process.env.JEST_WORKER_ID) {
      return;
    }
    originalErrorHandler(err, isFatal);
  });
};

export const stringifyIfNotString = (input: unknown) => {
  return typeof input === 'string' ? input : JSON.stringify(input);
};

/**
 * Sends crash report to Instabug's servers based on @param sendFunction
 *
 * @param error Error object to be sent to Instabug's servers
 * @param remoteSenderCallback Function to send the crash report to Instabug's servers
 *
 * @example
 * `sendCrashReport(error, NativeCrashReporting.sendHandledJSCrash);`
 * or
 * `sendCrashReport(error, NativeCrashReporting.sendJSCrash);`
 *
 */
export async function sendCrashReport(
  error: ExtendedError,
  remoteSenderCallback: (json: CrashData | string) => Promise<void>,
) {
  const jsonObject = getCrashDataFromError(error);

  if (Platform.OS === 'android') {
    return remoteSenderCallback(JSON.stringify(jsonObject));
  }

  return remoteSenderCallback(jsonObject);
}
/**
 * Generate random 32 bit unsigned integer Hexadecimal (8 chars) lower case letters
 * Should not return all zeros
 */
export const generateTracePartialId = () => {
  let randomNumber: number;
  let hexString: string;

  do {
    randomNumber = Math.floor(Math.random() * 0xffffffff);
    hexString = randomNumber.toString(16).padStart(8, '0');
  } while (hexString === '00000000');

  return { numberPartilId: randomNumber, hexStringPartialId: hexString.toLowerCase() };
};
/**
 * Generate W3C header in the format of {version}-{trace-id}-{parent-id}-{trace-flag}
 * @param networkStartTime
 * @returns w3c header
 */
export const generateW3CHeader = (networkStartTime: number) => {
  const { hexStringPartialId, numberPartilId } = generateTracePartialId();

  const TRACESTATE = '4942472d';
  const VERSION = '00';
  const TRACE_FLAG = '01';

  const timestampInSeconds = Math.floor(networkStartTime.valueOf() / 1000);
  const hexaDigitsTimestamp = timestampInSeconds.toString(16).toLowerCase();
  const traceId = `${hexaDigitsTimestamp}${hexStringPartialId}${hexaDigitsTimestamp}${hexStringPartialId}`;
  const parentId = `${TRACESTATE}${hexStringPartialId}`;

  return {
    timestampInSeconds,
    partialId: numberPartilId,
    w3cHeader: `${VERSION}-${traceId}-${parentId}-${TRACE_FLAG}`,
  };
};

export function isContentTypeNotAllowed(contentType: string) {
  const allowed = [
    'application/protobuf',
    'application/json',
    'application/xml',
    'text/xml',
    'text/html',
    'text/plain',
  ];

  return allowed.every((type) => !contentType.includes(type));
}

export const reportNetworkLog = (network: NetworkData) => {
  if (Platform.OS === 'android') {
    const requestHeaders = JSON.stringify(network.requestHeaders);
    const responseHeaders = JSON.stringify(network.responseHeaders);

    NativeInstabug.networkLogAndroid(
      network.url,
      network.requestBody,
      network.responseBody,
      network.method,
      network.responseCode,
      requestHeaders,
      responseHeaders,
      network.duration,
    );
    if (
      !apmFlags.isNativeInterceptionFeatureEnabled ||
      !apmFlags.hasAPMNetworkPlugin ||
      !apmFlags.shouldEnableNativeInterception
    ) {
      NativeAPM.networkLogAndroid(
        network.startTime,
        network.duration,
        requestHeaders,
        network.requestBody,
        network.requestBodySize,
        network.method,
        network.url,
        network.requestContentType,
        responseHeaders,
        network.responseBody,
        network.responseBodySize,
        network.responseCode,
        network.contentType,
        network.errorDomain,
        {
          isW3cHeaderFound: network.isW3cHeaderFound,
          partialId: network.partialId,
          networkStartTimeInSeconds: network.networkStartTimeInSeconds,
          w3cGeneratedHeader: network.w3cGeneratedHeader,
          w3cCaughtHeader: network.w3cCaughtHeader,
        },
        network.gqlQueryName,
        network.serverErrorMessage,
      );
    }
  } else {
    NativeInstabug.networkLogIOS(
      network.url,
      network.method,
      network.requestBody,
      network.requestBodySize,
      network.responseBody,
      network.responseBodySize,
      network.responseCode,
      network.requestHeaders,
      network.responseHeaders,
      network.contentType,
      network.errorDomain,
      network.errorCode,
      network.startTime,
      network.duration,
      network.gqlQueryName,
      network.serverErrorMessage,
      {
        isW3cHeaderFound: network.isW3cHeaderFound,
        partialId: network.partialId,
        networkStartTimeInSeconds: network.networkStartTimeInSeconds,
        w3cGeneratedHeader: network.w3cGeneratedHeader,
        w3cCaughtHeader: network.w3cCaughtHeader,
      },
    );
  }
};

/**
 * @internal
 * This method is for internal use only.
 */
export function registerObfuscationListener() {
  NetworkLogger.registerNetworkLogsListener(
    NetworkListenerType.obfuscation,
    async (networkSnapshot) => {
      const _networkDataObfuscationHandler = NetworkLogger.getNetworkDataObfuscationHandler();
      if (_networkDataObfuscationHandler) {
        networkSnapshot = await _networkDataObfuscationHandler(networkSnapshot);
      }
      updateNetworkLogSnapshot(networkSnapshot);
    },
  );
}

/**
 * @internal
 * This method is for internal use only.
 */
export function registerFilteringListener(filterExpression: string) {
  NetworkLogger.registerNetworkLogsListener(
    NetworkListenerType.filtering,
    async (networkSnapshot) => {
      // eslint-disable-next-line no-new-func
      const predicate = Function('network', 'return ' + filterExpression);
      const value = predicate(networkSnapshot);
      if (Platform.OS === 'ios') {
        // For iOS True == Request will be saved, False == will be ignored
        NativeNetworkLogger.setNetworkLoggingRequestFilterPredicateIOS(networkSnapshot.id, !value);
      } else {
        // For Android Setting the [url] to an empty string will ignore the request;
        if (value) {
          networkSnapshot.url = '';
          updateNetworkLogSnapshot(networkSnapshot);
        }
      }
    },
  );
}

/**
 * @internal
 * This method is for internal use only.
 */
export function registerFilteringAndObfuscationListener(filterExpression: string) {
  NetworkLogger.registerNetworkLogsListener(NetworkListenerType.both, async (networkSnapshot) => {
    // eslint-disable-next-line no-new-func
    const predicate = Function('network', 'return ' + filterExpression);
    const value = predicate(networkSnapshot);
    if (Platform.OS === 'ios') {
      // For iOS True == Request will be saved, False == will be ignored
      NativeNetworkLogger.setNetworkLoggingRequestFilterPredicateIOS(networkSnapshot.id, !value);
    } else {
      // For Android Setting the [url] to an empty string will ignore the request;
      if (value) {
        networkSnapshot.url = '';
        updateNetworkLogSnapshot(networkSnapshot);
      }
    }
    if (!value) {
      const _networkDataObfuscationHandler = NetworkLogger.getNetworkDataObfuscationHandler();
      if (_networkDataObfuscationHandler) {
        networkSnapshot = await _networkDataObfuscationHandler(networkSnapshot);
      }
      updateNetworkLogSnapshot(networkSnapshot);
    }
  });
}

/**
 * @internal
 * This method is for internal use only.
 */
export function checkNetworkRequestHandlers() {
  const obfuscationHandler = NetworkLogger.getNetworkDataObfuscationHandler();
  const hasFilterExpression = NetworkLogger.hasRequestFilterExpression();

  if (hasFilterExpression && obfuscationHandler) {
    // Register listener that handles both (Filtering & Obfuscation)
    registerFilteringAndObfuscationListener(NetworkLogger.getRequestFilterExpression());
    return;
  }
  if (obfuscationHandler) {
    // Register listener that handles only (Obfuscation)
    registerObfuscationListener();
    return;
  }

  if (hasFilterExpression) {
    // Register listener that handles only (Filtering)
    registerFilteringListener(NetworkLogger.getRequestFilterExpression());
    return;
  }
}
export function resetNativeObfuscationListener() {
  if (Platform.OS === 'android') {
    NativeNetworkLogger.resetNetworkLogsListener();
  }
  NetworkLoggerEmitter.removeAllListeners(NativeNetworkLoggerEvent.NETWORK_LOGGER_HANDLER);
}

/**
 * @internal
 * This method is for internal use only.
 */
export function updateNetworkLogSnapshot(networkSnapshot: NetworkData) {
  NativeNetworkLogger.updateNetworkLogSnapshot(
    networkSnapshot.url,
    networkSnapshot.id,
    networkSnapshot.requestBody,
    networkSnapshot.responseBody,
    networkSnapshot.responseCode ?? 200,
    networkSnapshot.requestHeaders,
    networkSnapshot.responseHeaders,
  );
}

export default {
  parseErrorStack,
  captureJsErrors,
  getActiveRouteName,
  getFullRoute,
  getStackTrace,
  stringifyIfNotString,
  sendCrashReport,
  reportNetworkLog,
  generateTracePartialId,
  generateW3CHeader,
};
