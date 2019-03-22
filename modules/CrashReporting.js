import { NativeModules, Platform } from 'react-native';
import { parseErrorStack } from '../utils/InstabugUtils';
let { Instabug } = NativeModules;

/**
 * CrashReporting
 * @exports CrashReporting
 */
export default {
  /**
   * Enables and disables everything related to crash reporting including intercepting
   * errors in the global error handler. It is enabled by default.
   * @param {boolean} isEnabled
   */
  setEnabled(isEnabled) {
    Instabug.setCrashReportingEnabled(isEnabled);
  },

  /**
   * Send handled JS error object
   *
   * @param errorObject   Error object to be sent to Instabug's servers
   */
  reportJSException: function(errorObject) {
    let jsStackTrace = parseErrorStack(errorObject);
    var jsonObject = {
      message: errorObject.name + ' - ' + errorObject.message,
      os: Platform.OS,
      platform: 'react_native',
      exception: jsStackTrace
    };
    if (Platform.OS === 'android') {
      Instabug.sendHandledJSCrash(JSON.stringify(jsonObject));
    } else {
      Instabug.sendHandledJSCrash(jsonObject);
    }
  }
};
