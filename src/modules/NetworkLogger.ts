import type { RequestHandler } from '@apollo/client';

import InstabugConstants from '../utils/InstabugConstants';
import xhr, { NetworkData, ProgressCallback } from '../utils/XhrNetworkInterceptor';
import { isContentTypeNotAllowed, reportNetworkLog } from '../utils/InstabugUtils';
import { InstabugRNConfig } from '../utils/config';
import { Logger } from '../utils/logger';

export type { NetworkData };

export type NetworkDataObfuscationHandler = (data: NetworkData) => Promise<NetworkData>;
let _networkDataObfuscationHandler: NetworkDataObfuscationHandler | null | undefined;
let _requestFilterExpression = 'false';

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
 * Obfuscates any response data.
 * @param handler
 */
export const setNetworkDataObfuscationHandler = (
  handler?: NetworkDataObfuscationHandler | null | undefined,
) => {
  _networkDataObfuscationHandler = handler;

  // if (isNativeInterceptionEnabled) {
  //   registerNetworkLogsListener(async (networkSnapshot) => {
  //     console.log(
  //       `Andrew: new snapshot from setNetworkDataObfuscationHandler: ${networkSnapshot.url}`,
  //     );
  //
  //     if (_networkDataObfuscationHandler) {
  //       networkSnapshot = await _networkDataObfuscationHandler(networkSnapshot);
  //     }
  //     NativeInstabug.updateNetworkLogSnapshot(JSON.stringify(networkSnapshot));
  //   });
  // }
};

/**
 * Omit requests from being logged based on either their request or response details
 * @param expression
 */
export const setRequestFilterExpression = (expression: string) => {
  _requestFilterExpression = expression;

  // if (isNativeInterceptionEnabled) {
  //   registerNetworkLogsListener(async (networkSnapshot) => {
  //     console.log(`Andrew: new snapshot from setRequestFilterExpression: ${networkSnapshot.url}`);
  //     // eslint-disable-next-line no-new-func
  //     const predicate = Function('network', 'return ' + _requestFilterExpression);
  //     const value = predicate(networkSnapshot);
  //     if (Platform.OS === 'ios') {
  //       NativeInstabug.setNetworkLoggingRequestFilterPredicateIOS(value);
  //     } else {
  //       // set android request url to null ;
  //       if (value) {
  //         NativeInstabug.updateNetworkLogSnapshot('');
  //       }
  //     }
  //   });
  // }
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
