import '../mocks/mockXhrNetworkInterceptor';

import { Platform } from 'react-native';
import parseErrorStackLib from 'react-native/Libraries/Core/Devtools/parseErrorStack';

import * as Instabug from '../../src/modules/Instabug';
import * as NetworkLogger from '../../src/modules/NetworkLogger';
import { NativeCrashReporting } from '../../src/native/NativeCrashReporting';
import { InvocationEvent, NetworkData, NonFatalErrorLevel } from '../../src';
import InstabugUtils, {
  getStackTrace,
  registerFilteringAndObfuscationListener,
  registerFilteringListener,
  registerObfuscationListener,
  reportNetworkLog,
  resetNativeObfuscationListener,
  sendCrashReport,
  updateNetworkLogSnapshot,
  setApmNetworkFlagsIfChanged,
  generateTracePartialId,
  generateW3CHeader,
  isContentTypeNotAllowed,
} from '../../src/utils/InstabugUtils';

import {
  NativeNetworkLogger,
  NetworkListenerType,
  NetworkLoggerEmitter,
} from '../../src/native/NativeNetworkLogger';
import { NativeInstabug } from '../../src/native/NativeInstabug';
import { NativeAPM } from '../../src/native/NativeAPM';

jest.mock('../../src/modules/NetworkLogger');

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

  it('should call remoteSenderCallback with the correct JSON object on Android', () => {
    const remoteSenderCallback = NativeCrashReporting.sendHandledJSCrash;
    Platform.OS = 'android';
    const errorMock = new TypeError('Invalid type');
    const jsStackTrace = getStackTrace(errorMock);

    sendCrashReport(errorMock, (data) =>
      remoteSenderCallback(data, null, null, NonFatalErrorLevel.error),
    );

    const expectedMap = {
      message: 'TypeError - Invalid type',
      e_message: 'Invalid type',
      e_name: 'TypeError',
      os: 'android',
      platform: 'react_native',
      exception: jsStackTrace,
    };
    const expectedJsonObject = JSON.stringify(expectedMap);
    expect(remoteSenderCallback).toHaveBeenCalledTimes(1);
    expect(remoteSenderCallback).toHaveBeenCalledWith(
      expectedJsonObject,
      null,
      null,
      NonFatalErrorLevel.error,
    );
  });

  it('should call remoteSenderCallback with the correct JSON object on iOS', () => {
    const remoteSenderCallback = NativeCrashReporting.sendHandledJSCrash;
    Platform.OS = 'ios';
    const errorMock = new TypeError('Invalid type');
    const jsStackTrace = getStackTrace(errorMock);

    sendCrashReport(errorMock, (data) =>
      remoteSenderCallback(data, null, null, NonFatalErrorLevel.error),
    );
    const expectedMap = {
      message: 'TypeError - Invalid type',
      e_message: 'Invalid type',
      e_name: 'TypeError',
      os: 'ios',
      platform: 'react_native',
      exception: jsStackTrace,
    };
    expect(remoteSenderCallback).toHaveBeenCalledTimes(1);
    expect(remoteSenderCallback).toHaveBeenCalledWith(
      expectedMap,
      null,
      null,
      NonFatalErrorLevel.error,
    );
  });
});

