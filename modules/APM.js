import {
    NativeModules
} from 'react-native';
import Trace from '../models/Trace';
let { IBGAPM } = NativeModules;

/**
 * APM
 * @exports APM
 */
export default {

    /**
     * Enables and disables APM
     * @param {boolean} isEnabled 
     */
    setEnabled(isEnabled) {
        IBGAPM.setEnabled(isEnabled);
    },

    /**
  * Enables and disables App Launch
  * @param {boolean} isEnabled 
  */
    setAppLaunchEnabled(isEnabled) {
        IBGAPM.setEnabled(isEnabled);
    },

    /**
    * Enables and disables App Launch
    * @param {boolean} isEnabled 
    */
    startTrace(name) {
        const id = Date.now() + "";
        IBGAPM.startTrace(name, id);
        return new Trace(id, name);
    },

}
