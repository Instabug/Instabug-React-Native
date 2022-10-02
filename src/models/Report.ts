import { Platform } from 'react-native';
import { NativeInstabug } from '../native';

export interface UserAttributesMap {
  [key: string]: string;
}

interface LogInfo {
  log: string;
  type: 'verbose' | 'debug' | 'warn' | 'info' | 'error';
}

interface FileAttachmentInfo {
  file: string;
  type: 'url' | 'data';
}

export default class Report {
  constructor(
    public tags: string[] = [],
    public consoleLogs: string[] = [],
    public instabugLogs: LogInfo[] = [],
    public userAttributes: UserAttributesMap = {},
    public fileAttachments: FileAttachmentInfo[] = [],
  ) {}

  /**
   * Append a tag to the report to be sent.
   * @param {string} tag
   */
  appendTag(tag: string) {
    NativeInstabug.appendTagToReport(tag);
    this.tags = [...this.tags, tag];
  }

  /**
   * Append a console log to the report to be sent.
   * @param {string} consoleLog
   */
  appendConsoleLog(consoleLog: string) {
    NativeInstabug.appendConsoleLogToReport(consoleLog);
    this.consoleLogs = [...this.consoleLogs, consoleLog];
  }

  /**
   * Add a user attribute with key and value to the report to be sent.
   * @param {string} key
   * @param {string} value
   */
  setUserAttribute(key: string, value: string) {
    NativeInstabug.setUserAttributeToReport(key, value);
    this.userAttributes[key] = value;
  }

  /**
   * Attach debug log to the report to be sent.
   * @param {string} log
   */
  logDebug(log: string) {
    NativeInstabug.logDebugToReport(log);
    this.instabugLogs = [...this.instabugLogs, { log: log, type: 'debug' }];
  }

  /**
   * Attach verbose log to the report to be sent.
   * @param {string} log
   */
  logVerbose(log: string) {
    NativeInstabug.logVerboseToReport(log);
    this.instabugLogs = [...this.instabugLogs, { log: log, type: 'verbose' }];
  }

  /**
   * Attach warn log to the report to be sent.
   * @param {string} log
   */
  logWarn(log: string) {
    NativeInstabug.logWarnToReport(log);
    this.instabugLogs = [...this.instabugLogs, { log: log, type: 'warn' }];
  }

  /**
   * Attach error log to the report to be sent.
   * @param {string} log
   */
  logError(log: string) {
    NativeInstabug.logErrorToReport(log);
    this.instabugLogs = [...this.instabugLogs, { log: log, type: 'error' }];
  }

  /**
   * Attach info log to the report to be sent.
   * @param {string} log
   */
  logInfo(log: string) {
    NativeInstabug.logInfoToReport(log);
    this.instabugLogs = [...this.instabugLogs, { log: log, type: 'info' }];
  }

  /**
   * Attach a file to the report to be sent.
   * @param {string} url
   * @param {string} fileName
   */
  addFileAttachmentWithUrl(url: string, fileName: string) {
    if (Platform.OS === 'ios') {
      NativeInstabug.addFileAttachmentWithURLToReport(url);
    } else {
      NativeInstabug.addFileAttachmentWithURLToReport(url, fileName);
    }
    this.fileAttachments = [...this.fileAttachments, { file: url, type: 'url' }];
  }

  /**
   * Attach a file to the report to be sent.
   * @param {string} data
   * @param {string} fileName
   */
  addFileAttachmentWithData(data: string, fileName: string) {
    if (Platform.OS === 'ios') {
      NativeInstabug.addFileAttachmentWithDataToReport(data);
    } else {
      NativeInstabug.addFileAttachmentWithDataToReport(data, fileName);
    }
    this.fileAttachments = [...this.fileAttachments, { file: data, type: 'data' }];
  }
}
