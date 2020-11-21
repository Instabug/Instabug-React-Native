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
     * Sets the printed logs priority. Filter to one of the following levels:
     *
     * - logLevelNone disables all APM SDK console logs.
     *
     * - logLevelError prints errors only, we use this level to let you know if something goes wrong.
     *
     * - logLevelWarning displays warnings that will not necessarily lead to errors but should be addressed nonetheless.
     *
     * - logLevelInfo (default) logs information that we think is useful without being too verbose.
     *
     * - logLevelDebug use this in case you are debugging an issue. Not recommended for production use.
     *
     * - logLevelVerbose use this only if logLevelDebug was not enough and you need more visibility
     * on what is going on under the hood.
     *
     * Similar to the logLevelDebug level, this is not meant to be used on production environments.
     *
     * Each log level will also include logs from all the levels above it. For instance,
     * logLevelInfo will include logLevelInfo logs as well as logLevelWarning
     * and logLevelError logs.

     * @param {logLevel} the printed logs priority.
     */
    setLogLevel(logLevel) {
        IBGAPM.setLogLevel(logLevel);
    },
    
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
    setAutoUITraceEnabled(isEnabled) {
        if (Platform.OS === 'ios') {
            IBGAPM.setAutoUITraceEnabled(isEnabled);
        }
    },

    /**
     * Starts a custom trace
     * @param {string} name 
     */
    startExecutionTrace(name) {
        const id = Date.now() + '';
        IBGAPM.startExecutionTrace(name, id);
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

    /**
     * Used for internal testing.
     */
    _ibgSleep() {
        IBGAPM.ibgSleep();
    }
};
