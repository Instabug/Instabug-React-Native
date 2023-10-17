import { Platform } from 'react-native';

import type { RequestHandler } from '@apollo/client';

import { NativeAPM } from '../native/NativeAPM';
import { NativeInstabug } from '../native/NativeInstabug';
import InstabugConstants from '../utils/InstabugConstants';
import xhr, { NetworkData, ProgressCallback } from '../utils/XhrNetworkInterceptor';

export type { NetworkData };

export type NetworkDataObfuscationHandler = (data: NetworkData) => Promise<NetworkData>;
let _networkDataObfuscationHandler: NetworkDataObfuscationHandler | null | undefined;
let _requestFilterExpression = 'false';

/**
 * Sets whether network logs should be sent with bug reports.
 * It is enabled by default.
 * @param isEnabled
 */
export const setEnabled = (isEnabled: boolean) => {
  if (isEnabled) {
    console.log('IBG-RN: enabled XHR interception');

    xhr.enableInterception();
    xhr.setOnDoneCallback(async (network) => {
      // eslint-disable-next-line no-new-func
      const predicate = Function('network', 'return ' + _requestFilterExpression);

      console.log('IBG-RN: recieved a network log');

      if (!predicate(network)) {
        console.log('IBG-RN: the network log is not ignored');
        try {
          if (_networkDataObfuscationHandler) {
            network = await _networkDataObfuscationHandler(network);
            console.log('IBG-RN: obfuscated the network log');
          } else {
            console.log('IBG-RN: no obfuscation has been applied');
          }

          console.log(`IBG-RN: the network log is sent to the native ${Platform.OS} SDK`);
          if (Platform.OS === 'android') {
            NativeInstabug.networkLog(JSON.stringify(network));
            NativeAPM.networkLog(JSON.stringify(network));
          } else {
            NativeInstabug.networkLog(network);
          }
        } catch (e) {
          console.log(
            `IBG-RN: failed to obfuscate and send the network log to the native ${Platform.OS} SDK`,
          );
          console.error(e);
        }
      } else {
        console.log('IBG-RN: ignored the network log through request filter expression');
      }
    });
  } else {
    console.log('IBG-RN: disabled XHR interception');

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
  console.log('IBG-RN: network data obfuscation handler is now set');
  _networkDataObfuscationHandler = handler;
};

/**
 * Omit requests from being logged based on either their request or response details
 * @param expression
 */
export const setRequestFilterExpression = (expression: string) => {
  console.log('IBG-RN: network data obfuscation handler is now set to', expression);
  _requestFilterExpression = expression;
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
