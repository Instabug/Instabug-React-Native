import { mockDevMode } from '../mocks/mockDevMode';
import '../mocks/mockXhrNetworkInterceptor';

import { Platform } from 'react-native';
import parseErrorStackLib from 'react-native/Libraries/Core/Devtools/parseErrorStack';

import * as Instabug from '../../src/modules/Instabug';
import { NativeCrashReporting } from '../../src/native/NativeCrashReporting';
import { InvocationEvent } from '../../src/utils/Enums';
import InstabugUtils, { sendCrashReport } from '../../src/utils/InstabugUtils';

describe('Test global error handler', () => {
  beforeEach(() => {
    Instabug.init({ token: '', invocationEvents: [InvocationEvent.none] });
  });

  it('should call sendJSCrash with JSON object when an error arises and platform is iOS', () => {
    Platform.OS = 'ios';
    Platform.constants.reactNativeVersion = { major: 0, minor: 64, patch: 0 };

    const handler = ErrorUtils.getGlobalHandler();
    handler({ name: 'TypeError', message: 'This is a type error.' }, false);

    const expected = {
      message: 'TypeError - This is a type error.',
      e_message: 'This is a type error.',
      e_name: 'TypeError',
      os: 'ios',
      platform: 'react_native',
      exception: [],
    };

    expect(NativeCrashReporting.sendJSCrash).toHaveBeenCalledWith(expected);
  });

  it('should call sendJSCrash with stringified JSON object when an error arises and platform is Android', () => {
    Platform.OS = 'android';
    Platform.constants.reactNativeVersion = { major: 0, minor: 64, patch: 0 };

    const handler = ErrorUtils.getGlobalHandler();
    handler({ name: 'TypeError', message: 'This is a type error.' }, false);

    const expected = JSON.stringify({
      message: 'TypeError - This is a type error.',
      e_message: 'This is a type error.',
      e_name: 'TypeError',
      os: 'android',
      platform: 'react_native',
      exception: [],
    });

    expect(NativeCrashReporting.sendJSCrash).toHaveBeenCalledWith(expected);
  });
});

