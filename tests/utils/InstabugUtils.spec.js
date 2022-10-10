import '../mocks/mockXhrNetworkInterceptor';
import { NativeModules, Platform } from 'react-native';
import parseErrorStackLib from 'react-native/Libraries/Core/Devtools/parseErrorStack';
import Instabug from '../../src/modules/Instabug';
import InstabugUtils from '../../src/utils/InstabugUtils';
import IBGEventEmitter from '../../src/utils/IBGEventEmitter';
import IBGConstants from '../../src/utils/InstabugConstants';

const { Instabug: NativeInstabug } = NativeModules;

describe('Test global error handler', () => {
  beforeEach(() => {
    Instabug.start('', [Instabug.invocationEvent.none]);
  });

  it('should call sendJSCrash when platform is ios', () => {
    Platform.OS = 'ios';
    Platform.constants.reactNativeVersion = { minor: 64 };
    var handler = global.ErrorUtils.getGlobalHandler();
    handler({ name: 'TypeError', message: 'This is a type error.' }, false);
    const expected = {
      message: 'TypeError - This is a type error.',
      e_message: 'This is a type error.',
      e_name: 'TypeError',
      os: 'ios',
      platform: 'react_native',
      exception: [],
    };

    expect(NativeInstabug.sendJSCrash).toHaveBeenCalledWith(expected);
  });

  it('should call sendJSCrash when platform is android and onReportSubmitHandler is not set', () => {
    Platform.OS = 'android';
    Platform.constants.reactNativeVersion = { minor: 64 };

    const handler = global.ErrorUtils.getGlobalHandler();
    handler({ name: 'TypeError', message: 'This is a type error.' }, false);

    const expected = JSON.stringify({
      message: 'TypeError - This is a type error.',
      e_message: 'This is a type error.',
      e_name: 'TypeError',
      os: 'android',
      platform: 'react_native',
      exception: [],
    });

    expect(NativeInstabug.sendJSCrash).toHaveBeenCalledWith(expected);
  });

  it('should emit event IBGSendUnhandledJSCrash when platform is android and onReportSubmitHandler is set', () => {
    Platform.OS = 'android';
    Platform.constants.reactNativeVersion = { minor: 63 };
    InstabugUtils.setOnReportHandler(true);
    const handler = global.ErrorUtils.getGlobalHandler();
    const callback = jest.fn();
    IBGEventEmitter.addListener(Instabug, IBGConstants.SEND_UNHANDLED_CRASH, callback);
    handler({ name: 'TypeError', message: 'This is a type error.' }, false);

    expect(callback).toHaveBeenCalledWith({
      message: 'TypeError - This is a type error.',
      e_message: 'This is a type error.',
      e_name: 'TypeError',
      os: 'android',
      platform: 'react_native',
      exception: [],
    });
  });
});

describe('Instabug Utils', () => {
  // Sample stack trace and its parsed stack frames
  const stack = 'Error\n\tat login (auth.js:2:15)';
  const stackFrames = [
    { arguments: [], column: 15, file: 'auth.js', lineNumber: 2, methodName: 'login' },
  ];

  it('getActiveRouteName should get route name from navigation state', () => {
    const navigationState = {
      index: 1,
      routes: [{ routeName: 'Home' }, { routeName: 'Settings' }],
    };

    const currentScreen = InstabugUtils.getActiveRouteName(navigationState);

    expect(currentScreen).toBe('Settings');
  });

  it('getActiveRouteName should get route name from nested navigation state', () => {
    const navigationState = {
      index: 0,
      routes: [
        {
          routeName: 'Home',
          index: 1,
          routes: [{ routeName: 'MoviesList' }, { routeName: 'MovieDetails' }],
        },
        { routeName: 'Settings' },
      ],
    };

    const currentScreen = InstabugUtils.getActiveRouteName(navigationState);

    expect(currentScreen).toBe('MovieDetails');
  });

  it('getActiveRouteName should return null if no navigation state', () => {
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
    const output = InstabugUtils.getFullRoute({});
    expect(output).toBe('');
  });

  it.each([true, false])('setOnReportHandler should set _isOnReportHandlerSet flag', flag => {
    InstabugUtils.setOnReportHandler(flag);

    const isOnReportHandlerSet = InstabugUtils.isOnReportHandlerSet();

    expect(isOnReportHandlerSet).toBe(flag);
  });

  it("parseErrorStack should call React Native's parseErrorStackLib", () => {
    Platform.constants.reactNativeVersion = { minor: 63 };
    const error = new Error();

    InstabugUtils.parseErrorStack(error);

    expect(parseErrorStackLib).toBeCalledWith(error);
  });

  it('getStackTrace should call parseErrorStackLib with error stack in React Native >= 0.64', () => {
    Platform.constants.reactNativeVersion = { minor: 64 };
    const error = new Error();
    error.stack = stack;

    const frames = InstabugUtils.getStackTrace(error);

    expect(parseErrorStackLib).toBeCalledWith(error.stack);
    expect(frames).toEqual(stackFrames);
  });

  it('getStackTrace should call parseErrorStackLib with error in React Native 0.63', () => {
    Platform.constants.reactNativeVersion = { minor: 63 };
    const error = new Error();
    error.stack = stack;

    const frames = InstabugUtils.getStackTrace(error);

    expect(parseErrorStackLib).toBeCalledWith(error);
    expect(frames).toEqual(stackFrames);
  });

  it('getStackTrace should call parseErrorStackLib with error in React Native < 0.63', () => {
    delete Platform.constants;

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
});
