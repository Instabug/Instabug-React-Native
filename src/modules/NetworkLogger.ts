import { Platform } from 'react-native';
import { NativeAPM, NativeInstabug } from '../native';
import IBGEventEmitter from '../utils/IBGEventEmitter';
import InstabugConstants from '../utils/InstabugConstants';
import xhr, { NetworkData, ProgressCallback } from '../utils/XhrNetworkInterceptor';
import type { RequestHandler, Operation, NextLink } from '@apollo/client';

var _networkDataObfuscationHandlerSet = false;
var _requestFilterExpression = 'false';

/**
 * Sets whether network logs should be sent with bug reports.
 * It is enabled by default.
 * @param isEnabled
 */
export const setEnabled = (isEnabled: boolean) => {
  if (isEnabled) {
    xhr.enableInterception();
    xhr.setOnDoneCallback(network => {
      const predicate = Function('network', 'return ' + _requestFilterExpression);
      if (!predicate(network)) {
        if (_networkDataObfuscationHandlerSet) {
          IBGEventEmitter.emit(InstabugConstants.NETWORK_DATA_OBFUSCATION_HANDLER_EVENT, network);
        } else {
          try {
            if (Platform.OS === 'android') {
              NativeInstabug.networkLog(JSON.stringify(network));
              NativeAPM.networkLog(JSON.stringify(network));
            } else {
              NativeInstabug.networkLog(network);
            }
          } catch (e) {
            console.error(e);
          }
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
export const setNetworkDataObfuscationHandler = (handler: (data: NetworkData) => NetworkData) => {
  if (handler === null) {
    _networkDataObfuscationHandlerSet = false;
    return;
  }
  _networkDataObfuscationHandlerSet = true;

  IBGEventEmitter.addListener(
    NativeInstabug,
    InstabugConstants.NETWORK_DATA_OBFUSCATION_HANDLER_EVENT,
    (data: NetworkData) => {
      try {
        const newData = handler(data);

        if (Platform.OS === 'android') {
          NativeInstabug.networkLog(JSON.stringify(newData));
          NativeAPM.networkLog(JSON.stringify(newData));
        } else {
          NativeInstabug.networkLog(newData);
        }
      } catch (e) {
        console.error(e);
      }
    },
  );
};

/**
 * Omit requests from being logged based on either their request or response details
 * @param expression
 */
export const setRequestFilterExpression = (expression: string) => {
  _requestFilterExpression = expression;
};

/**
 * Returns progress in terms of totalBytesSent and totalBytesExpectedToSend a network request.
 * @param handler
 */
export const setProgressHandlerForRequest = (handler: ProgressCallback) => {
  xhr.setOnProgressCallback(handler);
};

export const apolloLinkRequestHandler: RequestHandler = (
  operation: Operation,
  forward: NextLink,
) => {
  try {
    operation.setContext((context: Record<string, any>) => {
      const newHeaders = context.headers ?? ({} as Record<string, any>);
      newHeaders[InstabugConstants.GRAPHQL_HEADER] = operation.operationName;
      return { headers: newHeaders };
    });
  } catch (e) {
    console.error(e);
  }

  return forward(operation);
};
