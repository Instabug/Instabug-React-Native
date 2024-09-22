import type { RequestHandler } from '@apollo/client';

import InstabugConstants from '../utils/InstabugConstants';
import xhr, { NetworkData, ProgressCallback } from '../utils/XhrNetworkInterceptor';
import { isContentTypeNotAllowed, reportNetworkLog } from '../utils/InstabugUtils';
import { NativeInstabug } from '../native/NativeInstabug';
import { Platform } from 'react-native';
import { registerNetworkLogsListener } from './Instabug';
import { NativeFlags } from '../utils/NativeFlags';

export type { NetworkData };

export type NetworkDataObfuscationHandler = (data: NetworkData) => Promise<NetworkData>;
// export type NetworkSnapshotObfuscationHandler = (data: NetworkSnapshot) => Promise<NetworkSnapshot>;
let _networkDataObfuscationHandler: NetworkDataObfuscationHandler | null | undefined;
// let _networkSnapshotObfuscationHandler: NetworkSnapshotObfuscationHandler | null | undefined;
let _requestFilterExpression = 'false';
let isNativeInterceptionEnabled =
  NativeFlags.nativeInterceptionEnabled && (Platform.OS === 'ios' || NativeFlags.hasAPMPlugin);

/**
 * Sets whether network logs should be sent with bug reports.
 * It is enabled by default.
 * @param isEnabled
 */
export const setEnabled = (isEnabled: boolean) => {
  if (isEnabled) {
    console.log(`Andrew: native interception is ${isNativeInterceptionEnabled} `);
    isNativeInterceptionEnabled = false;
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
 * Obfuscates any response data.
 * @param handler
 */
export const setNetworkDataObfuscationHandler = (
  handler?: NetworkDataObfuscationHandler | null | undefined,
) => {
  _networkDataObfuscationHandler = handler;
  if (isNativeInterceptionEnabled) {
    registerNetworkLogsListener(async (networkSnapshot) => {
      console.log(
        `Andrew: new snapshot from setNetworkDataObfuscationHandler: ${networkSnapshot.url}`,
      );

      if (_networkDataObfuscationHandler) {
        networkSnapshot = await _networkDataObfuscationHandler(networkSnapshot);
      }
      NativeInstabug.updateNetworkLogSnapshot(JSON.stringify(networkSnapshot));
    });
  }
};

/**
 * Omit requests from being logged based on either their request or response details
 * @param expression
 */
export const setRequestFilterExpression = (expression: string) => {
  _requestFilterExpression = expression;

  if (isNativeInterceptionEnabled) {
    registerNetworkLogsListener(async (networkSnapshot) => {
      console.log(`Andrew: new snapshot from setRequestFilterExpression: ${networkSnapshot.url}`);
      // eslint-disable-next-line no-new-func
      const predicate = Function('network', 'return ' + _requestFilterExpression);
      const value = predicate(networkSnapshot);
      if (Platform.OS === 'ios') {
        NativeInstabug.setNetworkLoggingRequestFilterPredicateIOS(value);
      } else {
        // set android request url to null ;
        if (value) {
          NativeInstabug.updateNetworkLogSnapshot('');
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

      console.log('Andrew: Apollo header attached ');

      newHeaders[InstabugConstants.GRAPHQL_HEADER] = operation.operationName;
      return { headers: newHeaders };
    });
  } catch (e) {
    console.error(e);
  }

  return forward(operation);
};
