import type { RequestHandler } from '@apollo/client';

import InstabugConstants from '../utils/InstabugConstants';
import xhr, { NetworkData, ProgressCallback } from '../utils/XhrNetworkInterceptor';
import { isContentTypeNotAllowed, reportNetworkLog } from '../utils/InstabugUtils';
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
            console.warn(
              `IBG-RN: The request body for the network request with URL ${network.url} has been omitted because the content type ${network.requestContentType} isn't supported.`,
            );
          }

          if (network.responseBody && isContentTypeNotAllowed(network.contentType)) {
            network.responseBody = `Body is omitted because content type ${network.contentType} isn't supported`;
            console.warn(
              `IBG-RN: The response body for the network request with URL ${network.url} has been omitted because the content type ${network.contentType} isn't supported.`,
            );
          }

          reportNetworkLog(network);
        } catch (e) {
          console.error(e);
        }
      }
    });
  } else {
    xhr.disableInterception();
  }
};

/**
 * Sets whether enabling or disabling native network interception.
 * It is disabled by default.
 * @param isEnabled
 */
export const setNativeInterceptionEnabled = (isEnabled: boolean) => {
  console.log(`NetworkLogger -> setNativeInterceptionEnabled ${isEnabled}`);
  _isNativeInterceptionEnabled = isEnabled;
};

/**
 * Obfuscates any response data.
 * @param handler
 */
export const setNetworkDataObfuscationHandler = (
  handler?: NetworkDataObfuscationHandler | null | undefined,
) => {
  _networkDataObfuscationHandler = handler;

  console.log(
    `Andrew: Obfuscation -> _isNativeInterceptionEnabled ${_isNativeInterceptionEnabled}`,
  );
  if (_isNativeInterceptionEnabled) {
    _registerNetworkLogsListener(NetworkListenerType.obfuscation, async (networkSnapshot) => {
      console.log(
        `Andrew: new snapshot from setNetworkDataObfuscationHandler: ${networkSnapshot.url}`,
      );

      if (_networkDataObfuscationHandler) {
        networkSnapshot = await _networkDataObfuscationHandler(networkSnapshot);
      }
      NativeNetworkLogger.updateNetworkLogSnapshot(JSON.stringify(networkSnapshot));
    });
  }
};

/**
 * Omit requests from being logged based on either their request or response details
 * @param expression
 */
export const setRequestFilterExpression = (expression: string) => {
  _requestFilterExpression = expression;
  console.log(`Andrew: Filtering -> _isNativeInterceptionEnabled ${_isNativeInterceptionEnabled}`);

  if (_isNativeInterceptionEnabled) {
    _registerNetworkLogsListener(NetworkListenerType.filtering, async (networkSnapshot) => {
      console.log(`Andrew: new snapshot from setRequestFilterExpression: ${networkSnapshot.url}`);
      // eslint-disable-next-line no-new-func
      const predicate = Function('network', 'return ' + _requestFilterExpression);
      const value = predicate(networkSnapshot);
      if (Platform.OS === 'ios') {
        NativeNetworkLogger.setNetworkLoggingRequestFilterPredicateIOS(networkSnapshot.id, value);
      } else {
        // set android request url to null ;
        if (value) {
          NativeNetworkLogger.updateNetworkLogSnapshot('');
        }
      }
    });
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
    console.error(e);
  }

  return forward(operation);
};

const _registerNetworkLogsListener = (
  type: NetworkListenerType,
  handler?: (networkSnapshot: NetworkData) => void,
) => {
  console.log('Andrew: registerNetworkLogsListener called');
  // ignore repetitive calls
  if (_networkListener === type || _networkListener === NetworkListenerType.both) {
    console.log('Andrew: _registerNetworkLogsListener called on the same type');
    return;
  }
  // remove old listeners
  if (NetworkLoggerEmitter.listenerCount(NativeNetworkLoggerEvent.NETWORK_LOGGER_HANDLER) > 0) {
    console.log('Andrew: removeAllListeners called');
    NetworkLoggerEmitter.removeAllListeners(NativeNetworkLoggerEvent.NETWORK_LOGGER_HANDLER);
  }

  if (_networkListener == null) {
    _networkListener = type;
  } else {
    _networkListener = NetworkListenerType.both;
  }
  console.log('Andrew: new NetworkLogsListener attached');
  NetworkLoggerEmitter.addListener(
    NativeNetworkLoggerEvent.NETWORK_LOGGER_HANDLER,
    (networkSnapshot) => {
      const {
        callbackID,
        url,
        requestHeader,
        requestBody,
        responseHeader,
        response,
        responseCode,
      } = networkSnapshot;

      console.log(`Andrew: new snapshot ${url}`);
      const networkSnapshotObj: NetworkData = {
        id: callbackID,
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
      };
      console.log(`Andrew registerNetworkLogsListener object ${networkSnapshotObj.url}`);
      if (handler) {
        handler(networkSnapshotObj);
      }
    },
  );
  //todo: find where to remove listener
  // emitter.removeAllListeners(NativeEvents.NETWORK_LOGGER_HANDLER);
  NativeNetworkLogger.registerNetworkLogsListener(_networkListener);
};
