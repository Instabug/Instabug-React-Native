/**
 * @format
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import 'react-native';
import { NativeModules, Platform } from 'react-native';
import './jest/mockReport';
import Report from '../src/models/Report'

const { Instabug: NativeInstabug } = NativeModules;

describe('Report Model', () => {
  var report;
  
  beforeEach(() => {
    const reportData = {
        tags: ['tag1', 'tag2'],
        consoleLogs: ['consoleLog'],
        instabugLogs: [{log: 'message', type: 'debug'}],
        userAttributes: { age: '24' },
        fileAttachments: [{file: 'path', type: 'url'}]
      };
    const { tags, consoleLogs, instabugLogs, userAttributes, fileAttachments } = reportData;
    report = new Report(tags, consoleLogs, instabugLogs, userAttributes, fileAttachments);
  });

  it('should call the native method appendTagToReport', () => {

    const tagsBefore = report.tags;
    const tag = 'tag3';
    report.appendTag(tag);

    expect(report.tags).toEqual([...tagsBefore, tag]);
    expect(NativeInstabug.appendTagToReport).toBeCalledTimes(1);
    expect(NativeInstabug.appendTagToReport).toBeCalledWith(tag);

  });

  it('should call the native method appendConsoleLogToReport', () => {

    const logsBefore = report.consoleLogs;
    const log = 'consoleLog2';
    report.appendConsoleLog(log);

    expect(report.consoleLogs).toEqual([...logsBefore, log]);
    expect(NativeInstabug.appendConsoleLogToReport).toBeCalledTimes(1);
    expect(NativeInstabug.appendConsoleLogToReport).toBeCalledWith(log);

  });

  it('should call the native method setUserAttributeToReport', () => {

    const key = 'company';
    const value = 'instabug';
    report.setUserAttribute(key, value);

    expect(report.userAttributes).toHaveProperty(key);
    expect(report.userAttributes[key]).toEqual(value);
    expect(NativeInstabug.setUserAttributeToReport).toBeCalledTimes(1);
    expect(NativeInstabug.setUserAttributeToReport).toBeCalledWith(key, value);

  });

  it('should call the native method logDebugToReport', () => {

    const logsBefore = report.instabugLogs;
    const message = 'this is a debug log';
    report.logDebug(message);

    expect(report.instabugLogs).toEqual([...logsBefore, { log: message, type: 'debug' }]);
    expect(NativeInstabug.logDebugToReport).toBeCalledTimes(1);
    expect(NativeInstabug.logDebugToReport).toBeCalledWith(message);

  });

  it('should call the native method logVerboseToReport', () => {

    const logsBefore = report.instabugLogs;
    const message = 'this is a verbose log';
    report.logVerbose(message);

    expect(report.instabugLogs).toEqual([...logsBefore, { log: message, type: 'verbose' }]);
    expect(NativeInstabug.logVerboseToReport).toBeCalledTimes(1);
    expect(NativeInstabug.logVerboseToReport).toBeCalledWith(message);

  });

  it('should call the native method logWarnToReport', () => {

    const logsBefore = report.instabugLogs;
    const message = 'this is a warn log';
    report.logWarn(message);

    expect(report.instabugLogs).toEqual([...logsBefore, { log: message, type: 'warn' }]);
    expect(NativeInstabug.logWarnToReport).toBeCalledTimes(1);
    expect(NativeInstabug.logWarnToReport).toBeCalledWith(message);

  });

  it('should call the native method logErrorToReport', () => {

    const logsBefore = report.instabugLogs;
    const message = 'this is a error log';
    report.logError(message);

    expect(report.instabugLogs).toEqual([...logsBefore, { log: message, type: 'error' }]);
    expect(NativeInstabug.logErrorToReport).toBeCalledTimes(1);
    expect(NativeInstabug.logErrorToReport).toBeCalledWith(message);

  });

  it('should call the native method logInfoToReport', () => {

    const logsBefore = report.instabugLogs;
    const message = 'this is a info log';
    report.logInfo(message);

    expect(report.instabugLogs).toEqual([...logsBefore, { log: message, type: 'info' }]);
    expect(NativeInstabug.logInfoToReport).toBeCalledTimes(1);
    expect(NativeInstabug.logInfoToReport).toBeCalledWith(message);

  });

  it('should call the native method addFileAttachmentWithURLToReport when platform is ios', () => {

    Platform.OS = 'ios';
    const filesBefore = report.fileAttachments;
    const file = 'path/to/file';
    report.addFileAttachmentWithUrl(file);

    expect(report.fileAttachments).toEqual([...filesBefore, { file: file, type: 'url' }]);
    expect(NativeInstabug.addFileAttachmentWithURLToReport).toBeCalledTimes(1);
    expect(NativeInstabug.addFileAttachmentWithURLToReport).toBeCalledWith(file);

  });

  it('should call the native method addFileAttachmentWithURLToReport when platform is android', () => {

    Platform.OS = 'android';
    const filesBefore = report.fileAttachments;
    const file = 'path/to/file';
    const fileName = 'fileName';
    report.addFileAttachmentWithUrl(file, fileName);

    expect(report.fileAttachments).toEqual([...filesBefore, { file: file, type: 'url' }]);
    expect(NativeInstabug.addFileAttachmentWithURLToReport).toBeCalledTimes(1);
    expect(NativeInstabug.addFileAttachmentWithURLToReport).toBeCalledWith(file, fileName);

  });

  it('should call the native method addFileAttachmentWithDataToReport when platform is ios', () => {

    Platform.OS = 'ios';
    const filesBefore = report.fileAttachments;
    const file = 'fileData';
    report.addFileAttachmentWithData(file);

    expect(report.fileAttachments).toEqual([...filesBefore, { file: file, type: 'data' }]);
    expect(NativeInstabug.addFileAttachmentWithDataToReport).toBeCalledTimes(1);
    expect(NativeInstabug.addFileAttachmentWithDataToReport).toBeCalledWith(file);

  });

  it('should call the native method addFileAttachmentWithDataToReport when platform is android', () => {

    Platform.OS = 'android';
    const filesBefore = report.fileAttachments;
    const file = 'fileData';
    const fileName = 'fileName';
    report.addFileAttachmentWithData(file, fileName);

    expect(report.fileAttachments).toEqual([...filesBefore, { file: file, type: 'data' }]);
    expect(NativeInstabug.addFileAttachmentWithDataToReport).toBeCalledTimes(1);
    expect(NativeInstabug.addFileAttachmentWithDataToReport).toBeCalledWith(file, fileName);

  });

});
