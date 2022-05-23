/**
 * @format
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import {NativeModules, Platform} from 'react-native';
import '../../jest/mockInstabug';
import Instabug from 'instabug-reactnative';
import IBGEventEmitter from 'instabug-reactnative/utils/IBGEventEmitter';
import IBGConstants from 'instabug-reactnative/utils/InstabugConstants';
// import console = require('console');

jest.mock(
  '../node_modules/instabug-reactnative/utils/XhrNetworkInterceptor',
  () => {
    return {
      enableInterception: jest.fn(),
      setOnDoneCallback: jest.fn(),
    };
  },
);

describe('Test global error handler', () => {
  const sendJSCrash = jest.spyOn(NativeModules.Instabug, 'sendJSCrash');
  beforeEach(() => {
    // var InstabugUtils = require('../utils/InstabugUtils');
  });

  it('should call sendJSCrash when platform is ios', () => {
    Platform.OS = 'ios';
    Platform.constants['reactNativeVersion'] = {minor: 64};
    var handler = global.ErrorUtils.getGlobalHandler();
    handler({name: 'TypeError', message: 'This is a type error.'}, false);
    const expected = {
      message: 'TypeError - This is a type error.',
      e_message: 'This is a type error.',
      e_name: 'TypeError',
      os: 'ios',
      platform: 'react_native',
      exception: [],
    };

    expect(sendJSCrash).toHaveBeenCalledWith(expected);
  });

  it('should call sendJSCrash when platform is android', () => {
    Platform.OS = 'android';
    Platform.constants['reactNativeVersion'] = {minor: 64};
    const handler = global.ErrorUtils.getGlobalHandler();
    handler({name: 'TypeError', message: 'This is a type error.'}, false);
    const expected = {
      message: 'TypeError - This is a type error.',
      e_message: 'This is a type error.',
      e_name: 'TypeError',
      os: 'android',
      platform: 'react_native',
      exception: [],
    };
    expect(sendJSCrash).toHaveBeenCalledWith(JSON.stringify(expected));
  });

  // it('should emit event IBGSendUnhandledJSCrash when platform is android and onReportSubmitHandler is set', (done) => {

  //     Platform.OS = 'android';
  //     Instabug._isOnReportHandlerSet = jest.fn(() => true);
  //     const handler = global.ErrorUtils.getGlobalHandler();
  //     IBGEventEmitter.addListener(Instabug, IBGConstants.SEND_UNHANDLED_CRASH, (actual) => {
  //         const expected = {
  //             message: 'TypeError - This is a type error.',
  //             os: 'android',
  //             platform: 'react_native',
  //             exception: []
  //         };
  //         expect(actual).toEqual(expected);
  //         done();
  //     });
  //     handler({ name: 'TypeError', message: 'This is a type error.' }, false);

  // });
});
