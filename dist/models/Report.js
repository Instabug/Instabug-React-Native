import { Platform } from 'react-native';
import { NativeInstabug } from '../native/NativeInstabug';
export default class Report {
    tags;
    consoleLogs;
    instabugLogs;
    userAttributes;
    fileAttachments;
    constructor(tags = [], consoleLogs = [], instabugLogs = [], userAttributes = {}, fileAttachments = []) {
        this.tags = tags;
        this.consoleLogs = consoleLogs;
        this.instabugLogs = instabugLogs;
        this.userAttributes = userAttributes;
        this.fileAttachments = fileAttachments;
    }
    /**
     * Append a tag to the report to be sent.
     * @param tag
     */
    appendTag(tag) {
        NativeInstabug.appendTagToReport(tag);
        this.tags = [...this.tags, tag];
    }
    /**
     * Append a console log to the report to be sent.
     * @param consoleLog
     */
    appendConsoleLog(consoleLog) {
        NativeInstabug.appendConsoleLogToReport(consoleLog);
        this.consoleLogs = [...this.consoleLogs, consoleLog];
    }
    /**
     * Add a user attribute with key and value to the report to be sent.
     * @param key
     * @param value
     */
    setUserAttribute(key, value) {
        NativeInstabug.setUserAttributeToReport(key, value);
        this.userAttributes[key] = value;
    }
    /**
     * Attach debug log to the report to be sent.
     * @param log
     */
    logDebug(log) {
        NativeInstabug.logDebugToReport(log);
        this.instabugLogs = [...this.instabugLogs, { log: log, type: 'debug' }];
    }
    /**
     * Attach verbose log to the report to be sent.
     * @param log
     */
    logVerbose(log) {
        NativeInstabug.logVerboseToReport(log);
        this.instabugLogs = [...this.instabugLogs, { log: log, type: 'verbose' }];
    }
    /**
     * Attach warn log to the report to be sent.
     * @param log
     */
    logWarn(log) {
        NativeInstabug.logWarnToReport(log);
        this.instabugLogs = [...this.instabugLogs, { log: log, type: 'warn' }];
    }
    /**
     * Attach error log to the report to be sent.
     * @param log
     */
    logError(log) {
        NativeInstabug.logErrorToReport(log);
        this.instabugLogs = [...this.instabugLogs, { log: log, type: 'error' }];
    }
    /**
     * Attach info log to the report to be sent.
     * @param log
     */
    logInfo(log) {
        NativeInstabug.logInfoToReport(log);
        this.instabugLogs = [...this.instabugLogs, { log: log, type: 'info' }];
    }
    /**
     * Attach a file to the report to be sent.
     * @param url
     * @param fileName
     */
    addFileAttachmentWithUrl(url, fileName) {
        if (Platform.OS === 'ios') {
            NativeInstabug.addFileAttachmentWithURLToReport(url);
        }
        else {
            NativeInstabug.addFileAttachmentWithURLToReport(url, fileName);
        }
        this.fileAttachments = [...this.fileAttachments, { file: url, type: 'url' }];
    }
    /**
     * Attach a file to the report to be sent.
     * @param data
     * @param fileName
     */
    addFileAttachmentWithData(data, fileName) {
        if (Platform.OS === 'ios') {
            NativeInstabug.addFileAttachmentWithDataToReport(data);
        }
        else {
            NativeInstabug.addFileAttachmentWithDataToReport(data, fileName);
        }
        this.fileAttachments = [...this.fileAttachments, { file: data, type: 'data' }];
    }
}
