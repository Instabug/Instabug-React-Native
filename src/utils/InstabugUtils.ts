import { Platform } from 'react-native';
import parseErrorStackLib, {
  ExtendedError,
  StackFrame,
} from 'react-native/Libraries/Core/Devtools/parseErrorStack';

import type { NavigationState as NavigationStateV5, PartialState } from '@react-navigation/native';
import type { NavigationState as NavigationStateV4 } from 'react-navigation';

import type { CrashData } from '../native/NativeCrashReporting';
import type { NetworkData } from './XhrNetworkInterceptor';
import { NativeCrashReporting } from '../native/NativeCrashReporting';
import { NativeInstabug } from '../native/NativeInstabug';
import { NativeAPM } from '../native/NativeAPM';

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

  const timestampInSeconds = Math.floor(networkStartTime.valueOf() / 1000);
  const hexaDigitsTimestamp = timestampInSeconds.toString(16).toLowerCase();
  const traceId = `${hexaDigitsTimestamp}${hexStringPartialId}${hexaDigitsTimestamp}${hexStringPartialId}`;
  const parentId = `4942472d${hexStringPartialId}`;

  return {
    timestampInSeconds,
    partialId: numberPartilId,
    w3cHeader: `00-${traceId}-${parentId}-01`,
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

export function reportNetworkLog(network: NetworkData) {
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
      network.gqlQueryName,
      network.serverErrorMessage,
    );
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
    );
  }
}

export default {
  parseErrorStack,
  captureJsErrors,
  getActiveRouteName,
  getFullRoute,
  getStackTrace,
  stringifyIfNotString,
  sendCrashReport,
  generateTracePartialId,
  generateW3CHeader,
};
