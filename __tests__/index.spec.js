/**
 * @format
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import 'react-native';
import React from 'react';
import { NativeModules, Platform, processColor, findNodeHandle, Text } from 'react-native';
import '../jest/mockInstabug';
import '../jest/mockInstabugUtils';
import '../jest/mockXhrNetworkInterceotor';
import Instabug from '../';
import Report from '../models/Report';
import sinon from 'sinon';

import IBGConstants from '../utils/InstabugConstants';
import IBGEventEmitter from '../utils/IBGEventEmitter';
import { green } from 'ansi-colors';
import InstabugUtils from '../utils/InstabugUtils';

describe('Instabug Module', () => {

  const startWithToken = sinon.spy(NativeModules.Instabug, 'startWithToken');
  const setUserData = sinon.spy(NativeModules.Instabug, 'setUserData');
  const setTrackUserSteps = sinon.spy(NativeModules.Instabug, 'setTrackUserSteps');
  const setIBGLogPrintsToConsole = sinon.spy(NativeModules.Instabug, 'setIBGLogPrintsToConsole');
  const setSessionProfilerEnabled = sinon.spy(NativeModules.Instabug, 'setSessionProfilerEnabled');
  const setPushNotificationsEnabled = sinon.spy(NativeModules.IBGReplies, 'setPushNotificationsEnabled');
  const setFloatingButtonEdge = sinon.spy(NativeModules.IBGBugReporting, 'setFloatingButtonEdge');
  const setLocale = sinon.spy(NativeModules.Instabug, 'setLocale');
  const setColorTheme = sinon.spy(NativeModules.Instabug, 'setColorTheme');
  const setPrimaryColor = sinon.spy(NativeModules.Instabug, 'setPrimaryColor');
  const appendTags = sinon.spy(NativeModules.Instabug, 'appendTags');
  const resetTags = sinon.spy(NativeModules.Instabug, 'resetTags');
  const getTags = sinon.spy(NativeModules.Instabug, 'getTags');
  const setString = sinon.spy(NativeModules.Instabug, 'setString');
  const setEnabledAttachmentTypes = sinon.spy(NativeModules.IBGBugReporting, 'setEnabledAttachmentTypes');
  const identifyUserWithEmail = sinon.spy(NativeModules.Instabug, 'identifyUserWithEmail');
  const logOut = sinon.spy(NativeModules.Instabug, 'logOut');
  const logUserEventWithName = sinon.spy(NativeModules.Instabug, 'logUserEventWithName');
  const log = sinon.spy(NativeModules.Instabug, 'log');
  const logVerbose = sinon.spy(NativeModules.Instabug, 'logVerbose');
  const logInfo = sinon.spy(NativeModules.Instabug, 'logInfo');
  const logWarn = sinon.spy(NativeModules.Instabug, 'logWarn');
  const logError = sinon.spy(NativeModules.Instabug, 'logError');
  const logDebug = sinon.spy(NativeModules.Instabug, 'logDebug');
  const clearLogs = sinon.spy(NativeModules.Instabug, 'clearLogs');
  const setReproStepsMode = sinon.spy(NativeModules.Instabug, 'setReproStepsMode');
  const setSdkDebugLogsLevel = sinon.spy(NativeModules.Instabug, 'setSdkDebugLogsLevel');
  const setUserAttribute = sinon.spy(NativeModules.Instabug, 'setUserAttribute');
  const getUserAttribute = sinon.spy(NativeModules.Instabug, 'getUserAttribute');
  const removeUserAttribute = sinon.spy(NativeModules.Instabug, 'removeUserAttribute');
  const getAllUserAttributes = sinon.spy(NativeModules.Instabug, 'getAllUserAttributes');
  const clearAllUserAttributes = sinon.spy(NativeModules.Instabug, 'clearAllUserAttributes');
  const setDebugEnabled = sinon.spy(NativeModules.Instabug, 'setDebugEnabled');
  const enable = sinon.spy(NativeModules.Instabug, 'enable');
  const disable = sinon.spy(NativeModules.Instabug, 'disable');
  const isRunningLive = sinon.spy(NativeModules.Instabug, 'isRunningLive');
  const showWelcomeMessageWithMode = sinon.spy(NativeModules.Instabug, 'showWelcomeMessageWithMode');
  const setWelcomeMessageMode = sinon.spy(NativeModules.Instabug, 'setWelcomeMessageMode');
  const setFileAttachment = sinon.spy(NativeModules.Instabug, 'setFileAttachment');
  const hideView = sinon.spy(NativeModules.Instabug, 'hideView');
  const show = sinon.spy(NativeModules.Instabug, 'show');
  const setPreSendingHandler = sinon.spy(NativeModules.Instabug, 'setPreSendingHandler');
  const callPrivateApi = sinon.spy(NativeModules.Instabug, 'callPrivateApi');
  const sendHandledJSCrash = sinon.spy(NativeModules.Instabug, 'sendHandledJSCrash');
  const sendJSCrash = sinon.spy(NativeModules.Instabug, 'sendJSCrash');
  const reportScreenChange = sinon.spy(NativeModules.Instabug, 'reportScreenChange');

  beforeEach(() => {
    startWithToken.resetHistory();
    setTrackUserSteps.resetHistory();
    setIBGLogPrintsToConsole.resetHistory();
    setPushNotificationsEnabled.resetHistory();
    log.resetHistory();
    setSdkDebugLogsLevel.resetHistory();
    setDebugEnabled.resetHistory();
    enable.resetHistory();
    disable.resetHistory();
    isRunningLive.resetHistory();
    setFileAttachment.resetHistory();
    hideView.resetHistory();
    setPreSendingHandler.resetHistory();
    IBGEventEmitter.removeAllListeners();

  });

  it('componentDidAppearListener should call the native method reportScreenChange', () => {
    const screenName = "some-screen";
    var obj = {componentId: "1",
              componentName: screenName,
              "passProps": "screenName"};
    Instabug.componentDidAppearListener(obj);
    expect(reportScreenChange.calledOnceWithExactly(screenName)).toBe(true);
  });

  it('onNavigationStateChange should call the native method reportScreenChange', () => {
    const screenName = "some-screen";
    InstabugUtils.getActiveRouteName.mockImplementation((screenName) => screenName);
    Instabug.onNavigationStateChange(screenName, screenName, screenName);
    expect(reportScreenChange.calledOnceWithExactly(screenName)).toBe(true);
  });

  it('should call the native method startWithToken', () => {

    Platform.OS = 'ios';
    const token = 'some-token';
    const invocationEvents = [Instabug.invocationEvent.floatingButton, Instabug.invocationEvent.shake];
    Instabug.start(token, invocationEvents);

    expect(startWithToken.calledOnceWithExactly(token, invocationEvents)).toBe(true);

  });

  // it('should not call the native method startWithToken when platform is android', () => {

  //   Platform.OS = 'android';
  //   const token = 'some-token';
  //   const invocationEvents = [Instabug.invocationEvent.floatingButton, Instabug.invocationEvent.shake];
  //   Instabug.start(token, invocationEvents);

  //   expect(startWithToken.calledOnceWithExactly(token, invocationEvents)).toBe(true);

  // });

  it('should call the native method setUserData', () => {

    const userData = "userData";
    Instabug.setUserData(userData);

    expect(setUserData.calledOnceWithExactly(userData)).toBe(true);

  });

  it('should call the native method setTrackUserSteps', () => {

    Platform.OS = 'ios';
    Instabug.setTrackUserSteps(true);

    expect(setTrackUserSteps.calledOnceWithExactly(true)).toBe(true);

  });

  it('should not call the native method setTrackUserSteps when platform is android', () => {

    Platform.OS = 'android';
    Instabug.setTrackUserSteps(true);

    expect(setTrackUserSteps.notCalled).toBe(true);

  });

  it('should call the native method setIBGLogPrintsToConsole', () => {

    Platform.OS = 'ios';
    Instabug.setIBGLogPrintsToConsole(true);

    expect(setIBGLogPrintsToConsole.calledOnceWithExactly(true)).toBe(true);

  });

  it('should not call the native method setIBGLogPrintsToConsole when platform is android', () => {

    Platform.OS = 'android';
    Instabug.setIBGLogPrintsToConsole(true);

    expect(setIBGLogPrintsToConsole.notCalled).toBe(true);

  });

  it('should call the native method setSessionProfilerEnabled', () => {

    Instabug.setSessionProfilerEnabled(true);

    expect(setSessionProfilerEnabled.calledOnceWithExactly(true)).toBe(true);

  });

  it('should call the native method setPushNotificationsEnabled', () => {

    Platform.OS = 'ios';
    Instabug.setPushNotificationsEnabled(true);

    expect(setPushNotificationsEnabled.calledOnceWithExactly(true)).toBe(true);

  });

  it('should call the native method setFloatingButtonEdge', () => {

    const offsetFromTop = 10;
    const edge = Instabug.floatingButtonEdge.left;
    Instabug.setFloatingButtonEdge(edge, offsetFromTop);

    expect(setFloatingButtonEdge.calledOnceWithExactly(edge, offsetFromTop)).toBe(true);

  });

  it('should call the native method setLocale', () => {

    const locale = Instabug.locale.english;
    Instabug.setLocale(locale);

    expect(setLocale.calledOnceWithExactly(locale)).toBe(true);

  });

  it('should call the native method setColorTheme', () => {

    const theme = Instabug.colorTheme.dark;
    Instabug.setColorTheme(theme)

    expect(setColorTheme.calledOnceWithExactly(theme)).toBe(true);

  });

  it('should call the native method setPrimaryColor', () => {

    const color = green;
    Instabug.setPrimaryColor(color)

    expect(setPrimaryColor.calledOnceWithExactly(processColor(color))).toBe(true);

  });

  it('should call the native method appendTags', () => {

    const tags = ['tag1', 'tag2'];
    Instabug.appendTags(tags);

    expect(appendTags.calledOnceWithExactly(tags)).toBe(true);

  });

  it('should call the native method resetTags', () => {

    Instabug.resetTags();

    expect(resetTags.calledOnce).toBe(true);

  });

  it('should call native method getTags', (done) => {

    const callback = (tags) => {
      expect(tags).toBeDefined();
      done();
    }
    Instabug.getTags(callback);
    expect(getTags.calledOnceWithExactly(callback)).toBe(true);

  });

  it('should call the native method setString', () => {

    const string = 'report an issue';
    const key = Instabug.strings.reportBug;
    Instabug.setString(key, string);

    expect(setString.calledOnceWithExactly(string, key)).toBe(true);

  });

  it('should call the native method setEnabledAttachmentTypes', () => {

    Instabug.setEnabledAttachmentTypes(true, true, false, true);

    expect(setEnabledAttachmentTypes.calledOnceWithExactly(true, true, false, true)).toBe(true);

  });

  it('should call the native method identifyUserWithEmail', () => {


    const email = 'foo@instabug.com';
    const name = 'Instabug';
    Instabug.identifyUser(email, name);

    expect(identifyUserWithEmail.calledOnceWithExactly(email, name)).toBe(true);

  });

  it('should call the native method logOut', () => {

    Instabug.logOut();

    expect(logOut.calledOnce).toBe(true);

  });

  it('should call the native method logUserEventWithName', () => {

    const event = 'click';
    Instabug.logUserEvent(event);

    expect(logUserEventWithName.calledOnceWithExactly(event)).toBe(true);

  });

  it('should call the native method logVerbose', () => {

    const message = 'log';
    Instabug.logVerbose(message);

    expect(logVerbose.calledOnceWithExactly(message)).toBe(true);

  });

  it('should call the native method logDebug', () => {

    const message = 'log';
    Instabug.logDebug(message);

    expect(logDebug.calledOnceWithExactly(message)).toBe(true);

  });

  it('should call the native method logInfo', () => {

    const message = 'log';
    Instabug.logInfo(message);

    expect(logInfo.calledOnceWithExactly(message)).toBe(true);

  });

  it('should call the native method logWarn', () => {

    const message = 'log';
    Instabug.logWarn(message);

    expect(logWarn.calledOnceWithExactly(message)).toBe(true);

  });

  it('should call the native method logError', () => {

    const message = 'log';
    Instabug.logError(message);

    expect(logError.calledOnceWithExactly(message)).toBe(true);

  });

  it('should call the native method clearLogs', () => {

    Instabug.clearLogs();

    expect(clearLogs.calledOnce).toBe(true);

  });

  it('should call the native method setReproStepsMode', () => {

    const mode = Instabug.reproStepsMode.enabled;
    Instabug.setReproStepsMode(mode);

    expect(setReproStepsMode.calledOnceWithExactly(mode)).toBe(true);

  });

  it('should call the native method setSdkDebugLogsLevel on iOS', () => {
    const debugLevel = Instabug.sdkDebugLogsLevel.sdkDebugLogsLevelVerbose;
    
    Platform.OS = 'ios';
    Instabug.setSdkDebugLogsLevel(debugLevel);

    expect(setSdkDebugLogsLevel.calledOnceWithExactly(debugLevel)).toBe(true);
  });

  it('should not call the native method setSdkDebugLogsLevel on Android', () => {
    const debugLevel = Instabug.sdkDebugLogsLevel.sdkDebugLogsLevelVerbose;
    
    Platform.OS = 'android';
    Instabug.setSdkDebugLogsLevel(debugLevel);

    expect(setSdkDebugLogsLevel.notCalled).toBe(true);
  });

  it('should call the native method setUserAttribute', () => {

    const key = 'age';
    const value = '24';
    Instabug.setUserAttribute(key, value);

    expect(setUserAttribute.calledOnceWithExactly(key, value)).toBe(true);

  });

  it('should call native method getUserAttribute', (done) => {

    const callback = (value) => {
      expect(value).toBeDefined();
      done();
    }
    const key = 'age';
    Instabug.getUserAttribute(key, callback);
    expect(getUserAttribute.calledOnceWithExactly(key, callback)).toBe(true);

  });

  it('should call the native method removeUserAttribute', () => {

    const key = 'age';
    Instabug.removeUserAttribute(key);

    expect(removeUserAttribute.calledOnceWithExactly(key)).toBe(true);

  });

  it('should call native method getAllUserAttributes', (done) => {

    const callback = (value) => {
      expect(value).toBeDefined();
      done();
    }
    Instabug.getAllUserAttributes(callback);
    expect(getAllUserAttributes.calledOnceWithExactly(callback)).toBe(true);

  });

  it('should call the native method clearAllUserAttributes', () => {

    Instabug.clearAllUserAttributes();

    expect(clearAllUserAttributes.calledOnce).toBe(true);

  });

  it('should call the native method setDebugEnabled', () => {

    Platform.OS = 'android';
    Instabug.setDebugEnabled(true);

    expect(setDebugEnabled.calledOnceWithExactly(true)).toBe(true);

  });

  it('should not call the native method setDebugEnabled when platform is ios', () => {

    Platform.OS = 'ios';
    Instabug.setDebugEnabled(true);

    expect(setDebugEnabled.notCalled).toBe(true);

  });

  it('should call the native method enable', () => {

    Platform.OS = 'android';
    Instabug.enable();

    expect(enable.calledOnce).toBe(true);

  });

  it('should not call the native method enable when platform is ios', () => {

    Platform.OS = 'ios';
    Instabug.enable();

    expect(enable.notCalled).toBe(true);

  });

  it('should call the native method disable', () => {

    Platform.OS = 'android';
    Instabug.disable();

    expect(disable.calledOnce).toBe(true);

  });

  it('should not call the native method disable when platform is ios', () => {

    Platform.OS = 'ios';
    Instabug.disable();

    expect(disable.notCalled).toBe(true);

  });

  it('should call the native method isRunningLive', (done) => {

    Platform.OS = 'ios';
    const callback = (isRunningLive) => {
      expect(isRunningLive).toBeDefined();
      done();
    }
    Instabug.isRunningLive(callback);

    expect(isRunningLive.calledOnceWithExactly(callback)).toBe(true);

  });

  it('should not call the native method isRunningLive when platform is android', () => {

    Platform.OS = 'android';
    Instabug.isRunningLive(jest.fn());

    expect(isRunningLive.notCalled).toBe(true);

  });

  it('should call the native method showWelcomeMessageWithMode', () => {

    const mode = Instabug.welcomeMessageMode.beta;
    Instabug.showWelcomeMessage(mode);

    expect(showWelcomeMessageWithMode.calledOnceWithExactly(mode)).toBe(true);

  });

  it('should call the native method setWelcomeMessageMode', () => {

    const mode = Instabug.welcomeMessageMode.beta;
    Instabug.setWelcomeMessageMode(mode);

    expect(setWelcomeMessageMode.calledOnceWithExactly(mode)).toBe(true);

  });

  it('should call the native method setFileAttachment with filePath when platform is ios', () => {

    Platform.OS = 'ios';
    const path = '~/path';
    Instabug.addFileAttachment(path);

    expect(setFileAttachment.calledOnceWithExactly(path)).toBe(true);

  });

  it('should call the native method setFileAttachment with filePath and fileName when platform is android', () => {

    Platform.OS = 'android';
    const path = '~/path';
    const name = 'file';
    Instabug.addFileAttachment(path, name);

    expect(setFileAttachment.calledOnceWithExactly(path, name)).toBe(true);

  });

  it('should call the native method hideView nativeTag when platform is ios', () => {

    Platform.OS = 'ios';
    <Text ref={(c) => this.textView = c} />
    Instabug.setPrivateView(this.textView);

    expect(hideView.calledOnceWithExactly(findNodeHandle(this.textView))).toBe(true);

  });

  it('should call the native method hideView with [nativeTag] when platform is android', () => {

    Platform.OS = 'android';
    <Text ref={(c) => this.textView = c} />
    Instabug.setPrivateView(this.textView);

    expect(hideView.calledOnceWithExactly([findNodeHandle(this.textView)])).toBe(true);

  });

  it('should call the native method show', () => {

    Instabug.show();

    expect(show.calledOnce).toBe(true);

  });

  it('should set _isOnReportHandlerSet to true on calling onReportSubmitHandler', () => {

    Instabug.onReportSubmitHandler(jest.fn());
    InstabugUtils.isOnReportHandlerSet.mockImplementation(() => true);
    const isReportHandlerSet = InstabugUtils.isOnReportHandlerSet();

    expect(isReportHandlerSet).toBe(true);

  });

  it('should call the native method setPreSendingHandler with a function', () => {

    const callback = jest.fn()
    Instabug.onReportSubmitHandler(callback);

    expect(setPreSendingHandler.calledOnceWithExactly(callback)).toBe(true);
  });


  it('should invoke callback on emitting the event IBGpreSendingHandler', (done) => {

    const report = {
      tags: ['tag1', 'tag2'],
      consoleLogs: ['consoleLog'],
      instabugLogs: ['instabugLog'],
      userAttributes: [{ age: '24' }],
      fileAttachments: ['path']
    };
    const callback = (rep) => {
      expect(rep).toBeInstanceOf(Report);
      expect(rep.tags).toBe(report.tags);
      expect(rep.consoleLogs).toBe(report.consoleLogs);
      expect(rep.instabugLogs).toBe(report.instabugLogs);
      expect(rep.userAttributes).toBe(report.userAttributes);
      expect(rep.fileAttachments).toBe(report.fileAttachments);
      done();
    }
    Instabug.onReportSubmitHandler(callback);
    IBGEventEmitter.emit(IBGConstants.PRESENDING_HANDLER, report);

    expect(IBGEventEmitter.getListeners(IBGConstants.PRESENDING_HANDLER).length).toEqual(1);

  });

  it('should invoke callback on emitting the event IBGSendHandledJSCrash', async (done) => {

    Platform.OS = 'android';
    const report = {
      tags: ['tag1', 'tag2'],
      consoleLogs: ['consoleLog'],
      instabugLogs: ['instabugLog'],
      userAttributes: [{ age: '24' }],
      fileAttachments: ['path']
    };
    NativeModules.Instabug.getReport.mockResolvedValue(report);
    const jsonObject = { stack: 'error' };
    const callback = (rep) => {
      expect(rep).toBeInstanceOf(Report);
      expect(rep.tags).toBe(report.tags);
      expect(rep.consoleLogs).toBe(report.consoleLogs);
      expect(rep.instabugLogs).toBe(report.instabugLogs);
      expect(rep.userAttributes).toBe(report.userAttributes);
      expect(rep.fileAttachments).toBe(report.fileAttachments);
      done();
    }
    Instabug.onReportSubmitHandler(callback);
    IBGEventEmitter.emit(IBGConstants.SEND_HANDLED_CRASH, jsonObject);

    expect(IBGEventEmitter.getListeners(IBGConstants.SEND_HANDLED_CRASH).length).toEqual(1);
    await expect(sendHandledJSCrash.calledOnceWithExactly(jsonObject)).toBe(true);

  });

  it('should not invoke callback on emitting the event IBGSendHandledJSCrash when Platform is iOS', () => {

    Platform.OS = 'ios';
    Instabug.onReportSubmitHandler(jest.fn());
    IBGEventEmitter.emit(IBGConstants.SEND_HANDLED_CRASH, {});
    expect(IBGEventEmitter.getListeners(IBGConstants.SEND_HANDLED_CRASH).length).toEqual(0);

  });

  it('should invoke callback on emitting the event IBGSendUnhandledJSCrash', async (done) => {

    Platform.OS = 'android';
    const report = {
      tags: ['tag1', 'tag2'],
      consoleLogs: ['consoleLog'],
      instabugLogs: ['instabugLog'],
      userAttributes: [{ age: '24' }],
      fileAttachments: ['path']
    };
    NativeModules.Instabug.getReport.mockResolvedValue(report);
    const jsonObject = { stack: 'error' };
    const callback = (rep) => {
      expect(rep).toBeInstanceOf(Report);
      expect(rep.tags).toBe(report.tags);
      expect(rep.consoleLogs).toBe(report.consoleLogs);
      expect(rep.instabugLogs).toBe(report.instabugLogs);
      expect(rep.userAttributes).toBe(report.userAttributes);
      expect(rep.fileAttachments).toBe(report.fileAttachments);
      done();
    }
    Instabug.onReportSubmitHandler(callback);
    IBGEventEmitter.emit(IBGConstants.SEND_UNHANDLED_CRASH, jsonObject);

    expect(IBGEventEmitter.getListeners(IBGConstants.SEND_UNHANDLED_CRASH).length).toEqual(1);
    await expect(sendJSCrash.calledOnceWithExactly(jsonObject)).toBe(true);

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

    expect(callPrivateApi.calledOnceWithExactly(apiName, param)).toBe(true);

  });

});
