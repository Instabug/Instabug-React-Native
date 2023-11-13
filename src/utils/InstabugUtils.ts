import { Platform } from 'react-native';
import parseErrorStackLib, {
  ExtendedError,
  StackFrame,
} from 'react-native/Libraries/Core/Devtools/parseErrorStack';

import type { NavigationState as NavigationStateV5, PartialState } from '@react-navigation/native';
import type { NavigationState as NavigationStateV4 } from 'react-navigation';

import type { CrashData } from '../native/NativeCrashReporting';
import { NativeCrashReporting } from '../native/NativeCrashReporting';

export const parseErrorStack = (error: ExtendedError): StackFrame[] => {
  return parseErrorStackLib(error);
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

    if (Platform.OS === 'android') {
      setTimeout(() => {
        originalErrorHandler(err, isFatal);
      }, 500);
    } else {
      originalErrorHandler(err, isFatal);
    }
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
  const jsStackTrace = getStackTrace(error);

  const jsonObject: CrashData = {
    message: error.name + ' - ' + error.message,
    e_message: error.message,
    e_name: error.name,
    os: Platform.OS,
    platform: 'react_native',
    exception: jsStackTrace,
  };

  if (Platform.OS === 'android') {
    return remoteSenderCallback(JSON.stringify(jsonObject));
  }

  return remoteSenderCallback(jsonObject);
}

export default {
  parseErrorStack,
  captureJsErrors,
  getActiveRouteName,
  getFullRoute,
  getStackTrace,
  stringifyIfNotString,
  sendCrashReport,
};
