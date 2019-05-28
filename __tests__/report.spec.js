/**
 * @format
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import 'react-native';
import { NativeModules, Platform } from 'react-native';
import '../jest/mockReport';
import Report from '../models/Report'
import sinon from 'sinon';

describe('Report Model', () => {
  
  const appendTagToReport = sinon.spy(NativeModules.Instabug, 'appendTagToReport');
  const appendConsoleLogToReport = sinon.spy(NativeModules.Instabug, 'appendConsoleLogToReport');
  const setUserAttributeToReport = sinon.spy(NativeModules.Instabug, 'setUserAttributeToReport');
  const logDebugToReport = sinon.spy(NativeModules.Instabug, 'logDebugToReport');
  const logVerboseToReport = sinon.spy(NativeModules.Instabug, 'logVerboseToReport');
  const logWarnToReport = sinon.spy(NativeModules.Instabug, 'logWarnToReport');
  const logErrorToReport = sinon.spy(NativeModules.Instabug, 'logErrorToReport');
  const logInfoToReport = sinon.spy(NativeModules.Instabug, 'logInfoToReport');
  const addFileAttachmentWithURLToReport = sinon.spy(NativeModules.Instabug, 'addFileAttachmentWithURLToReport');
  const addFileAttachmentWithDataToReport = sinon.spy(NativeModules.Instabug, 'addFileAttachmentWithDataToReport');
  var report;
  
  beforeEach(() => {
      addFileAttachmentWithDataToReport.resetHistory();
      addFileAttachmentWithURLToReport.resetHistory();
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
    expect(appendTagToReport.calledOnceWithExactly(tag)).toBe(true);

  });

  it('should call the native method appendConsoleLogToReport', () => {

    const logsBefore = report.consoleLogs;
    const log = 'consoleLog2';
    report.appendConsoleLog(log);

    expect(report.consoleLogs).toEqual([...logsBefore, log]);
    expect(appendConsoleLogToReport.calledOnceWithExactly(log)).toBe(true);

  });

  it('should call the native method setUserAttributeToReport', () => {

    const key = 'company';
    const value = 'instabug';
    report.setUserAttribute(key, value);

    expect(report.userAttributes).toHaveProperty(key);
    expect(report.userAttributes[key]).toEqual(value);
    expect(setUserAttributeToReport.calledOnceWithExactly(key, value)).toBe(true);

  });

  it('should call the native method logDebugToReport', () => {

    const logsBefore = report.instabugLogs;
    const message = 'this is a debug log';
    report.logDebug(message);

    expect(report.instabugLogs).toEqual([...logsBefore, { log: message, type: 'debug' }]);
    expect(logDebugToReport.calledOnceWithExactly(message)).toBe(true);

  });

  it('should call the native method logVerboseToReport', () => {

    const logsBefore = report.instabugLogs;
    const message = 'this is a verbose log';
    report.logVerbose(message);

    expect(report.instabugLogs).toEqual([...logsBefore, { log: message, type: 'verbose' }]);
    expect(logVerboseToReport.calledOnceWithExactly(message)).toBe(true);

  });

  it('should call the native method logWarnToReport', () => {

    const logsBefore = report.instabugLogs;
    const message = 'this is a warn log';
    report.logWarn(message);

    expect(report.instabugLogs).toEqual([...logsBefore, { log: message, type: 'warn' }]);
    expect(logWarnToReport.calledOnceWithExactly(message)).toBe(true);

  });

  it('should call the native method logErrorToReport', () => {

    const logsBefore = report.instabugLogs;
    const message = 'this is a error log';
    report.logError(message);

    expect(report.instabugLogs).toEqual([...logsBefore, { log: message, type: 'error' }]);
    expect(logErrorToReport.calledOnceWithExactly(message)).toBe(true);

  });

  it('should call the native method logInfoToReport', () => {

    const logsBefore = report.instabugLogs;
    const message = 'this is a info log';
    report.logInfo(message);

    expect(report.instabugLogs).toEqual([...logsBefore, { log: message, type: 'info' }]);
    expect(logInfoToReport.calledOnceWithExactly(message)).toBe(true);

  });

  it('should call the native method addFileAttachmentWithURLToReport when platform is ios', () => {

    Platform.OS = 'ios';
    const filesBefore = report.fileAttachments;
    const file = 'path/to/file';
    report.addFileAttachmentWithUrl(file);

    expect(report.fileAttachments).toEqual([...filesBefore, { file: file, type: 'url' }]);
    expect(addFileAttachmentWithURLToReport.calledOnceWithExactly(file)).toBe(true);

  });

  it('should call the native method addFileAttachmentWithURLToReport when platform is android', () => {

    Platform.OS = 'android';
    const filesBefore = report.fileAttachments;
    const file = 'path/to/file';
    const fileName = 'fileName';
    report.addFileAttachmentWithUrl(file, fileName);

    expect(report.fileAttachments).toEqual([...filesBefore, { file: file, type: 'url' }]);
    expect(addFileAttachmentWithURLToReport.calledOnceWithExactly(file, fileName)).toBe(true);

  });

  it('should call the native method addFileAttachmentWithDataToReport when platform is ios', () => {

    Platform.OS = 'ios';
    const filesBefore = report.fileAttachments;
    const file = 'fileData';
    report.addFileAttachmentWithData(file);

    expect(report.fileAttachments).toEqual([...filesBefore, { file: file, type: 'data' }]);
    expect(addFileAttachmentWithDataToReport.calledOnceWithExactly(file)).toBe(true);

  });

  it('should call the native method addFileAttachmentWithDataToReport when platform is android', () => {

    Platform.OS = 'android';
    const filesBefore = report.fileAttachments;
    const file = 'fileData';
    const fileName = 'fileName';
    report.addFileAttachmentWithData(file, fileName);

    expect(report.fileAttachments).toEqual([...filesBefore, { file: file, type: 'data' }]);
    expect(addFileAttachmentWithDataToReport.calledOnceWithExactly(file, fileName)).toBe(true);

  });

});
