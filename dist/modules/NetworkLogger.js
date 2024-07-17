import InstabugConstants from '../utils/InstabugConstants';
import xhr from '../utils/XhrNetworkInterceptor';
import { reportNetworkLog, isContentTypeNotAllowed } from '../utils/InstabugUtils';
let _networkDataObfuscationHandler;
let _requestFilterExpression = 'false';
/**
 * Sets whether network logs should be sent with bug reports.
 * It is enabled by default.
 * @param isEnabled
 */
export const setEnabled = (isEnabled) => {
    if (isEnabled) {
        xhr.enableInterception();
        xhr.setOnDoneCallback(async (network) => {
            // eslint-disable-next-line no-new-func
            const predicate = Function('network', 'return ' + _requestFilterExpression);
            if (!predicate(network)) {
                try {
                    if (_networkDataObfuscationHandler) {
                        network = await _networkDataObfuscationHandler(network);
                    }
                    if (network.requestBodySize > InstabugConstants.MAX_NETWORK_BODY_SIZE_IN_BYTES) {
                        network.requestBody = InstabugConstants.MAX_REQUEST_BODY_SIZE_EXCEEDED_MESSAGE;
                        console.warn('IBG-RN:', InstabugConstants.MAX_REQUEST_BODY_SIZE_EXCEEDED_MESSAGE);
                    }
                    if (network.responseBodySize > InstabugConstants.MAX_NETWORK_BODY_SIZE_IN_BYTES) {
                        network.responseBody = InstabugConstants.MAX_RESPONSE_BODY_SIZE_EXCEEDED_MESSAGE;
                        console.warn('IBG-RN:', InstabugConstants.MAX_RESPONSE_BODY_SIZE_EXCEEDED_MESSAGE);
                    }
                    if (network.requestBody && isContentTypeNotAllowed(network.requestContentType)) {
                        network.requestBody = `Body is omitted because content type ${network.requestContentType} isn't supported`;
                        console.warn(`IBG-RN: The request body for the network request with URL ${network.url} has been omitted because the content type ${network.requestContentType} isn't supported.`);
                    }
                    if (network.responseBody && isContentTypeNotAllowed(network.contentType)) {
                        network.responseBody = `Body is omitted because content type ${network.contentType} isn't supported`;
                        console.warn(`IBG-RN: The response body for the network request with URL ${network.url} has been omitted because the content type ${network.contentType} isn't supported.`);
                    }
                    reportNetworkLog(network);
                }
                catch (e) {
                    console.error(e);
                }
            }
        });
    }
    else {
        xhr.disableInterception();
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
