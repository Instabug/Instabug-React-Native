import type { RequestHandler } from '@apollo/client';

import InstabugConstants from '../utils/InstabugConstants';
import xhr, { NetworkData, ProgressCallback } from '../utils/XhrNetworkInterceptor';
import { InstabugRNConfig } from '../utils/config';
import { Logger } from '../utils/logger';
import { NativeInstabug } from '../native/NativeInstabug';
import {
  isContentTypeNotAllowed,
  registerFilteringAndObfuscationListener,
  registerFilteringListener,
  registerObfuscationListener,
  reportNetworkLog,
} from '../utils/InstabugUtils';
import {
  NativeNetworkLogger,
  NativeNetworkLoggerEvent,
  NetworkListenerType,
  NetworkLoggerEmitter,
} from '../native/NativeNetworkLogger';
import { Platform } from 'react-native';

export type { NetworkData };

export type NetworkDataObfuscationHandler = (data: NetworkData) => Promise<NetworkData>;
let _networkDataObfuscationHandler: NetworkDataObfuscationHandler | null | undefined;
let _requestFilterExpression = 'false';
let _isNativeInterceptionEnabled = false;
let _networkListener: NetworkListenerType | null = null;
let hasFilterExpression = false;

function getPortFromUrl(url: string) {
  const portMatch = url.match(/:(\d+)(?=\/|$)/);
  return portMatch ? portMatch[1] : null;
}

/**
 * Sets whether network logs should be sent with bug reports.
 * It is enabled by default.
 * @param isEnabled
 */
export const setEnabled = (isEnabled: boolean) => {
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

          if (__DEV__) {
            const urlPort = getPortFromUrl(network.url);
            if (urlPort === InstabugRNConfig.metroDevServerPort) {
              return;
            }
          }
          if (network.requestBodySize > InstabugConstants.MAX_NETWORK_BODY_SIZE_IN_BYTES) {
            network.requestBody = InstabugConstants.MAX_REQUEST_BODY_SIZE_EXCEEDED_MESSAGE;
            Logger.warn('IBG-RN:', InstabugConstants.MAX_REQUEST_BODY_SIZE_EXCEEDED_MESSAGE);
          }

          if (network.responseBodySize > InstabugConstants.MAX_NETWORK_BODY_SIZE_IN_BYTES) {
            network.responseBody = InstabugConstants.MAX_RESPONSE_BODY_SIZE_EXCEEDED_MESSAGE;
            Logger.warn('IBG-RN:', InstabugConstants.MAX_RESPONSE_BODY_SIZE_EXCEEDED_MESSAGE);
          }

          if (network.requestBody && isContentTypeNotAllowed(network.requestContentType)) {
            network.requestBody = `Body is omitted because content type ${network.requestContentType} isn't supported`;
            Logger.warn(
              `IBG-RN: The request body for the network request with URL ${network.url} has been omitted because the content type ${network.requestContentType} isn't supported.`,
            );
          }

          if (network.responseBody && isContentTypeNotAllowed(network.contentType)) {
            network.responseBody = `Body is omitted because content type ${network.contentType} isn't supported`;
            Logger.warn(
              `IBG-RN: The response body for the network request with URL ${network.url} has been omitted because the content type ${network.contentType} isn't supported.`,
            );
          }

          reportNetworkLog(network);
        } catch (e) {
          Logger.error(e);
        }
      }
    });
  } else {
    xhr.disableInterception();
  }
};

/**
 * @internal
 * Sets whether enabling or disabling native network interception.
 * It is disabled by default.
 * @param isEnabled
 */
export const setNativeInterceptionEnabled = (isEnabled: boolean) => {
  _isNativeInterceptionEnabled = isEnabled;
};

export const getNetworkDataObfuscationHandler = () => _networkDataObfuscationHandler;

export const getRequestFilterExpression = () => _requestFilterExpression;

export const hasRequestFilterExpression = () => hasFilterExpression;

/**
 * Obfuscates any response data.
 * @param handler
 */
