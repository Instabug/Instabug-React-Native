import { NativeModules, Platform } from 'react-native';
import xhr from '../utils/XhrNetworkInterceptor';
import IBGEventEmitter from '../utils/IBGEventEmitter.js';
import InstabugConstants from '../utils/InstabugConstants';
let { Instabug } = NativeModules;


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
        if (!eval(_requestFilterExpression)) {
          if (_networkDataObfuscationHandlerSet) {
            IBGEventEmitter.emit(
              InstabugConstants.NETWORK_DATA_OBFUSCATION_HANDLER_EVENT,
              network
            );
          } else {
            try {
              if (Platform.OS === 'android') {
                Instabug.networkLog(JSON.stringify(network));
              } else {
                Instabug.networkLog(network);
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

    IBGEventEmitter.addListener(Instabug,
      InstabugConstants.NETWORK_DATA_OBFUSCATION_HANDLER_EVENT,
      async data => {
        try {
          const newData = await handler(data);
          if (Platform.OS === 'android') {
            Instabug.networkLog(JSON.stringify(newData));
          } else {
            Instabug.networkLog(newData);
          }
        } catch (e) {
          console.error(e);
        }
      }
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


};