describe('reportNetworkLog', () => {
  const network: NetworkData = {
    id: 'id',
    url: 'https://api.instabug.com',
    method: 'GET',
    requestBody: 'requestBody',
    requestHeaders: { request: 'header' },
    responseBody: 'responseBody',
    responseCode: 200,
    responseHeaders: { response: 'header' },
    contentType: 'application/json',
    startTime: 1,
    duration: 2,
    requestBodySize: 3,
    responseBodySize: 4,
    errorCode: 5,
    errorDomain: 'errorDomain',
    serverErrorMessage: 'serverErrorMessage',
    requestContentType: 'requestContentType',
    isW3cHeaderFound: null,
    partialId: null,
    networkStartTimeInSeconds: null,
    w3cGeneratedHeader: null,
    w3cCaughtHeader: null,
  };

  it('reportNetworkLog should send network logs to native with the correct parameters on Android', async () => {
    Platform.OS = 'android';
    jest
      .spyOn(NativeNetworkLogger, 'isNativeInterceptionEnabled')
      .mockReturnValue(Promise.resolve(false));
    jest.spyOn(NativeNetworkLogger, 'hasAPMNetworkPlugin').mockReturnValue(Promise.resolve(false));
    await Instabug.init({ token: '', invocationEvents: [InvocationEvent.none] });

    const requestHeaders = JSON.stringify(network.requestHeaders);
    const responseHeaders = JSON.stringify(network.responseHeaders);
    reportNetworkLog(network);

    expect(NativeInstabug.networkLogAndroid).toHaveBeenCalledTimes(1);
    expect(NativeInstabug.networkLogAndroid).toHaveBeenCalledWith(
      network.url,
      network.requestBody,
      network.responseBody,
      network.method,
      network.responseCode,
      requestHeaders,
      responseHeaders,
      network.duration,
    );

    expect(NativeAPM.networkLogAndroid).toHaveBeenCalledTimes(1);
    expect(NativeAPM.networkLogAndroid).toHaveBeenCalledWith(
      network.startTime,
      network.duration,
      requestHeaders,
      network.requestBody,
      network.requestBodySize,
      network.method,
      network.url,
      network.requestContentType,
      responseHeaders,
      network.responseBody,
      network.responseBodySize,
      network.responseCode,
      network.contentType,
      network.errorDomain,
      {
        isW3cHeaderFound: null,
        partialId: null,
        networkStartTimeInSeconds: null,
        w3cGeneratedHeader: null,
        w3cCaughtHeader: null,
      },
      network.gqlQueryName,
      network.serverErrorMessage,
    );
  });

  it('reportNetworkLog should send network logs to native with the correct parameters on iOS', () => {
    Platform.OS = 'ios';

    reportNetworkLog(network);

    expect(NativeInstabug.networkLogIOS).toHaveBeenCalledTimes(1);
    expect(NativeInstabug.networkLogIOS).toHaveBeenCalledWith(
      network.url,
      network.method,
      network.requestBody,
      network.requestBodySize,
      network.responseBody,
      network.responseBodySize,
      network.responseCode,
      network.requestHeaders,
      network.responseHeaders,
      network.contentType,
      network.errorDomain,
      network.errorCode,
      network.startTime,
      network.duration,
      network.gqlQueryName,
      network.serverErrorMessage,
      {
        isW3cHeaderFound: null,
        partialId: null,
        networkStartTimeInSeconds: null,
        w3cGeneratedHeader: null,
        w3cCaughtHeader: null,
      },
    );
  });
});

