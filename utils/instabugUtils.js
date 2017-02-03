'use strict';
import {NativeModules} from 'react-native';
let {Instabug} = NativeModules;
let stacktraceParser = require('stacktrace-parser');

let parseErrorStack = (error) => {
    if (!error || !error.stack) {
        return [];
    }
    return Array.isArray(error.stack) ? error.stack :
        stacktraceParser.parse(error.stack);
};

let issue = (e, isFatal, originalHandler) => {
    stacktraceParser.fromError(e, {offline: true}).then((stack) => (
        stack.map((row) => {
            let {lineNumber} = row;
            const {source} = row;
            if (!lineNumber) {
                lineNumber = parseInt(source.split(':').slice(-2, -1), 10) || 0;
            }
            return {fileName: e.message, lineNumber, functionName: source};
        })
    )).then((stack) => {
        Instabug.reportJsException(stack, e.message, null);
        originalHandler(e, isFatal, originalHandler);
    });
};

let init = () => {
    if (__DEV__) {
        return;
    }

    const originalHandler = global.ErrorUtils.getGlobalHandler();

    function errorHandler(e, isFatal) {
        if (originalHandler) {
            issue(e, isFatal, originalHandler);
            if (Platform.OS === 'ios') {
                originalHandler(e, isFatal);
            } else {
                setTimeout(() => {
                    originalHandler(e, isFatal);
                }, 500);
            }
        }
        issue(e);
    }

    global.ErrorUtils.setGlobalHandler(errorHandler);
};

module.exports = {
    parseErrorStack: parseErrorStack,
    captureJsErrors: init
};