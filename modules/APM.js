import {
    NativeModules,
    Platform,
} from 'react-native';
import Trace from '../models/Trace';
let { Instabug, IBGAPM } = NativeModules;


/**
 * APM
 * @exports APM
 */
export default {
    /**
     * Enables or disables APM
     * @param {boolean} isEnabled 
     */
    setEnabled(isEnabled) {
        IBGAPM.setEnabled(isEnabled);
    },

    /**
     * Enables or disables APM App Launch
     * @param {boolean} isEnabled 
     */
    setAppLaunchEnabled(isEnabled) {
        IBGAPM.setEnabled(isEnabled);
    },

    /**
     * Enables or disables APM Network Metric
     * @param {boolean} isEnabled 
     */
    setNetworkEnabledIOS(isEnabled) {
        if (Platform.OS === 'ios') {
            Instabug.setNetworkLoggingEnabled(isEnabled);
        }
    },

    /**
     * Enables or disables APM UI Responsivenes tracking feature
     * @param {boolean} isEnabled 
     */
    setUIHangEnabled(isEnabled) {
        if (Platform.OS === 'ios') {
            IBGAPM.setUIHangEnabled(isEnabled);
        }
    },

    /**
     * Starts a custom trace
     * @param {string} name 
     */
    startTrace(name) {
        const id = Date.now() + '';
        IBGAPM.startTrace(name, id);
        return new Trace(id, name);
    },

    /**
     * Starts a custom trace
     * @param {string} name 
     */
    startUITrace(name) {
        IBGAPM.startUITrace(name);
    },

    /**
     * Starts a custom trace
     * @param {string} name 
     */
    endUITrace() {
        IBGAPM.endUITrace();
    },
};
