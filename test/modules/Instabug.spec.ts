import '../mocks/mockInstabugUtils';
import '../mocks/mockNetworkLogger';

import { Platform, findNodeHandle, processColor } from 'react-native';

import { mocked } from 'jest-mock';
import waitForExpect from 'wait-for-expect';

import Report from '../../src/models/Report';
import * as Instabug from '../../src/modules/Instabug';
import * as NetworkLogger from '../../src/modules/NetworkLogger';
import { NativeEvents, NativeInstabug, emitter } from '../../src/native/NativeInstabug';
import {
  ColorTheme,
  InvocationEvent,
  Locale,
  LogLevel,
  NetworkInterceptionMode,
  ReproStepsMode,
  StringKey,
  WelcomeMessageMode,
} from '../../src/utils/Enums';
import InstabugUtils from '../../src/utils/InstabugUtils';

describe('Instabug Module', () => {
  beforeEach(() => {
    const events = Object.values(NativeEvents);
    events.forEach((event) => {
      emitter.removeAllListeners(event);
    });
  });

  it('should call the native method setEnabled', () => {
    Instabug.setEnabled(true);

    expect(NativeInstabug.setEnabled).toBeCalledTimes(1);
    expect(NativeInstabug.setEnabled).toBeCalledWith(true);
  });

  it('reportScreenChange should call the native method reportScreenChange', () => {
    const screenName = 'some-screen';
    Instabug.reportScreenChange(screenName);
    expect(NativeInstabug.reportScreenChange).toBeCalledTimes(1);
    expect(NativeInstabug.reportScreenChange).toBeCalledWith(screenName);
  });

  it('componentDidAppearListener should call the native method reportScreenChange', () => {
    const screenName = 'some-screen';

    Instabug.componentDidAppearListener({
      componentId: '1',
      componentName: screenName,
      componentType: 'Component',
    });

    expect(NativeInstabug.reportScreenChange).toBeCalledTimes(1);
    expect(NativeInstabug.reportScreenChange).toBeCalledWith(screenName);
  });

  it("componentDidAppearListener shouldn't call the native method reportScreenChange if first screen", async () => {
    Instabug.init({
      token: 'some-token',
      invocationEvents: [InvocationEvent.none],
    });

    Instabug.componentDidAppearListener({
      componentId: '1',
      componentName: 'screen',
      componentType: 'Component',
    });

    await waitForExpect(() => {
      // Only first screen should be reported
      expect(NativeInstabug.reportScreenChange).toBeCalledTimes(1);
      expect(NativeInstabug.reportScreenChange).toBeCalledWith('Initial Screen');
    });
  });

  it("componentDidAppearListener shouldn't call the native method reportScreenChange twice if same screen", (done) => {
    Array(5).forEach(() => {
      Instabug.componentDidAppearListener({
        componentId: '1',
        componentName: 'screen',
        componentType: 'Component',
      });
    });

    setTimeout(() => {
      // It won't report any screen change, here's why:
      // 1. First call:
      //    It's the first screen so:
      //      1. It doesn't report a screen change
      //      2. It sets _isFirstScreen to false
      //      3. It sets _lastScreen to "screen"
      // 2. Second+ calls:
      //    The screen name is the same as _lastScreen (stored in 1st call)
      //    so it doesn't report a screen change
      expect(NativeInstabug.reportScreenChange).not.toBeCalled();
      done();
    }, 1500);
  });

  it('onNavigationStateChange should call the native method reportScreenChange', async () => {
    InstabugUtils.getActiveRouteName = jest.fn().mockImplementation((screenName) => screenName);

    // @ts-ignore
    Instabug.onNavigationStateChange('home', 'settings');

    await waitForExpect(() => {
      expect(NativeInstabug.reportScreenChange).toBeCalledTimes(1);
      expect(NativeInstabug.reportScreenChange).toBeCalledWith('settings');
    });
  });

  // eslint-disable-next-line jest/no-disabled-tests
  it.skip('onNavigationStateChange should call the native method reportCurrentViewChange on Android Platform', async () => {
    Platform.OS = 'android';
    InstabugUtils.getActiveRouteName = jest.fn().mockImplementation((screenName) => screenName);

    // @ts-ignore
    Instabug.onNavigationStateChange('home', 'settings');

    await waitForExpect(() => {
      expect(NativeInstabug.reportCurrentViewChange).toBeCalledTimes(1);
      expect(NativeInstabug.reportCurrentViewChange).toBeCalledWith('settings');
    });
  });

  // eslint-disable-next-line jest/no-disabled-tests
  it.skip('onNavigationStateChange should not call the native method reportCurrentViewChange on iOS Platform', async () => {
    Platform.OS = 'ios';
    InstabugUtils.getActiveRouteName = jest.fn().mockImplementation((screenName) => screenName);

    // @ts-ignore
    Instabug.onNavigationStateChange('home', 'settings');

    await waitForExpect(() => {
      expect(NativeInstabug.reportCurrentViewChange).not.toBeCalled();
    });
  });

  it('onNavigationStateChange should not call the native method reportScreenChange if screen is the same', (done) => {
    InstabugUtils.getActiveRouteName = jest.fn().mockImplementation((screenName) => screenName);

    // @ts-ignore
    Instabug.onNavigationStateChange('home', 'home');

    // Wait for 1.5s as reportScreenChange is delayed by 1s
    setTimeout(() => {
      expect(NativeInstabug.reportScreenChange).not.toBeCalled();
      done();
    }, 1500);
  });

  it('onNavigationStateChange should not call the native method reportCurrentViewChange if screen is the same', (done) => {
    InstabugUtils.getActiveRouteName = jest.fn().mockImplementation((screenName) => screenName);

    // @ts-ignore
    Instabug.onNavigationStateChange('home', 'home');

    // Wait for 1.5s as reportScreenChange is delayed by 1s
    setTimeout(() => {
      expect(NativeInstabug.reportCurrentViewChange).not.toBeCalled();
      done();
    }, 1500);
  });

  it('onNavigationStateChange should call the native method reportScreenChange immediately if _currentScreen is set', async () => {
    InstabugUtils.getActiveRouteName = jest.fn().mockImplementation((screenName) => screenName);

    // sets _currentScreen and waits for 1s as _currentScreen is null
    // @ts-ignore
    Instabug.onNavigationStateChange('home', 'settings');

    // _currentScreen already set in prev call so it reports a screen change immediately
    // @ts-ignore
    Instabug.onNavigationStateChange('home', 'settings');

    expect(NativeInstabug.reportScreenChange).toBeCalledTimes(1);
    expect(NativeInstabug.reportScreenChange).toBeCalledWith('settings');

    await waitForExpect(() => expect(NativeInstabug.reportScreenChange).toBeCalledTimes(2));
  });

  it('onStateChange should call the native method reportScreenChange', async () => {
    const state = { routes: [{ name: 'ScreenName' }], index: 0 };
    // @ts-ignore
    Instabug.onStateChange(state);

    await waitForExpect(() => {
      expect(NativeInstabug.reportScreenChange).toBeCalledTimes(1);
      expect(NativeInstabug.reportScreenChange).toBeCalledWith('ScreenName');
    });
  });

  // eslint-disable-next-line jest/no-disabled-tests
  it.skip('onStateChange should call the native method reportCurrentViewChange on Android Platform', async () => {
    Platform.OS = 'android';
    const state = { routes: [{ name: 'ScreenName' }], index: 0 };
    // @ts-ignore
    Instabug.onStateChange(state);

    await waitForExpect(() => {
      expect(NativeInstabug.reportCurrentViewChange).toBeCalledTimes(1);
      expect(NativeInstabug.reportCurrentViewChange).toBeCalledWith('ScreenName');
    });
  });

  // eslint-disable-next-line jest/no-disabled-tests
  it.skip('onStateChange should not call the native method reportCurrentViewChange on iOS Platform', async () => {
    Platform.OS = 'ios';
    const state = { routes: [{ name: 'ScreenName' }], index: 0 };
    // @ts-ignore
    Instabug.onStateChange(state);

    await waitForExpect(() => {
      expect(NativeInstabug.reportCurrentViewChange).not.toBeCalled();
    });
  });

  it('onStateChange should call the native method reportScreenChange immediately if _currentScreen is set', async () => {
    // sets _currentScreen and waits for 1s as _currentScreen is null
    const state = { routes: [{ name: 'ScreenName' }], index: 0 };

    // @ts-ignore
    Instabug.onStateChange(state);

    // _currentScreen already set in prev call so it reports a screen change immediately
    // @ts-ignore
    Instabug.onStateChange(state);

    expect(NativeInstabug.reportScreenChange).toBeCalledTimes(1);
    expect(NativeInstabug.reportScreenChange).toBeCalledWith('ScreenName');

    await waitForExpect(() => expect(NativeInstabug.reportScreenChange).toBeCalledTimes(2));
  });

  it('should call the native method init', () => {
    const instabugConfig = {
      token: 'some-token',
      invocationEvents: [InvocationEvent.floatingButton, InvocationEvent.shake],
      debugLogsLevel: LogLevel.debug,
      codePushVersion: '1.1.0',
    };
    const usesNativeNetworkInterception = false;

    Instabug.init(instabugConfig);

    expect(NetworkLogger.setEnabled).toBeCalledWith(true);
    expect(NativeInstabug.init).toBeCalledTimes(1);
    expect(NativeInstabug.init).toBeCalledWith(
      instabugConfig.token,
      instabugConfig.invocationEvents,
      instabugConfig.debugLogsLevel,
      usesNativeNetworkInterception,
      instabugConfig.codePushVersion,
    );
  });

  it('init should disable JavaScript interceptor when using native interception mode', () => {
    const instabugConfig = {
      token: 'some-token',
      invocationEvents: [InvocationEvent.floatingButton, InvocationEvent.shake],
      debugLogsLevel: LogLevel.debug,
      networkInterceptionMode: NetworkInterceptionMode.native,
      codePushVersion: '1.1.0',
    };

    Instabug.init(instabugConfig);

    expect(NetworkLogger.setEnabled).not.toBeCalled();
    expect(NativeInstabug.init).toBeCalledTimes(1);
    expect(NativeInstabug.init).toBeCalledWith(
      instabugConfig.token,
      instabugConfig.invocationEvents,
      instabugConfig.debugLogsLevel,
      // usesNativeNetworkInterception should be true when using native interception mode
      true,
      instabugConfig.codePushVersion,
    );
  });

  it('should report the first screen on SDK initialization', async () => {
    Instabug.init({
      token: 'some-token',
      invocationEvents: [InvocationEvent.none],
    });

    await waitForExpect(() => {
      expect(NativeInstabug.reportScreenChange).toBeCalledTimes(1);
      expect(NativeInstabug.reportScreenChange).toBeCalledWith('Initial Screen');
    });
  });

  it('init should call reportCurrentViewChange on Android Platform', async () => {
    Platform.OS = 'android';
    Instabug.init({
      token: 'some-token',
      invocationEvents: [InvocationEvent.none],
    });

    await waitForExpect(() => {
      expect(NativeInstabug.reportCurrentViewChange).toBeCalledTimes(1);
      expect(NativeInstabug.reportCurrentViewChange).toBeCalledWith('Initial Screen');
    });
  });

  it('init should not call reportCurrentViewChange on ios Platform', async () => {
    Platform.OS = 'ios';
    Instabug.init({
      token: 'some-token',
      invocationEvents: [InvocationEvent.none],
    });

    await waitForExpect(() => {
      expect(NativeInstabug.reportCurrentViewChange).not.toBeCalled();
    });
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
    const locale = Locale.english;
    Instabug.setLocale(locale);

    expect(NativeInstabug.setLocale).toBeCalledTimes(1);
    expect(NativeInstabug.setLocale).toBeCalledWith(locale);
  });

  it('should call the native method setColorTheme', () => {
    const theme = ColorTheme.dark;
    Instabug.setColorTheme(theme);

    expect(NativeInstabug.setColorTheme).toBeCalledTimes(1);
    expect(NativeInstabug.setColorTheme).toBeCalledWith(theme);
  });

  it('should call the native method setPrimaryColor', () => {
    const color = '#fff';
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

  it('should call native method getTags', async () => {
    const expected = ['tag1', 'tag2'];

    mocked(NativeInstabug).getTags.mockResolvedValueOnce(expected);

    const actual = await Instabug.getTags();

    expect(actual).toBe(expected);
    expect(NativeInstabug.getTags).toBeCalledTimes(1);
  });

  it('should call the native method setString', () => {
    const string = 'report an issue';
    const key = StringKey.reportBug;
    Instabug.setString(key, string);

    expect(NativeInstabug.setString).toBeCalledTimes(1);
    expect(NativeInstabug.setString).toBeCalledWith(string, key);
  });

  it('should suffix the repro steps list item numbering title string on Android', () => {
    Platform.OS = 'android';

    const key = StringKey.reproStepsListItemNumberingTitle;
    const string = 'Page';
    const expected = 'Page #';

    Instabug.setString(key, string);

    expect(NativeInstabug.setString).toBeCalledTimes(1);
    expect(NativeInstabug.setString).toBeCalledWith(expected, key);
  });

  it('should call the native method identifyUser', () => {
    const email = 'foo@instabug.com';
    const name = 'Instabug';
    Instabug.identifyUser(email, name);

    expect(NativeInstabug.identifyUser).toBeCalledTimes(1);
    expect(NativeInstabug.identifyUser).toBeCalledWith(email, name, undefined);
  });

  it('identifyUser when id is defined should call the native method identifyUser', () => {
    const email = 'foo@instabug.com';
    const name = 'Instabug';
    const id = 'instabug-id';
    Instabug.identifyUser(email, name, id);

    expect(NativeInstabug.identifyUser).toBeCalledTimes(1);
    expect(NativeInstabug.identifyUser).toBeCalledWith(email, name, id);
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

  it('should not call the native method logVerbose when no message', () => {
    // @ts-ignore
    Instabug.logVerbose(null);

    expect(NativeInstabug.logVerbose).not.toBeCalled();
  });

  it('should call the native method logDebug', () => {
    const message = 'log';
    Instabug.logDebug(message);

    expect(NativeInstabug.logDebug).toBeCalledTimes(1);
  });

  it('should not call the native method logDebug when no message', () => {
    // @ts-ignore
    Instabug.logDebug(null);

    expect(NativeInstabug.logDebug).not.toBeCalled();
  });

  it('should call the native method logInfo', () => {
    const message = 'log';
    Instabug.logInfo(message);

    expect(NativeInstabug.logInfo).toBeCalledTimes(1);
  });

  it('should not call the native method logInfo when no message', () => {
    // @ts-ignore
    Instabug.logInfo(null);

    expect(NativeInstabug.logInfo).not.toBeCalled();
  });

  it('should call the native method logWarn', () => {
    const message = 'log';
    Instabug.logWarn(message);

    expect(NativeInstabug.logWarn).toBeCalledTimes(1);
  });

  it('should not call the native method logWarn when no message', () => {
    // @ts-ignore
    Instabug.logWarn(null);

    expect(NativeInstabug.logWarn).not.toBeCalled();
  });

  it('should call the native method logError', () => {
    const message = 'log';
    Instabug.logError(message);

    expect(NativeInstabug.logError).toBeCalledTimes(1);
  });

  it('should not call the native method logError when no message', () => {
    // @ts-ignore
    Instabug.logError(null);

    expect(NativeInstabug.logError).not.toBeCalled();
  });

  it('should call the native method clearLogs', () => {
    Instabug.clearLogs();

    expect(NativeInstabug.clearLogs).toBeCalledTimes(1);
  });

  it('setReproStepsConfig should call the native setReproStepsConfig', () => {
    Platform.OS = 'android';

    const bug = ReproStepsMode.disabled;
    const crash = ReproStepsMode.enabled;
    const sessionReplay = ReproStepsMode.enabledWithNoScreenshots;
    const config = { bug, crash, sessionReplay };

    Instabug.setReproStepsConfig(config);

    expect(NativeInstabug.setReproStepsConfig).toBeCalledTimes(1);
    expect(NativeInstabug.setReproStepsConfig).toBeCalledWith(bug, crash, sessionReplay);
  });

  it('setReproStepsConfig should prioritize `all` over `bug`, `crash`, and `sessionReplay`', () => {
    Platform.OS = 'android';

    const bug = ReproStepsMode.disabled;
    const crash = ReproStepsMode.enabled;
    const sessionReplay = ReproStepsMode.enabledWithNoScreenshots;
    const all = ReproStepsMode.enabledWithNoScreenshots;
    const config = { all, bug, crash, sessionReplay };

    Instabug.setReproStepsConfig(config);

    expect(NativeInstabug.setReproStepsConfig).toBeCalledTimes(1);
    expect(NativeInstabug.setReproStepsConfig).toBeCalledWith(all, all, all);
  });

  it('setReproStepsConfig should use defaults for `bug`, `crash`, and `sessionReplay`', () => {
    Platform.OS = 'android';

    const config = {};

    Instabug.setReproStepsConfig(config);

    expect(NativeInstabug.setReproStepsConfig).toBeCalledTimes(1);
    expect(NativeInstabug.setReproStepsConfig).toBeCalledWith(
      ReproStepsMode.enabled,
      ReproStepsMode.enabledWithNoScreenshots,
      ReproStepsMode.enabled,
    );
  });

  it.each([
    ['key', null],
    [null, 'value'],
    [null, null],
    [{}, 'value'],
    ['key', []],
  ])("should fail if key and value aren't strings when calling setUserAttribute", (key, value) => {
    // @ts-ignore
    expect(() => Instabug.setUserAttribute(key, value)).toThrow(TypeError);

    expect(NativeInstabug.setUserAttribute).not.toBeCalled();
  });

  it('should call the native method setUserAttribute', () => {
    const key = 'age';
    const value = '24';
    Instabug.setUserAttribute(key, value);

    expect(NativeInstabug.setUserAttribute).toBeCalledTimes(1);
    expect(NativeInstabug.setUserAttribute).toBeCalledWith(key, value);
  });

  it('should call native method getUserAttribute', async () => {
    const key = 'age';
    const expected = '21';

    mocked(NativeInstabug).getUserAttribute.mockResolvedValueOnce(expected);

    const actual = await Instabug.getUserAttribute(key);

    expect(actual).toBe(expected);
    expect(NativeInstabug.getUserAttribute).toBeCalledTimes(1);
    expect(NativeInstabug.getUserAttribute).toBeCalledWith(key);
  });

  it('should call the native method removeUserAttribute', () => {
    const key = 'age';
    Instabug.removeUserAttribute(key);

    expect(NativeInstabug.removeUserAttribute).toBeCalledTimes(1);
    expect(NativeInstabug.removeUserAttribute).toBeCalledWith(key);
  });

  it.each([null, 1, {}])(
    "should fail if key isn't a string when calling removeUserAttribute",
    (key) => {
      // @ts-ignore
      expect(() => Instabug.removeUserAttribute(key)).toThrow(TypeError);
      expect(NativeInstabug.removeUserAttribute).not.toBeCalled();
    },
  );

  it('should call native method getAllUserAttributes', async () => {
    const expected = { type: 'guest' };

    mocked(NativeInstabug).getAllUserAttributes.mockResolvedValueOnce(expected);

    const actual = await Instabug.getAllUserAttributes();

    expect(actual).toBe(expected);
    expect(NativeInstabug.getAllUserAttributes).toBeCalledTimes(1);
    expect(NativeInstabug.getAllUserAttributes).toBeCalledWith();
  });

  it('should call the native method clearAllUserAttributes', () => {
    Instabug.clearAllUserAttributes();

    expect(NativeInstabug.clearAllUserAttributes).toBeCalledTimes(1);
  });

  it('should call the native method showWelcomeMessageWithMode', () => {
    const mode = WelcomeMessageMode.beta;
    Instabug.showWelcomeMessage(mode);

    expect(NativeInstabug.showWelcomeMessageWithMode).toBeCalledTimes(1);
    expect(NativeInstabug.showWelcomeMessageWithMode).toBeCalledWith(mode);
  });

  it('should call the native method setWelcomeMessageMode', () => {
    const mode = WelcomeMessageMode.beta;
    Instabug.setWelcomeMessageMode(mode);

    expect(NativeInstabug.setWelcomeMessageMode).toBeCalledTimes(1);
    expect(NativeInstabug.setWelcomeMessageMode).toBeCalledWith(mode);
  });

  it('should call the native method setFileAttachment with filePath when platform is ios', () => {
    Platform.OS = 'ios';
    const path = '~/path';
    Instabug.addFileAttachment(path, '');

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
    Instabug.addPrivateView(0);

    expect(NativeInstabug.addPrivateView).toBeCalledTimes(1);
    expect(NativeInstabug.addPrivateView).toBeCalledWith(findNodeHandle(0));
  });

  it('should call the native method removePrivateView', () => {
    Instabug.removePrivateView(0);

    expect(NativeInstabug.removePrivateView).toBeCalledTimes(1);
    expect(NativeInstabug.removePrivateView).toBeCalledWith(findNodeHandle(0));
  });

  it('should call the native method show', () => {
    Instabug.show();

    expect(NativeInstabug.show).toBeCalledTimes(1);
  });

  it('should call the native method setPreSendingHandler with a function', () => {
    const callback = jest.fn();
    Instabug.onReportSubmitHandler(callback);

    expect(NativeInstabug.setPreSendingHandler).toBeCalledTimes(1);
    expect(NativeInstabug.setPreSendingHandler).toBeCalledWith(callback);
  });

  it('should invoke callback on emitting the event IBGpreSendingHandler', (done) => {
    const report = {
      tags: ['tag1', 'tag2'],
      consoleLogs: ['consoleLog'],
      instabugLogs: ['instabugLog'],
      userAttributes: [{ age: '24' }],
      fileAttachments: ['path'],
    };
    const callback = (rep: Report) => {
      expect(rep).toBeInstanceOf(Report);
      expect(rep.tags).toBe(report.tags);
      expect(rep.consoleLogs).toBe(report.consoleLogs);
      expect(rep.instabugLogs).toBe(report.instabugLogs);
      expect(rep.userAttributes).toBe(report.userAttributes);
      expect(rep.fileAttachments).toBe(report.fileAttachments);
      done();
    };
    Instabug.onReportSubmitHandler(callback);
    emitter.emit(NativeEvents.PRESENDING_HANDLER, report);

    expect(emitter.listenerCount(NativeEvents.PRESENDING_HANDLER)).toBe(1);
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

  it('onNetworkDiagnosticsHandler should be called with appropriate arguments', () => {
    const callback = jest.fn();
    const data = {
      date: 'date',
      totalRequestCount: 1,
      failureCount: 1,
    };

    Instabug.onNetworkDiagnosticsHandler(callback);

    emitter.emit(NativeEvents.NETWORK_DIAGNOSTICS_HANDLER, data);

    expect(NativeInstabug.setOnNetworkDiagnosticsHandler).toBeCalledTimes(1);
    expect(emitter.listenerCount(NativeEvents.NETWORK_DIAGNOSTICS_HANDLER)).toBe(1);
    expect(callback).toBeCalledTimes(1);
    expect(callback).toBeCalledWith(data.date, data.totalRequestCount, data.failureCount);
  });
});
