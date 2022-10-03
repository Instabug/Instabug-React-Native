import { Platform } from 'react-native';
import type { ExtendedError } from 'react-native/Libraries/Core/Devtools/parseErrorStack';
import { NativeInstabug } from '../native';
import IBGEventEmitter from '../utils/IBGEventEmitter';
import InstabugConstants from '../utils/InstabugConstants';
import InstabugUtils from '../utils/InstabugUtils';

export namespace CrashReporting {
  /**
   * Enables and disables everything related to crash reporting including intercepting
   * errors in the global error handler. It is enabled by default.
   * @param isEnabled
   */
  export const setEnabled = (isEnabled: boolean) => {
    NativeInstabug.setCrashReportingEnabled(isEnabled);
  };

  /**
   * Send handled JS error object
   * @param error Error object to be sent to Instabug's servers
   */
  export const reportJSException = (error: ExtendedError) => {
    const jsStackTrace = InstabugUtils.getStackTrace(error);

    const jsonObject = {
      message: error.name + ' - ' + error.message,
      e_message: error.message,
      e_name: error.name,
      os: Platform.OS,
      platform: 'react_native',
      exception: jsStackTrace,
    };

    if (InstabugUtils.isOnReportHandlerSet() && Platform.OS === 'android') {
      IBGEventEmitter.emit(InstabugConstants.SEND_HANDLED_CRASH, jsonObject);
    } else {
      if (Platform.OS === 'android') {
        NativeInstabug.sendHandledJSCrash(JSON.stringify(jsonObject));
      } else {
        NativeInstabug.sendHandledJSCrash(jsonObject);
      }
    }
  };
}
