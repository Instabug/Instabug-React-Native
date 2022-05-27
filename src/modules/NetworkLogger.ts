import { Platform } from 'react-native';

import type { RequestHandler } from '@apollo/client';

import { NativeAPM } from '../native/NativeAPM';
import { NativeInstabug } from '../native/NativeInstabug';
import InstabugConstants from '../utils/InstabugConstants';
import xhr, { NetworkData, ProgressCallback } from '../utils/XhrNetworkInterceptor';

export type { NetworkData };

export type NetworkDataObfuscationHandler = (data: NetworkData) => Promise<NetworkData>;
export type NetworkFilterPredicate = (data: NetworkData) => boolean;

let _networkDataObfuscationHandler: NetworkDataObfuscationHandler | null | undefined;
var _networkFilter: NetworkFilterPredicate = (_) => false;

/**
 * Sets whether network logs should be sent with bug reports.
 * It is enabled by default.
 * @param isEnabled
 */
export const setEnabled = (isEnabled: boolean) => {
  if (isEnabled) {
    xhr.enableInterception();
    xhr.setOnDoneCallback(async (network) => {
      const isFiltered = _networkFilter(network);
      if (isFiltered) {
        return;
      }

      try {
        if (_networkDataObfuscationHandler) {
          network = await _networkDataObfuscationHandler(network);
        }

        if (Platform.OS === 'android') {
          NativeInstabug.networkLog(JSON.stringify(network));
          NativeAPM.networkLog(JSON.stringify(network));
        } else {
          NativeInstabug.networkLog(network);
        }
      } catch (e) {
        console.error(e);
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
};

/**
 * Omit requests from being logged based on either their request or response details
 * @param predicate - A predicate that returns `true` if the network data should be
 * ignored from logs, and returns `false` otherwise.
 */
export const setFilter = (predicate: NetworkFilterPredicate) => {
  _networkFilter = predicate;
};

/**
 * @deprecated
 * Omit requests from being logged based on either their request or response details
 * @param expression
 */
export const setRequestFilterExpression = (expression: string) => {
  // eslint-disable-next-line no-new-func
  setFilter(Function('network', `return ${expression}`) as NetworkFilterPredicate);
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