describe('test registerNetworkLogsListener usage', () => {
  beforeEach(() => {
    jest.clearAllMocks(); // Clear all mocks before each test
  });

  const network: NetworkLogger.NetworkData = {
    id: '',
    url: 'https://api.instabug.com',
    requestBody: '',
    requestHeaders: { 'content-type': 'application/json' },
    method: 'GET',
    responseBody: '',
    responseCode: 200,
    responseHeaders: { 'content-type': 'application/json' },
    contentType: 'application/json',
    duration: 0,
    requestBodySize: 0,
    responseBodySize: 0,
    errorDomain: '',
    errorCode: 0,
    startTime: 0,
    serverErrorMessage: '',
    requestContentType: 'application/json',
    isW3cHeaderFound: true,
    networkStartTimeInSeconds: 0,
    partialId: 0,
    w3cCaughtHeader: '',
    w3cGeneratedHeader: '',
  };

  it('registerObfuscationListener should call NetworkLogger.registerNetworkLogsListener() with  NetworkListenerType = NetworkListenerType.obfuscation', () => {
    registerObfuscationListener();
    expect(NetworkLogger.registerNetworkLogsListener).toBeCalledTimes(1);
    expect(NetworkLogger.registerNetworkLogsListener).toBeCalledWith(
      NetworkListenerType.obfuscation,
      expect.any(Function),
    );
  });

  it('registerFilteringListener should call NetworkLogger.registerNetworkLogsListener() with  NetworkListenerType = NetworkListenerType.filtering', () => {
    const testText = 'true';
    registerFilteringListener(testText);

    expect(NetworkLogger.registerNetworkLogsListener).toBeCalledTimes(1);
    expect(NetworkLogger.registerNetworkLogsListener).toBeCalledWith(
      NetworkListenerType.filtering,
      expect.any(Function),
    );
  });

  it('registerFilteringAndObfuscationListener should call NetworkLogger.registerNetworkLogsListener() with  NetworkListenerType = NetworkListenerType.both', () => {
    const testText = 'true';
    registerFilteringAndObfuscationListener(testText);

    expect(NetworkLogger.registerNetworkLogsListener).toBeCalledTimes(1);
    expect(NetworkLogger.registerNetworkLogsListener).toBeCalledWith(
      NetworkListenerType.both,
      expect.any(Function),
    );
  });

  it('should call NetworkLoggerEmitter.removeAllListeners when call resetNativeObfuscationListener', () => {
    jest.spyOn(NetworkLoggerEmitter, 'removeAllListeners').mockImplementation();
    resetNativeObfuscationListener();
    expect(NetworkLoggerEmitter.removeAllListeners).toBeCalledTimes(1);
  });

  it('should call NativeNetworkLogger.resetNetworkLogsListener when call resetNativeObfuscationListener on android platform', () => {
    Platform.OS = 'android';
    jest.spyOn(NativeNetworkLogger, 'resetNetworkLogsListener').mockImplementation();
    jest.spyOn(NetworkLoggerEmitter, 'removeAllListeners').mockImplementation();
    resetNativeObfuscationListener();
    expect(NativeNetworkLogger.resetNetworkLogsListener).toBeCalledTimes(1);
    expect(NetworkLoggerEmitter.removeAllListeners).toBeCalledTimes(1);
  });

  it('should call  NativeNetworkLogger.updateNetworkLogSnapshot when call updateNetworkLogSnapshot with correct parameters', () => {
    jest.spyOn(NativeNetworkLogger, 'updateNetworkLogSnapshot').mockImplementation();

    updateNetworkLogSnapshot(network);
    expect(NativeNetworkLogger.updateNetworkLogSnapshot).toBeCalledTimes(1);
    expect(NativeNetworkLogger.updateNetworkLogSnapshot).toHaveBeenCalledWith(
      network.url,
      network.id,
      network.requestBody,
      network.responseBody,
      network.responseCode ?? 200,
      network.requestHeaders,
      network.responseHeaders,
    );
  });
});

describe('InstabugUtils - Additional Coverage', () => {
  it('setApmNetworkFlagsIfChanged should return true if flags change', () => {
    const flags = {
      isNativeInterceptionFeatureEnabled: true,
      hasAPMNetworkPlugin: true,
      shouldEnableNativeInterception: true,
    };
    expect(setApmNetworkFlagsIfChanged(flags)).toBe(true);
    expect(setApmNetworkFlagsIfChanged(flags)).toBe(false);
  });

  it('generateTracePartialId should return a non-zero hex string and number', () => {
    const { numberPartilId, hexStringPartialId } = generateTracePartialId();
    expect(hexStringPartialId).toMatch(/^[0-9a-f]{8}$/);
    expect(hexStringPartialId).not.toBe('00000000');
    expect(typeof numberPartilId).toBe('number');
    expect(numberPartilId).not.toBe(0);
  });

  it('generateW3CHeader should return a valid w3c header object', () => {
    const now = Date.now();
    const result = generateW3CHeader(now);
    expect(result).toHaveProperty('timestampInSeconds');
    expect(result).toHaveProperty('partialId');
    expect(result).toHaveProperty('w3cHeader');
    expect(typeof result.w3cHeader).toBe('string');
    expect(result.w3cHeader.split('-').length).toBe(4);
  });

  it('isContentTypeNotAllowed should return false for allowed types and true for not allowed', () => {
    expect(isContentTypeNotAllowed('application/json')).toBe(false);
    expect(isContentTypeNotAllowed('text/plain')).toBe(false);
    expect(isContentTypeNotAllowed('image/png')).toBe(true);
    expect(isContentTypeNotAllowed('application/pdf')).toBe(true);
  });
});
