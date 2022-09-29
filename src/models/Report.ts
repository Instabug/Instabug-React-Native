import { Platform } from 'react-native';
import { Instabug } from 'src/native';

interface UserAttributesMap {
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
  tags: string[];
  consoleLogs: string[];
  instabugLogs: LogInfo[];
  userAttributes: UserAttributesMap;
  fileAttachments: FileAttachmentInfo[];

  constructor(
    tags?: string[],
    consoleLogs?: string[],
    instabugLogs?: LogInfo[],
    userAttributes?: UserAttributesMap,
    fileAttachments?: FileAttachmentInfo[],
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
  appendTag(tag: string) {
    Instabug.appendTagToReport(tag);
    this.tags = [...this.tags, tag];
  }

  /**
   * Append a console log to the report to be sent.
   * @param {string} consoleLog
   */
  appendConsoleLog(consoleLog: string) {
    Instabug.appendConsoleLogToReport(consoleLog);
    this.consoleLogs = [...this.consoleLogs, consoleLog];
  }

  /**
   * Add a user attribute with key and value to the report to be sent.
   * @param {string} key
   * @param {string} value
   */
  setUserAttribute(key: string, value: string) {
    Instabug.setUserAttributeToReport(key, value);
    this.userAttributes[key] = value;
  }

  /**
   * Attach debug log to the report to be sent.
   * @param {string} log
   */
  logDebug(log: string) {
    Instabug.logDebugToReport(log);
    this.instabugLogs = [...this.instabugLogs, { log: log, type: 'debug' }];
  }

  /**
   * Attach verbose log to the report to be sent.
   * @param {string} log
   */
  logVerbose(log: string) {
    Instabug.logVerboseToReport(log);
    this.instabugLogs = [...this.instabugLogs, { log: log, type: 'verbose' }];
  }

  /**
   * Attach warn log to the report to be sent.
   * @param {string} log
   */
  logWarn(log: string) {
    Instabug.logWarnToReport(log);
    this.instabugLogs = [...this.instabugLogs, { log: log, type: 'warn' }];
  }

  /**
   * Attach error log to the report to be sent.
   * @param {string} log
   */
  logError(log: string) {
    Instabug.logErrorToReport(log);
    this.instabugLogs = [...this.instabugLogs, { log: log, type: 'error' }];
  }

  /**
   * Attach info log to the report to be sent.
   * @param {string} log
   */
  logInfo(log: string) {
    Instabug.logInfoToReport(log);
    this.instabugLogs = [...this.instabugLogs, { log: log, type: 'info' }];
  }

  /**
   * Attach a file to the report to be sent.
   * @param {string} url
   * @param {string} fileName
   */
  addFileAttachmentWithUrl(url: string, fileName: string) {
    if (Platform.OS === 'ios') {
      Instabug.addFileAttachmentWithURLToReport(url);
    } else {
      Instabug.addFileAttachmentWithURLToReport(url, fileName);
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
      Instabug.addFileAttachmentWithDataToReport(data);
    } else {
      Instabug.addFileAttachmentWithDataToReport(data, fileName);
    }
    this.fileAttachments = [...this.fileAttachments, { file: data, type: 'data' }];
  }
}
