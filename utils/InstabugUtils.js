'use strict';
import {NativeModules, Platform} from 'react-native';
let {Instabug} = NativeModules;
import parseErrorStackLib from '../../react-native/Libraries/Core/Devtools/parseErrorStack.js';

export const parseErrorStack = (error) => {
    return parseErrorStackLib(error);
};

const originalHandler = global.ErrorUtils.getGlobalHandler();

export const captureJsErrors = () => {
    if (__DEV__) {
        return;
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
        Instabug.sendJSCrash(JSON.stringify(jsonObject));
      } else {
        Instabug.sendJSCrash(jsonObject);
      }
      if (originalHandler) {
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
