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

//todo: remove all logs tagged with 'Andrew' in the file
export const reportNetworkLog = (network: NetworkData) => {
  if (Platform.OS === 'android') {
    const requestHeaders = JSON.stringify(network.requestHeaders);
    const responseHeaders = JSON.stringify(network.responseHeaders);

    console.log('Andrew: ' + `NetworkLogger -> ${JSON.stringify(apmFlags)}`);
    console.log('Andrew: ' + 'NetworkLogger -> NativeInstabug.networkLogAndroid');

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
      console.log('Andrew: ' + 'NetworkLogger -> NativeAPM.networkLogAndroid');
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
    }
  } else {
    console.log(
      'Andrew: ' +
        `NetworkLogger -> {isNativeInterceptionEnabled: ${apmFlags.isNativeInterceptionFeatureEnabled}}`,
    );
    console.log('Andrew: ' + 'NetworkLogger -> NativeInstabug.networkLogIOS');

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
};

export default {
  parseErrorStack,
  captureJsErrors,
  getActiveRouteName,
  getFullRoute,
  getStackTrace,
  stringifyIfNotString,
  sendCrashReport,
  reportNetworkLog,
};
