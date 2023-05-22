import { ErrorHandlerCallback, Platform } from 'react-native';
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

  const instabugErrorHandler: ErrorHandlerCallback = (err) => {
    const jsStackTrace = getStackTrace(err);

    // JSON object to be sent to the native SDK
    const jsonObject: CrashData = {
      message: err.name + ' - ' + err.message,
      e_message: err.message,
      e_name: err.name,
      os: Platform.OS,
      platform: 'react_native',
      exception: jsStackTrace,
    };

    if (Platform.OS === 'android') {
      NativeCrashReporting.sendJSCrash(JSON.stringify(jsonObject));
    } else {
      NativeCrashReporting.sendJSCrash(jsonObject);
    }
  };

  ErrorUtils.setGlobalHandler((err, isFatal) => {
    instabugErrorHandler(err, isFatal);

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

export const invokeDeprecatedCallback = <T>(callback?: (arg: T) => void, arg?: T | null) => {
  if (!callback) {
    return;
  }

  // This is equivalent to `arg !== null || arg !== undefined` but more concise.
  // It's not equivalent to only `arg` as this matches falsey values like `false` and `0`.
  if (arg != null) {
    callback(arg);
  }

  if (__DEV__) {
    console.warn('Parameter callback is deprecated. You should use the returned Promise instead.');
  }
};

export default {
  parseErrorStack,
  captureJsErrors,
  getActiveRouteName,
  getFullRoute,
  getStackTrace,
  stringifyIfNotString,
  invokeDeprecatedCallback,
};
