import { Platform } from 'react-native';
import { NativeAPM } from '../native/NativeAPM';
import { NativeInstabug } from '../native/NativeInstabug';
import InstabugConstants from '../utils/InstabugConstants';
import xhr from '../utils/XhrNetworkInterceptor';
let _networkDataObfuscationHandler;
let _requestFilterExpression = 'false';
/**
 * Sets whether network logs should be sent with bug reports.
 * It is enabled by default.
 * @param isEnabled
 */
export const setEnabled = (isEnabled) => {
    if (isEnabled) {
        console.log('Network log is Enabled');
        xhr.enableInterception();
        xhr.setOnDoneCallback(async (network) => {
            console.log('Network log for url: ' + network.url);
            // eslint-disable-next-line no-new-func
            const predicate = Function('network', 'return ' + _requestFilterExpression);
            if (!predicate(network)) {
                try {
                    if (_networkDataObfuscationHandler) {
                        network = await _networkDataObfuscationHandler(network);
                    }
                    if (Platform.OS === 'android') {
                        NativeInstabug.networkLog(JSON.stringify(network));
                        NativeAPM.networkLog(JSON.stringify(network));
                    }
                    else {
                        NativeInstabug.networkLog(network);
                    }
                }
                catch (e) {
                    console.error(e);
                }
            }
        });
    }
    else {
        xhr.disableInterception();
        console.log('network log is disabled');
    }
};
/**
 * Obfuscates any response data.
 * @param handler
 */
export const setNetworkDataObfuscationHandler = (handler) => {
    _networkDataObfuscationHandler = handler;
};
/**
 * Omit requests from being logged based on either their request or response details
 * @param expression
 */
export const setRequestFilterExpression = (expression) => {
    _requestFilterExpression = expression;
};
/**
 * Returns progress in terms of totalBytesSent and totalBytesExpectedToSend a network request.
 * @param handler
 */
export const setProgressHandlerForRequest = (handler) => {
    xhr.setOnProgressCallback(handler);
};
export const apolloLinkRequestHandler = (operation, forward) => {
    try {
        operation.setContext((context) => {
            const newHeaders = context.headers ?? {};
            newHeaders[InstabugConstants.GRAPHQL_HEADER] = operation.operationName;
            return { headers: newHeaders };
        });
    }
    catch (e) {
        console.error(e);
    }
    return forward(operation);
};
