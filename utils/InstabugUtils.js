'use strict';
import { NativeModules, Platform } from 'react-native';
let { Instabug } = NativeModules;
import IBGEventEmitter from './IBGEventEmitter';
import InstabugConstants from './InstabugConstants';
import parseErrorStackLib from '../../react-native/Libraries/Core/Devtools/parseErrorStack.js';

export const parseErrorStack = (error) => {
  return parseErrorStackLib(error);
};

const originalHandler = global.ErrorUtils.getGlobalHandler();
var _isOnReportHandlerSet = false;


export const setOnReportHandler = (flag) => {
  _isOnReportHandlerSet = flag;
};

export const getActiveRouteName = (navigationState) => {
  if (!navigationState) {
    return null;
  }
  const route = navigationState.routes[navigationState.index];
  // dive into nested navigators
  if (route.routes) {
    return getActiveRouteName(route);
  }
  return route.routeName;
}

function getFullRoute(state) {
  try {
    if (!state.routes[state.index].state) {
      return state.routes[state.index].name;
    }
    return getFullRoute(state.routes[state.index].state);
  } catch (e) {
    return "";
  }
}

export const getStackTrace = (e) => {
  let jsStackTrace;
  if (Platform.hasOwnProperty("constants")) {
    // RN version >= 0.63
    if (Platform.constants.reactNativeVersion.minor >= 64)
      // RN version >= 0.64 -> Stacktrace as string
      jsStackTrace = parseErrorStackLib(e.stack);
    // RN version == 0.63 -> Stacktrace as string
    else jsStackTrace = parseErrorStackLib(e);
  }
  // RN version < 0.63 -> Stacktrace as string
  else jsStackTrace = parseErrorStackLib(e);
  return jsStackTrace;
};

export const isOnReportHandlerSet = () => {
  return _isOnReportHandlerSet;
};

export const captureJsErrors = () => {
  if (!process.env.JEST_WORKER_ID) {
    if (__DEV__) {
      return;
    }
  }

  function errorHandler(e, isFatal) {
    let jsStackTrace = getStackTrace(e);

    //JSON object to be sent to the native SDK
    var jsonObject = {
      message: e.name + " - " + e.message,
      os: Platform.OS,
      platform: 'react_native',
      exception: jsStackTrace
    }

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
  }
  global.ErrorUtils.setGlobalHandler(errorHandler);
};

export default {
  parseErrorStack,
  captureJsErrors,
  setOnReportHandler,
  isOnReportHandlerSet,
  getActiveRouteName,
  getFullRoute,
  getStackTrace,
};
