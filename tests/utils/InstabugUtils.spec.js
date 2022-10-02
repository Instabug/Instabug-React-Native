import '../mocks/mockXhrNetworkInterceptor';
import { NativeModules, Platform } from 'react-native';
import Instabug from '../../src';

const { Instabug: NativeInstabug } = NativeModules;

describe('Test global error handler', () => {
  beforeEach(() => {
    Instabug.start('', [Instabug.invocationEvent.none]);
  });

  it('should call sendJSCrash when platform is ios', () => {
    Platform.OS = 'ios';
    Platform.constants['reactNativeVersion'] = { minor: 64 };
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
