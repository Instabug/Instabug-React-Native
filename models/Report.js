import { NativeModules, Platform } from 'react-native';
let { Instabug } = NativeModules;

export default class Report {

  constructor(
    tags,
    consoleLogs,
    instabugLogs,
    userAttributes,
    fileAttachments
  ) {
    this.tags = tags ? tags : [];
    this.consoleLogs = consoleLogs ? consoleLogs : [];
    this.instabugLogs = instabugLogs ? instabugLogs : [];
    this.userAttributes = userAttributes ? userAttributes : {};
    this.fileAttachments = fileAttachments ? fileAttachments : [];
  }

  /**
   * Append a tag to the report to be sent.
   * @param {string} tag 
   */
  appendTag(tag) {
    Instabug.appendTagToReport(tag);
    this.tags = [...this.tags, tag];
  }

  /**
   * Append a console log to the report to be sent.
   * @param {string} consoleLog 
   */
  appendConsoleLog(consoleLog) {
    Instabug.appendConsoleLogToReport(consoleLog);
    this.consoleLogs = [...this.consoleLogs, consoleLog];
  }

  /**
   * Add a user attribute with key and value to the report to be sent.
   * @param {string} key 
   * @param {string} value 
   */
  setUserAttribute(key, value) {
    Instabug.setUserAttributeToReport(key, value);
    this.userAttributes[key] = value;
  }

  /**
   * Attach debug log to the report to be sent.
   * @param {string} log 
   */
  logDebug(log) {
    Instabug.logDebugToReport(log);
    this.instabugLogs = [...this.instabugLogs, {log: log, type: 'debug'}];
  }

  /**
   * Attach verbose log to the report to be sent.
   * @param {string} log 
   */
  logVerbose(log) {
    Instabug.logVerboseToReport(log);
    this.instabugLogs = [...this.instabugLogs, {log: log, type: 'verbose'}];
  }

  /**
   * Attach warn log to the report to be sent.
   * @param {string} log 
   */
  logWarn(log) {
    Instabug.logWarnToReport(log);
    this.instabugLogs = [...this.instabugLogs, {log: log, type: 'warn'}];
  }

  /**
   * Attach error log to the report to be sent.
   * @param {string} log 
   */
  logError(log) {
    Instabug.logErrorToReport(log);
    this.instabugLogs = [...this.instabugLogs, {log: log, type: 'error'}];
  }

  /**
   * Attach info log to the report to be sent.
   * @param {string} log 
   */
  logInfo(log) {
    Instabug.logInfoToReport(log);
    this.instabugLogs = [...this.instabugLogs, {log: log, type: 'info'}];
  }

  /**
   * Attach a file to the report to be sent.
   * @param {string} url 
   * @param {string} fileName 
   */
  addFileAttachmentWithUrl(url, fileName) {
    if (Platform.OS === 'ios') {
      Instabug.addFileAttachmentWithURLToReport(url);
    } else {
      Instabug.addFileAttachmentWithURLToReport(url, fileName);
    }
    this.fileAttachments = [...this.fileAttachments, {file: url, type: 'url'}];
  }

  /**
   * Attach a file to the report to be sent.
   * @param {string} data 
   * @param {string} fileName 
   */
  addFileAttachmentWithData(data, fileName) {
    if (Platform.OS === 'ios') {
      Instabug.addFileAttachmentWithDataToReport(data);
    } else {
      Instabug.addFileAttachmentWithDataToReport(data, fileName);
    }
    this.fileAttachments = [...this.fileAttachments, {file: data, type: 'data'}];
  }
}