export const setNetworkDataObfuscationHandler = (
  handler?: NetworkDataObfuscationHandler | null | undefined,
) => {
  _networkDataObfuscationHandler = handler;
  if (_isNativeInterceptionEnabled && Platform.OS === 'ios') {
    if (hasFilterExpression) {
      registerFilteringAndObfuscationListener(_requestFilterExpression);
    } else {
      registerObfuscationListener();
    }
  }
};

/**
 * Omit requests from being logged based on either their request or response details
 * @param expression
 */
export const setRequestFilterExpression = (expression: string) => {
  _requestFilterExpression = expression;
  hasFilterExpression = true;

  if (_isNativeInterceptionEnabled && Platform.OS === 'ios') {
    if (_networkDataObfuscationHandler) {
      registerFilteringAndObfuscationListener(_requestFilterExpression);
    } else {
      registerFilteringListener(_requestFilterExpression);
    }
  }
};

/**
 * Returns progress in terms of totalBytesSent and totalBytesExpectedToSend a network request.
 * @param handler
 */
export const setProgressHandlerForRequest = (handler: ProgressCallback) => {
  xhr.setOnProgressCallback(handler);
};

export const apolloLinkRequestHandler: RequestHandler = (operation, forward) => {
  try {
    operation.setContext((context: Record<string, any>) => {
      const newHeaders: Record<string, any> = context.headers ?? {};
      newHeaders[InstabugConstants.GRAPHQL_HEADER] = operation.operationName;
      return { headers: newHeaders };
    });
  } catch (e) {
    Logger.error(e);
  }

  return forward(operation);
};

/**
 * Sets whether network body logs will be captured or not.
 * @param isEnabled
 */
export const setNetworkLogBodyEnabled = (isEnabled: boolean) => {
  NativeInstabug.setNetworkLogBodyEnabled(isEnabled);
};

/**
 * @internal
 * Exported for internal/testing purposes only.
 */
export const resetNetworkListener = () => {
  if (process.env.NODE_ENV === 'test') {
    _networkListener = null;
    NativeNetworkLogger.resetNetworkLogsListener();
  } else {
    Logger.error(
      `${InstabugConstants.IBG_APM_TAG}: The \`resetNetworkListener()\` method is intended solely for testing purposes.`,
    );
  }
};

/**
 * @internal
 * Exported for internal/testing purposes only.
 */
export const registerNetworkLogsListener = (
  type: NetworkListenerType,
  handler?: (networkSnapshot: NetworkData) => void,
) => {
  if (Platform.OS === 'ios') {
    // remove old listeners
    if (NetworkLoggerEmitter.listenerCount(NativeNetworkLoggerEvent.NETWORK_LOGGER_HANDLER) > 0) {
      NetworkLoggerEmitter.removeAllListeners(NativeNetworkLoggerEvent.NETWORK_LOGGER_HANDLER);
    }

    if (_networkListener == null) {
      // set new listener.
      _networkListener = type;
    } else {
      // attach a new listener to the existing one.
      _networkListener = NetworkListenerType.both;
    }
  }

  NetworkLoggerEmitter.addListener(
    NativeNetworkLoggerEvent.NETWORK_LOGGER_HANDLER,
    (networkSnapshot) => {
      // Mapping the data [Native -> React-Native].
      const { id, url, requestHeader, requestBody, responseHeader, response, responseCode } =
        networkSnapshot;

      const networkSnapshotObj: NetworkData = {
        id: id,
        url: url,
        requestBody: requestBody,
        requestHeaders: requestHeader,
        method: '',
        responseBody: response,
        responseCode: responseCode,
        responseHeaders: responseHeader,
        contentType: '',
        duration: 0,
        requestBodySize: 0,
        responseBodySize: 0,
        errorDomain: '',
        errorCode: 0,
        startTime: 0,
        serverErrorMessage: '',
        requestContentType: '',
        isW3cHeaderFound: true,
        networkStartTimeInSeconds: 0,
        partialId: 0,
        w3cCaughtHeader: '',
        w3cGeneratedHeader: '',
      };
      if (handler) {
        handler(networkSnapshotObj);
      }
    },
  );
  if (Platform.OS === 'ios') {
    NativeNetworkLogger.registerNetworkLogsListener(_networkListener ?? NetworkListenerType.both);
  } else {
    NativeNetworkLogger.registerNetworkLogsListener();
  }
};
