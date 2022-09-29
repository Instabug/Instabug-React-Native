/**
 * @format
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import 'react-native';
import React from 'react';
import { NativeModules, Platform, processColor, findNodeHandle, Text } from 'react-native';
import waitForExpect from 'wait-for-expect';
import './jest/mockInstabug';
import './jest/mockInstabugUtils';
import './jest/mockXhrNetworkInterceotor';
import Instabug from '../src/modules/Instabug';
import Report from '../src/models/Report';

import IBGConstants from '../src/utils/InstabugConstants';
import IBGEventEmitter from '../src/utils/IBGEventEmitter';
import { green } from 'ansi-colors';
import InstabugUtils from '../src/utils/InstabugUtils';

const { Instabug: NativeInstabug } = NativeModules;

describe('Instabug Module', () => {
  beforeEach(() => {
    IBGEventEmitter.removeAllListeners();
  });

  it('componentDidAppearListener should call the native method reportScreenChange', () => {
    const screenName = 'some-screen';
    var obj = { componentId: '1', componentName: screenName, passProps: 'screenName' };
    Instabug.componentDidAppearListener(obj);
    expect(NativeInstabug.reportScreenChange).toBeCalledTimes(1);
    expect(NativeInstabug.reportScreenChange).toBeCalledWith(screenName);
  });

  it('onNavigationStateChange should call the native method reportScreenChange', async () => {
    InstabugUtils.getActiveRouteName.mockImplementation(screenName => screenName);
    Instabug.onNavigationStateChange('home', 'settings');

    await waitForExpect(() => {
      expect(NativeInstabug.reportScreenChange).toBeCalledTimes(1);
      expect(NativeInstabug.reportScreenChange).toBeCalledWith('settings');
    });
  });

  it('should call the native method start', () => {
    const token = 'some-token';
    const invocationEvents = [
      Instabug.invocationEvent.floatingButton,
      Instabug.invocationEvent.shake,
    ];
    Instabug.start(token, invocationEvents);

    expect(NativeInstabug.start).toBeCalledTimes(1);
    expect(NativeInstabug.start).toBeCalledWith(token, invocationEvents);
  });

  it('should call the native method setUserData', () => {
    const userData = 'userData';
    Instabug.setUserData(userData);

    expect(NativeInstabug.setUserData).toBeCalledTimes(1);
    expect(NativeInstabug.setUserData).toBeCalledWith(userData);
  });

  it('should call the native method setTrackUserSteps', () => {
    Platform.OS = 'ios';
    Instabug.setTrackUserSteps(true);

    expect(NativeInstabug.setTrackUserSteps).toBeCalledTimes(1);
    expect(NativeInstabug.setTrackUserSteps).toBeCalledWith(true);
  });

  it('should not call the native method setTrackUserSteps when platform is android', () => {
    Platform.OS = 'android';
    Instabug.setTrackUserSteps(true);

    expect(NativeInstabug.setTrackUserSteps).not.toBeCalled();
  });

  it('should call the native method setIBGLogPrintsToConsole', () => {
    Platform.OS = 'ios';
    Instabug.setIBGLogPrintsToConsole(true);

    expect(NativeInstabug.setIBGLogPrintsToConsole).toBeCalledTimes(1);
    expect(NativeInstabug.setIBGLogPrintsToConsole).toBeCalledWith(true);
  });

  it('should not call the native method setIBGLogPrintsToConsole when platform is android', () => {

    Platform.OS = 'android';
    Instabug.setIBGLogPrintsToConsole(true);

    expect(NativeInstabug.setIBGLogPrintsToConsole).not.toBeCalled();
  });

  it('should call the native method setSessionProfilerEnabled', () => {
    Instabug.setSessionProfilerEnabled(true);

    expect(NativeInstabug.setSessionProfilerEnabled).toBeCalledTimes(1);
    expect(NativeInstabug.setSessionProfilerEnabled).toBeCalledWith(true);
  });

  it('should call the native method setLocale', () => {
    const locale = Instabug.locale.english;
    Instabug.setLocale(locale);

    expect(NativeInstabug.setLocale).toBeCalledTimes(1);
    expect(NativeInstabug.setLocale).toBeCalledWith(locale);
  });

  it('should call the native method setColorTheme', () => {
    const theme = Instabug.colorTheme.dark;
    Instabug.setColorTheme(theme);

    expect(NativeInstabug.setColorTheme).toBeCalledTimes(1);
    expect(NativeInstabug.setColorTheme).toBeCalledWith(theme);
  });

  it('should call the native method setPrimaryColor', () => {
    const color = green;
    Instabug.setPrimaryColor(color);

    expect(NativeInstabug.setPrimaryColor).toBeCalledTimes(1);
    expect(NativeInstabug.setPrimaryColor).toBeCalledWith(processColor(color));
  });

  it('should call the native method appendTags', () => {
    const tags = ['tag1', 'tag2'];
    Instabug.appendTags(tags);

    expect(NativeInstabug.appendTags).toBeCalledTimes(1);
    expect(NativeInstabug.appendTags).toBeCalledWith(tags);
  });

  it('should call the native method resetTags', () => {
    Instabug.resetTags();

    expect(NativeInstabug.resetTags).toBeCalledTimes(1);
  });

  it('should call native method getTags', done => {
    const callback = tags => {
      expect(tags).toBeDefined();
      done();
    };
    Instabug.getTags(callback);
    expect(NativeInstabug.getTags).toBeCalledTimes(1);
    expect(NativeInstabug.getTags).toBeCalledWith(callback);
  });

  it('should call the native method setString', () => {
    const string = 'report an issue';
    const key = Instabug.strings.reportBug;
    Instabug.setString(key, string);

    expect(NativeInstabug.setString).toBeCalledTimes(1);
    expect(NativeInstabug.setString).toBeCalledWith(string, key);
  });

  it('should call the native method identifyUser', () => {
    const email = 'foo@instabug.com';
    const name = 'Instabug';
    Instabug.identifyUser(email, name);

    expect(NativeInstabug.identifyUser).toBeCalledTimes(1);
    expect(NativeInstabug.identifyUser).toBeCalledWith(email, name);
  });

  it('should call the native method logOut', () => {
    Instabug.logOut();

    expect(NativeInstabug.logOut).toBeCalledTimes(1);
  });

  it('should call the native method logUserEvent', () => {
    const event = 'click';
    Instabug.logUserEvent(event);

    expect(NativeInstabug.logUserEvent).toBeCalledTimes(1);
    expect(NativeInstabug.logUserEvent).toBeCalledWith(event);
  });

  it('should call the native method logVerbose', () => {
    const message = 'log';
    Instabug.logVerbose(message);

    expect(NativeInstabug.logVerbose).toBeCalledTimes(1);
  });

  it('should call the native method logDebug', () => {
    const message = 'log';
    Instabug.logDebug(message);

    expect(NativeInstabug.logDebug).toBeCalledTimes(1);
  });

  it('should call the native method logInfo', () => {
    const message = 'log';
    Instabug.logInfo(message);

    expect(NativeInstabug.logInfo).toBeCalledTimes(1);
  });

  it('should call the native method logWarn', () => {
    const message = 'log';
    Instabug.logWarn(message);

    expect(NativeInstabug.logWarn).toBeCalledTimes(1);
  });

  it('should call the native method logError', () => {
    const message = 'log';
    Instabug.logError(message);

    expect(NativeInstabug.logError).toBeCalledTimes(1);
  });

  it('should call the native method clearLogs', () => {
    Instabug.clearLogs();

    expect(NativeInstabug.clearLogs).toBeCalledTimes(1);
  });

  it('should call the native method setReproStepsMode', () => {
    const mode = Instabug.reproStepsMode.enabled;
    Instabug.setReproStepsMode(mode);

    expect(NativeInstabug.setReproStepsMode).toBeCalledTimes(1);
    expect(NativeInstabug.setReproStepsMode).toBeCalledWith(mode);
  });

  it('should call the native method setSdkDebugLogsLevel on iOS', () => {
    const debugLevel = Instabug.sdkDebugLogsLevel.sdkDebugLogsLevelVerbose;

    Platform.OS = 'ios';
    Instabug.setSdkDebugLogsLevel(debugLevel);

    expect(NativeInstabug.setSdkDebugLogsLevel).toBeCalledTimes(1);
    expect(NativeInstabug.setSdkDebugLogsLevel).toBeCalledWith(debugLevel);
  });

  it('should not call the native method setSdkDebugLogsLevel on Android', () => {
    const debugLevel = Instabug.sdkDebugLogsLevel.sdkDebugLogsLevelVerbose;

    Platform.OS = 'android';
    Instabug.setSdkDebugLogsLevel(debugLevel);

    expect(NativeInstabug.setSdkDebugLogsLevel).not.toBeCalled();
  });

  it('should call the native method setUserAttribute', () => {
    const key = 'age';
    const value = '24';
    Instabug.setUserAttribute(key, value);

    expect(NativeInstabug.setUserAttribute).toBeCalledTimes(1);
    expect(NativeInstabug.setUserAttribute).toBeCalledWith(key, value);
  });

  it('should call native method getUserAttribute', done => {
    const callback = value => {
      expect(value).toBeDefined();
      done();
    };
    const key = 'age';
    Instabug.getUserAttribute(key, callback);
    expect(NativeInstabug.getUserAttribute).toBeCalledTimes(1);
    expect(NativeInstabug.getUserAttribute).toBeCalledWith(key, callback);
  });

  it('should call the native method removeUserAttribute', () => {
    const key = 'age';
    Instabug.removeUserAttribute(key);

    expect(NativeInstabug.removeUserAttribute).toBeCalledTimes(1);
    expect(NativeInstabug.removeUserAttribute).toBeCalledWith(key);
  });

  it('should call native method getAllUserAttributes', done => {
    const callback = value => {
      expect(value).toBeDefined();
      done();
    };
    Instabug.getAllUserAttributes(callback);
    expect(NativeInstabug.getAllUserAttributes).toBeCalledTimes(1);
    expect(NativeInstabug.getAllUserAttributes).toBeCalledWith(callback);
  });

  it('should call the native method clearAllUserAttributes', () => {
    Instabug.clearAllUserAttributes();

    expect(NativeInstabug.clearAllUserAttributes).toBeCalledTimes(1);
  });

  it('should call the native method setDebugEnabled', () => {
    Platform.OS = 'android';
    Instabug.setDebugEnabled(true);

    expect(NativeInstabug.setDebugEnabled).toBeCalledTimes(1);
    expect(NativeInstabug.setDebugEnabled).toBeCalledWith(true);
  });

  it('should not call the native method setDebugEnabled when platform is ios', () => {
    Platform.OS = 'ios';
    Instabug.setDebugEnabled(true);

    expect(NativeInstabug.setDebugEnabled).not.toBeCalled();
  });

  it('should call the native method enable', () => {
    Platform.OS = 'android';
    Instabug.enable();

    expect(NativeInstabug.enable).toBeCalledTimes(1);
  });

  it('should not call the native method enable when platform is ios', () => {
    Platform.OS = 'ios';
    Instabug.enable();

    expect(NativeInstabug.enable).not.toBeCalled();
  });

  it('should call the native method disable', () => {
    Platform.OS = 'android';
    Instabug.disable();

    expect(NativeInstabug.disable).toBeCalledTimes(1);
  });

  it('should not call the native method disable when platform is ios', () => {
    Platform.OS = 'ios';
    Instabug.disable();

    expect(NativeInstabug.disable).not.toBeCalled();
  });

  it('should call the native method isRunningLive', done => {
    Platform.OS = 'ios';
    const callback = isRunningLive => {
      expect(isRunningLive).toBeDefined();
      done();
    };
    Instabug.isRunningLive(callback);

    expect(NativeInstabug.isRunningLive).toBeCalledTimes(1);
    expect(NativeInstabug.isRunningLive).toBeCalledWith(callback);
  });

  it('should not call the native method isRunningLive when platform is android', () => {
    Platform.OS = 'android';
    Instabug.isRunningLive(jest.fn());

    expect(NativeInstabug.isRunningLive).not.toBeCalled();
  });

  it('should call the native method showWelcomeMessageWithMode', () => {
    const mode = Instabug.welcomeMessageMode.beta;
    Instabug.showWelcomeMessage(mode);

    expect(NativeInstabug.showWelcomeMessageWithMode).toBeCalledTimes(1);
    expect(NativeInstabug.showWelcomeMessageWithMode).toBeCalledWith(mode);
  });

  it('should call the native method setWelcomeMessageMode', () => {
    const mode = Instabug.welcomeMessageMode.beta;
    Instabug.setWelcomeMessageMode(mode);

    expect(NativeInstabug.setWelcomeMessageMode).toBeCalledTimes(1);
    expect(NativeInstabug.setWelcomeMessageMode).toBeCalledWith(mode);
  });

  it('should call the native method setFileAttachment with filePath when platform is ios', () => {
    Platform.OS = 'ios';
    const path = '~/path';
    Instabug.addFileAttachment(path);

    expect(NativeInstabug.setFileAttachment).toBeCalledTimes(1);
    expect(NativeInstabug.setFileAttachment).toBeCalledWith(path);
  });

  it('should call the native method setFileAttachment with filePath and fileName when platform is android', () => {
    Platform.OS = 'android';
    const path = '~/path';
    const name = 'file';
    Instabug.addFileAttachment(path, name);

    expect(NativeInstabug.setFileAttachment).toBeCalledTimes(1);
    expect(NativeInstabug.setFileAttachment).toBeCalledWith(path, name);
  });

  it('should call the native method addPrivateView', () => {
    <Text ref={c => (this.textView = c)} />;
    Instabug.addPrivateView(this.textView);

    expect(NativeInstabug.addPrivateView).toBeCalledTimes(1);
    expect(NativeInstabug.addPrivateView).toBeCalledWith(findNodeHandle(this.textView));
  });

  it('should call the native method removePrivateView', () => {
    <Text ref={c => (this.textView = c)} />;
    Instabug.removePrivateView(this.textView);

    expect(NativeInstabug.removePrivateView).toBeCalledTimes(1);
    expect(NativeInstabug.removePrivateView).toBeCalledWith(findNodeHandle(this.textView));
  });

  it('should call the native method show', () => {
    Instabug.show();

    expect(NativeInstabug.show).toBeCalledTimes(1);
  });

  it('should set _isOnReportHandlerSet to true on calling onReportSubmitHandler', () => {
    Instabug.onReportSubmitHandler(jest.fn());
    InstabugUtils.isOnReportHandlerSet.mockImplementation(() => true);
    const isReportHandlerSet = InstabugUtils.isOnReportHandlerSet();

    expect(isReportHandlerSet).toBe(true);
  });

  it('should call the native method setPreSendingHandler with a function', () => {
    const callback = jest.fn();
    Instabug.onReportSubmitHandler(callback);

    expect(NativeInstabug.setPreSendingHandler).toBeCalledTimes(1);
    expect(NativeInstabug.setPreSendingHandler).toBeCalledWith(callback);
  });

  it('should invoke callback on emitting the event IBGpreSendingHandler', done => {
    const report = {
      tags: ['tag1', 'tag2'],
      consoleLogs: ['consoleLog'],
      instabugLogs: ['instabugLog'],
      userAttributes: [{ age: '24' }],
      fileAttachments: ['path'],
    };
    const callback = rep => {
      expect(rep).toBeInstanceOf(Report);
      expect(rep.tags).toBe(report.tags);
      expect(rep.consoleLogs).toBe(report.consoleLogs);
      expect(rep.instabugLogs).toBe(report.instabugLogs);
      expect(rep.userAttributes).toBe(report.userAttributes);
      expect(rep.fileAttachments).toBe(report.fileAttachments);
      done();
    };
    Instabug.onReportSubmitHandler(callback);
    IBGEventEmitter.emit(IBGConstants.PRESENDING_HANDLER, report);

    expect(IBGEventEmitter.getListeners(IBGConstants.PRESENDING_HANDLER).length).toEqual(1);
  });

  it('should invoke callback on emitting the event IBGSendHandledJSCrash', async done => {
    Platform.OS = 'android';
    const report = {
      tags: ['tag1', 'tag2'],
      consoleLogs: ['consoleLog'],
      instabugLogs: ['instabugLog'],
      userAttributes: [{ age: '24' }],
      fileAttachments: ['path'],
    };
    NativeModules.Instabug.getReport.mockResolvedValue(report);
    const jsonObject = { stack: 'error' };
    const callback = rep => {
      expect(rep).toBeInstanceOf(Report);
      expect(rep.tags).toBe(report.tags);
      expect(rep.consoleLogs).toBe(report.consoleLogs);
      expect(rep.instabugLogs).toBe(report.instabugLogs);
      expect(rep.userAttributes).toBe(report.userAttributes);
      expect(rep.fileAttachments).toBe(report.fileAttachments);
      done();
    };
    Instabug.onReportSubmitHandler(callback);
    IBGEventEmitter.emit(IBGConstants.SEND_HANDLED_CRASH, jsonObject);

    expect(IBGEventEmitter.getListeners(IBGConstants.SEND_HANDLED_CRASH).length).toEqual(1);
    await expect(NativeInstabug.sendHandledJSCrash).toBeCalledTimes(1);
    await expect(NativeInstabug.sendHandledJSCrash).toBeCalledWith(jsonObject);
  });

  it('should not invoke callback on emitting the event IBGSendHandledJSCrash when Platform is iOS', () => {
    Platform.OS = 'ios';
    Instabug.onReportSubmitHandler(jest.fn());
    IBGEventEmitter.emit(IBGConstants.SEND_HANDLED_CRASH, {});
    expect(IBGEventEmitter.getListeners(IBGConstants.SEND_HANDLED_CRASH).length).toEqual(0);
  });

  it('should invoke callback on emitting the event IBGSendUnhandledJSCrash', async done => {
    Platform.OS = 'android';
    const report = {
      tags: ['tag1', 'tag2'],
      consoleLogs: ['consoleLog'],
      instabugLogs: ['instabugLog'],
      userAttributes: [{ age: '24' }],
      fileAttachments: ['path'],
    };
    NativeModules.Instabug.getReport.mockResolvedValue(report);
    const jsonObject = { stack: 'error' };
    const callback = rep => {
      expect(rep).toBeInstanceOf(Report);
      expect(rep.tags).toBe(report.tags);
      expect(rep.consoleLogs).toBe(report.consoleLogs);
      expect(rep.instabugLogs).toBe(report.instabugLogs);
      expect(rep.userAttributes).toBe(report.userAttributes);
      expect(rep.fileAttachments).toBe(report.fileAttachments);
      done();
    };
    Instabug.onReportSubmitHandler(callback);
    IBGEventEmitter.emit(IBGConstants.SEND_UNHANDLED_CRASH, jsonObject);

    expect(IBGEventEmitter.getListeners(IBGConstants.SEND_UNHANDLED_CRASH).length).toEqual(1);
    await expect(NativeInstabug.sendJSCrash).toBeCalledTimes(1);
    await expect(NativeInstabug.sendJSCrash).toBeCalledWith(jsonObject);
  });

  it('should not invoke callback on emitting the event IBGSendUnhandledJSCrash when Platform is iOS', () => {
    Platform.OS = 'ios';
    Instabug.onReportSubmitHandler(jest.fn());
    IBGEventEmitter.emit(IBGConstants.SEND_UNHANDLED_CRASH, {});
    expect(IBGEventEmitter.getListeners(IBGConstants.SEND_UNHANDLED_CRASH).length).toEqual(0);
  });

  it('should invoke the native method callPrivateApi', () => {
    const apiName = 'name';
    const param = 'param';
    Instabug.callPrivateApi(apiName, param);

    expect(NativeInstabug.callPrivateApi).toBeCalledTimes(1);
    expect(NativeInstabug.callPrivateApi).toBeCalledWith(apiName, param);
  });

  it('should call native addExperiments method', () => {
    const experiments = ['exp1', 'exp2'];
    Instabug.addExperiments(experiments);
    expect(NativeInstabug.addExperiments).toBeCalledTimes(1);
    expect(NativeInstabug.addExperiments).toBeCalledWith(experiments);
  });

  it('should call native removeExperiments method', () => {
    const experiments = ['exp1', 'exp2'];
    Instabug.removeExperiments(experiments);
    expect(NativeInstabug.removeExperiments).toBeCalledTimes(1);
    expect(NativeInstabug.removeExperiments).toBeCalledWith(experiments);
  });

  it('should call native clearAllExperiments method', () => {
    Instabug.clearAllExperiments();
    expect(NativeInstabug.clearAllExperiments).toBeCalledTimes(1);
  });
});
