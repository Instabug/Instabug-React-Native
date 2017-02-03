'use strict';
import {NativeModules, Platform} from 'react-native';
let {Instabug} = NativeModules;
let stacktraceParser = require('stacktrace-parser');

let parseErrorStack = (error) => {
    if (!error || !error.stack) {
        return [];
    }
    return Array.isArray(error.stack) ? error.stack :
        stacktraceParser.parse(error.stack);
};

let init = () => {
    if (__DEV__) {
        return;
    }

    const originalHandler = global.ErrorUtils.getGlobalHandler();

    function errorHandler(e, isFatal) {
        let jsStackTrace = parseErrorStack(error);
        Instabug.reportJsException(jsStackTrace, e.message, "unhandled");
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

module.exports = {
    parseErrorStack: parseErrorStack,
    captureJsErrors: init
};