describe('Instabug Utils', () => {
  // Sample stack trace and its parsed stack frames
  const stack = 'Error\n\tat login (auth.js:2:15)';
  const stackFrames = [
    { arguments: [], column: 14, file: 'auth.js', lineNumber: 2, methodName: 'login' },
  ];

  it('getActiveRouteName should get route name from navigation state', () => {
    const navigationState = {
      index: 1,
      routes: [{ routeName: 'Home' }, { routeName: 'Settings' }],
    };

    // @ts-ignore
    const currentScreen = InstabugUtils.getActiveRouteName(navigationState);

    expect(currentScreen).toBe('Settings');
  });

  it('getActiveRouteName should get route name from nested navigation state', () => {
    const navigationState = {
      index: 0,
      routes: [
        {
          index: 1,
          routeName: 'Home',
          routes: [{ routeName: 'MoviesList' }, { routeName: 'MovieDetails' }],
        },
        { routeName: 'Settings' },
      ],
    };

    // @ts-ignore
    const currentScreen = InstabugUtils.getActiveRouteName(navigationState);

    expect(currentScreen).toBe('MovieDetails');
  });

  it('getActiveRouteName should return null if no navigation state', () => {
    // @ts-ignore
    const output = InstabugUtils.getActiveRouteName(null);
    expect(output).toBeNull();
  });

  it('getFullRoute should get route name from navigation state', () => {
    const navigationState = {
      index: 1,
      routes: [{ name: 'Home' }, { name: 'Settings' }],
    };

    const currentScreen = InstabugUtils.getFullRoute(navigationState);

    expect(currentScreen).toBe('Settings');
  });

  it('getFullRoute should get route name from nested navigation state', () => {
    const navigationState = {
      index: 0,
      routes: [
        {
          name: 'Home',
          state: { index: 1, routes: [{ name: 'MoviesList' }, { name: 'MovieDetails' }] },
        },
        { name: 'Settings' },
      ],
    };

    const currentScreen = InstabugUtils.getFullRoute(navigationState);

    expect(currentScreen).toBe('MovieDetails');
  });

  it('getFullRoute should return an empty string if navigation state is invalid', () => {
    // @ts-ignore
    const output = InstabugUtils.getFullRoute({});
    expect(output).toBe('');
  });

  it("parseErrorStack should call React Native's parseErrorStackLib", () => {
    Platform.constants.reactNativeVersion = { major: 0, minor: 63, patch: 0 };
    const error = new Error();

    InstabugUtils.parseErrorStack(error);

    expect(parseErrorStackLib).toBeCalledWith(error);
  });

  it('getStackTrace should call parseErrorStackLib with error stack in React Native >= 0.64', () => {
    Platform.constants.reactNativeVersion = { major: 0, minor: 64, patch: 0 };
    const error = new Error();
    error.stack = stack;

    const frames = InstabugUtils.getStackTrace(error);

    expect(parseErrorStackLib).toBeCalledWith(error.stack);
    expect(frames).toEqual(stackFrames);
  });

  it('getStackTrace should call parseErrorStackLib with error in React Native 0.63', () => {
    Platform.constants.reactNativeVersion = { major: 0, minor: 63, patch: 0 };
    const error = new Error();
    error.stack = stack;

    const frames = InstabugUtils.getStackTrace(error);

    expect(parseErrorStackLib).toBeCalledWith(error);
    expect(frames).toEqual(stackFrames);
  });

  it('getStackTrace should call parseErrorStackLib with error in React Native < 0.63', () => {
    Platform.constants.reactNativeVersion = { major: 0, minor: 60, patch: 0 };

    const error = new Error();
    error.stack = stack;

    const frames = InstabugUtils.getStackTrace(error);

    expect(parseErrorStackLib).toBeCalledWith(error);
    expect(frames).toEqual(stackFrames);
  });

  it('stringifyIfNotString should stringify non-strings', () => {
    expect(InstabugUtils.stringifyIfNotString('hello')).toBe('hello');
    expect(InstabugUtils.stringifyIfNotString(100)).toBe('100');
    expect(InstabugUtils.stringifyIfNotString([])).toBe('[]');
  });

  it('invokeDeprecatedCallback should call the callback if it was passed', () => {
    const callback = jest.fn();
    const arg = 'x';
    const consoleWarnSpy = jest.spyOn(console, 'warn').mockImplementation(() => {});

    const mockDev = mockDevMode(true);

    InstabugUtils.invokeDeprecatedCallback(callback, arg);

    expect(callback).toBeCalledTimes(1);
    expect(callback).toBeCalledWith(arg);
    expect(consoleWarnSpy).toBeCalledTimes(1);

    mockDev.mockRestore();
    consoleWarnSpy.mockRestore();
  });

  it("invokeDeprecatedCallback shouldn't invoke the callback if it is undefined", () => {
    const mockDev = mockDevMode(false);
    const consoleWarnSpy = jest.spyOn(console, 'warn').mockImplementation(() => {});

    expect(() => InstabugUtils.invokeDeprecatedCallback()).not.toThrowError(TypeError);

    mockDev.mockRestore();
    consoleWarnSpy.mockRestore();
  });

  it("invokeDeprecatedCallback shouldn't warn the user in production mode", () => {
    const callback = jest.fn();
    const arg = 'x';
    const mockDev = mockDevMode(false);
    const consoleWarnSpy = jest.spyOn(console, 'warn').mockImplementation(() => {});

    InstabugUtils.invokeDeprecatedCallback(callback, arg);

    expect(consoleWarnSpy).not.toBeCalled();

    mockDev.mockRestore();
    consoleWarnSpy.mockRestore();
  });

  it('should call remoteSenderCallback with the correct JSON object on Android', () => {
    const remoteSenderCallback = NativeCrashReporting.sendHandledJSCrash;
    Platform.OS = 'android';
    const errorMock = { name: 'TypeError', message: 'Invalid type' };

    sendCrashReport(errorMock, remoteSenderCallback);

    const expectedMap = {
      message: 'TypeError - Invalid type',
      e_message: 'Invalid type',
      e_name: 'TypeError',
      os: 'android',
      platform: 'react_native',
      exception: [],
    };
    const expectedJsonObject = JSON.stringify(expectedMap);
    expect(remoteSenderCallback).toHaveBeenCalledTimes(1);
    expect(remoteSenderCallback).toHaveBeenCalledWith(expectedJsonObject);
  });

  it('should call remoteSenderCallback with the correct JSON object on iOS', () => {
    const remoteSenderCallback = NativeCrashReporting.sendHandledJSCrash;
    Platform.OS = 'ios';
    const errorMock = { name: 'TypeError', message: 'Invalid type' };

    sendCrashReport(errorMock, remoteSenderCallback);

    const expectedMap = {
      message: 'TypeError - Invalid type',
      e_message: 'Invalid type',
      e_name: 'TypeError',
      os: 'ios',
      platform: 'react_native',
      exception: [],
    };
    expect(remoteSenderCallback).toHaveBeenCalledTimes(1);
    expect(remoteSenderCallback).toHaveBeenCalledWith(expectedMap);
  });
});
