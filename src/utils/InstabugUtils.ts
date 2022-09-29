import { ErrorHandlerCallback, Platform } from 'react-native';
import parseErrorStackLib, {
  ExtendedError,
  StackFrame,
} from 'react-native/Libraries/Core/Devtools/parseErrorStack';
import { Instabug } from 'src/native';
import IBGEventEmitter from './IBGEventEmitter';
import InstabugConstants from './InstabugConstants';

export const parseErrorStack = (error: ExtendedError): StackFrame[] => {
  return parseErrorStackLib(error);
};

var _isOnReportHandlerSet = false;

export const isOnReportHandlerSet = (): boolean => _isOnReportHandlerSet;

export const setOnReportHandler = (flag: boolean) => {
  _isOnReportHandlerSet = flag;
};

export const getActiveRouteName = (navigationState: any): string | null => {
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

function getFullRoute(state: any): string {
  try {
    if (!state.routes[state.index].state) {
      return state.routes[state.index].name;
    }
    return getFullRoute(state.routes[state.index].state);
  } catch (e) {
    return '';
  }
}

export const getStackTrace = (e: ExtendedError): StackFrame[] => {
  let jsStackTrace;
  if (Platform.hasOwnProperty('constants')) {
    // RN version >= 0.63
    if (Platform.constants.reactNativeVersion.minor >= 64)
      // RN version >= 0.64 -> Stacktrace as string
      // @ts-ignore
      jsStackTrace = parseErrorStackLib(e.stack);
    // RN version == 0.63 -> Stacktrace as string
    else jsStackTrace = parseErrorStackLib(e);
  }
  // RN version < 0.63 -> Stacktrace as string
  else jsStackTrace = parseErrorStackLib(e);
  return jsStackTrace;
};

const originalHandler = ErrorUtils.getGlobalHandler();

export const captureJsErrors = () => {
  if (!process.env.JEST_WORKER_ID) {
    if (__DEV__) {
      return;
    }
  }

  const errorHandler: ErrorHandlerCallback = (e: any, isFatal?: boolean) => {
    const jsStackTrace = getStackTrace(e);

    // JSON object to be sent to the native SDK
    const jsonObject = {
      message: e.name + ' - ' + e.message,
      e_message: e.message,
      e_name: e.name,
      os: Platform.OS,
      platform: 'react_native',
      exception: jsStackTrace,
    };

    if (Platform.OS === 'android') {
      if (_isOnReportHandlerSet) {
        IBGEventEmitter.emit(InstabugConstants.SEND_UNHANDLED_CRASH, jsonObject);
      } else {
        Instabug.sendJSCrash(JSON.stringify(jsonObject));
      }
    } else {
      Instabug.sendJSCrash(jsonObject);
    }

    if (originalHandler && !process.env.JEST_WORKER_ID) {
      if (Platform.OS === 'ios') {
        originalHandler(e, isFatal);
      } else {
        setTimeout(() => {
          originalHandler(e, isFatal);
        }, 500);
      }
    }
  };

  ErrorUtils.setGlobalHandler(errorHandler);
};

export const stringifyIfNotString = (input: any) => {
  return typeof input === 'string' ? input : JSON.stringify(input);
};

export default {
  parseErrorStack,
  captureJsErrors,
  setOnReportHandler,
  isOnReportHandlerSet,
  getActiveRouteName,
  getFullRoute,
  getStackTrace,
  stringifyIfNotString,
};
