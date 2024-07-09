import { Platform } from 'react-native';
import parseErrorStackLib from 'react-native/Libraries/Core/Devtools/parseErrorStack';
import { NativeCrashReporting } from '../native/NativeCrashReporting';
export const parseErrorStack = (error) => {
    return parseErrorStackLib(error);
};
export const getCrashDataFromError = (error) => {
    const jsStackTrace = getStackTrace(error);
    const jsonObject = {
        message: error.name + ' - ' + error.message,
        e_message: error.message,
        e_name: error.name,
        os: Platform.OS,
        platform: 'react_native',
        exception: jsStackTrace,
    };
    return jsonObject;
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
};
function getFullRoute(state) {
    try {
        if (!state.routes[state.index].state) {
            return state.routes[state.index].name;
        }
        return getFullRoute(state.routes[state.index].state);
    }
    catch (e) {
        return '';
    }
}
export const getStackTrace = (e) => {
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
    const instabugErrorHandler = (err, _isFatal) => {
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
export const stringifyIfNotString = (input) => {
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
export async function sendCrashReport(error, remoteSenderCallback) {
    const jsonObject = getCrashDataFromError(error);
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
