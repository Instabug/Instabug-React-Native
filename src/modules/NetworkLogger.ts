import { Platform } from 'react-native';
import { NativeAPM, NativeInstabug } from '../native';
import IBGEventEmitter from '../utils/IBGEventEmitter';
import InstabugConstants from '../utils/InstabugConstants';
import xhr from '../utils/XhrNetworkInterceptor';

var _networkDataObfuscationHandlerSet = false;
var _requestFilterExpression = false;

/**
 * NetworkLogger
 * @exports NetworkLogger
 */
export default {
  /**
   * Sets whether network logs should be sent with bug reports.
   * It is enabled by default.
   * @param {boolean} isEnabled
   */
  setEnabled(isEnabled) {
    if (isEnabled) {
      xhr.enableInterception();
      xhr.setOnDoneCallback(network => {
        let predicate = Function('network', 'return ' + _requestFilterExpression);
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
  },

  /**
   * Obfuscates any response data.
   * @param {function} handler
   */
  setNetworkDataObfuscationHandler(handler) {
    if (handler === null) {
      _networkDataObfuscationHandlerSet = false;
      return;
    }
    _networkDataObfuscationHandlerSet = true;

    IBGEventEmitter.addListener(
      NativeInstabug,
      InstabugConstants.NETWORK_DATA_OBFUSCATION_HANDLER_EVENT,
      async data => {
        try {
          const newData = await handler(data);
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
  },

  /**
   * Omit requests from being logged based on either their request or response details
   * @param {string} expression
   */
  setRequestFilterExpression(expression) {
    _requestFilterExpression = expression;
  },

  /**
   * Returns progress in terms of totalBytesSent and totalBytesExpectedToSend a network request.
   * @param {function} handler
   */
  setProgressHandlerForRequest(handler) {
    xhr.setOnProgressCallback(handler);
  },

  apolloLinkRequestHandler(operation, forward) {
    try {
      operation.setContext(({ headers = {} }) => {
        headers[InstabugConstants.GRAPHQL_HEADER] = operation.operationName;
        return { headers: headers };
      });
    } catch (e) {
      console.error(e);
    }

    return forward(operation);
  },
};
