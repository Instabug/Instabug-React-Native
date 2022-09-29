/**
 * @format
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import 'react-native';
import { NativeModules, Platform } from 'react-native';
import '../mocks/mockAPM';
import APM from '../../src/modules/APM';
import IBGEventEmitter from '../../src/utils/IBGEventEmitter';

const { Instabug: NativeInstabug, IBGAPM: NativeIBGAPM } = NativeModules;

describe('APM Module', () => {
  beforeEach(() => {
    IBGEventEmitter.removeAllListeners();
  });

  it('should call the native method setEnabled', () => {
    APM.setEnabled(true);

    expect(NativeIBGAPM.setEnabled).toBeCalledTimes(1);
    expect(NativeIBGAPM.setEnabled).toBeCalledWith(true);
  });

  it('should call the native method setAppLaunchEnabled', () => {
    APM.setAppLaunchEnabled(true);

    expect(NativeIBGAPM.setAppLaunchEnabled).toBeCalledTimes(1);
    expect(NativeIBGAPM.setAppLaunchEnabled).toBeCalledWith(true);
  });

  it('should call the native method setNetworkEnabledIOS', () => {
    Platform.OS = 'ios';
    APM.setNetworkEnabledIOS(true);

    expect(NativeInstabug.setNetworkLoggingEnabled).toBeCalledTimes(1);
    expect(NativeInstabug.setNetworkLoggingEnabled).toBeCalledWith(true);
  });

  it('should call the native method endAppLaunch', () => {
    APM.endAppLaunch();

    expect(NativeIBGAPM.endAppLaunch).toBeCalledTimes(1);
    expect(NativeIBGAPM.endAppLaunch).toBeCalledWith();
  });

  it('should call the native method setAutoUITraceEnabled', () => {
    APM.setAutoUITraceEnabled(true);

    expect(NativeIBGAPM.setAutoUITraceEnabled).toBeCalledTimes(1);
    expect(NativeIBGAPM.setAutoUITraceEnabled).toBeCalledWith(true);
  });

  it('should call the native method setLogLevel', () => {
    APM.setLogLevel(APM.logLevel.verbose);

    expect(NativeIBGAPM.setLogLevel).toBeCalledTimes(1);
    expect(NativeIBGAPM.setLogLevel).toBeCalledWith(APM.logLevel.verbose);
  });

  it('should call the native method startExecutionTrace', () => {
    APM.startExecutionTrace('trace');

    expect(NativeIBGAPM.startExecutionTrace).toBeCalledTimes(1);
    expect(NativeIBGAPM.startExecutionTrace).toBeCalledWith(
      'trace',
      expect.any(String),
      expect.any(Function),
    );
  });

  it('should call the native method setExecutionTraceAttribute', () => {
    const trace = APM.startExecutionTrace('trace').then(() => {
      trace.setAttribute('key', 'value');

      expect(NativeIBGAPM.setExecutionTraceAttribute).toBeCalledTimes(1);
      expect(NativeIBGAPM.setExecutionTraceAttribute).toBeCalledWith(
        expect.any(String),
        'key',
        'value',
      );
    });
  });

  it('should call the native method endExecutionTrace', () => {
    const trace = APM.startExecutionTrace('trace').then(() => {
      trace.end();

      expect(NativeIBGAPM.endExecutionTrace).toBeCalledTimes(1);
      expect(NativeIBGAPM.endExecutionTrace).toBeCalledWith(expect.any(String));
    });
  });

  it('should call the native method startUITrace', () => {
    APM.startUITrace('uiTrace');

    expect(NativeIBGAPM.startUITrace).toBeCalledTimes(1);
    expect(NativeIBGAPM.startUITrace).toBeCalledWith('uiTrace');
  });

  it('should call the native method endUITrace', () => {
    APM.endUITrace();

    expect(NativeIBGAPM.endUITrace).toBeCalledTimes(1);
    expect(NativeIBGAPM.endUITrace).toBeCalledWith();
  });

  it('should call the native method _ibgSleep', () => {
    APM._ibgSleep();

    expect(NativeIBGAPM.ibgSleep).toBeCalledTimes(1);
    expect(NativeIBGAPM.ibgSleep).toBeCalledWith();
  });
});
