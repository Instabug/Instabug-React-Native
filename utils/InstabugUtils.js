'use strict';
import {NativeModules, Platform} from 'react-native';
let {Instabug} = NativeModules;
import IBGEventEmitter from './IBGEventEmitter';
import InstabugConstants from './InstabugConstants';
import parseErrorStackLib from '../../react-native/Libraries/Core/Devtools/parseErrorStack.js';
import IBG from '../index';

export const parseErrorStack = (error) => {
    return parseErrorStackLib(error);
};

const originalHandler = global.ErrorUtils.getGlobalHandler();

export const captureJsErrors = () => {
    if (!process.env.JEST_WORKER_ID) {
      if (__DEV__) {
          return;
      }
    }

    function errorHandler(e, isFatal) {
      let jsStackTrace = parseErrorStackLib(e);

      //JSON object to be sent to the native SDK
      var jsonObject = {
        message: e.name + " - " + e.message,
        os: Platform.OS,
        platform: 'react_native',
        exception: jsStackTrace
      }
      
      if(Platform.OS === 'android') {
        if (IBG._isOnReportHandlerSet()) {
          IBGEventEmitter.emit( InstabugConstants.SEND_UNHANDLED_CRASH, jsonObject);
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
    captureJsErrors
};
