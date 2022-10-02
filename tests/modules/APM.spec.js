import { NativeModules, Platform } from 'react-native';
import APM from '../../src/modules/APM';
import IBGEventEmitter from '../../src/utils/IBGEventEmitter';

const { Instabug: NativeInstabug, IBGAPM: NativeAPM } = NativeModules;

describe('APM Module', () => {
  it('should call the native method setEnabled', () => {
    APM.setEnabled(true);

    expect(NativeAPM.setEnabled).toBeCalledTimes(1);
    expect(NativeAPM.setEnabled).toBeCalledWith(true);
  });

  it('should call the native method setAppLaunchEnabled', () => {
    APM.setAppLaunchEnabled(true);

    expect(NativeAPM.setAppLaunchEnabled).toBeCalledTimes(1);
    expect(NativeAPM.setAppLaunchEnabled).toBeCalledWith(true);
  });

  it('should call the native method setNetworkEnabledIOS', () => {
    Platform.OS = 'ios';
    APM.setNetworkEnabledIOS(true);

    expect(NativeInstabug.setNetworkLoggingEnabled).toBeCalledTimes(1);
    expect(NativeInstabug.setNetworkLoggingEnabled).toBeCalledWith(true);
  });

  it('should call the native method endAppLaunch', () => {
    APM.endAppLaunch();

    expect(NativeAPM.endAppLaunch).toBeCalledTimes(1);
    expect(NativeAPM.endAppLaunch).toBeCalledWith();
  });

  it('should call the native method setAutoUITraceEnabled', () => {
    APM.setAutoUITraceEnabled(true);

    expect(NativeAPM.setAutoUITraceEnabled).toBeCalledTimes(1);
    expect(NativeAPM.setAutoUITraceEnabled).toBeCalledWith(true);
  });

  it('should call the native method setLogLevel', () => {
    APM.setLogLevel(APM.logLevel.verbose);

    expect(NativeAPM.setLogLevel).toBeCalledTimes(1);
    expect(NativeAPM.setLogLevel).toBeCalledWith(APM.logLevel.verbose);
  });

  it('should call the native method startExecutionTrace', () => {
    APM.startExecutionTrace('trace');

    expect(NativeAPM.startExecutionTrace).toBeCalledTimes(1);
    expect(NativeAPM.startExecutionTrace).toBeCalledWith(
      'trace',
      expect.any(String),
      expect.any(Function),
    );
  });

  it('should call the native method setExecutionTraceAttribute', () => {
    const trace = APM.startExecutionTrace('trace').then(() => {
      trace.setAttribute('key', 'value');

      expect(NativeAPM.setExecutionTraceAttribute).toBeCalledTimes(1);
      expect(NativeAPM.setExecutionTraceAttribute).toBeCalledWith(
        expect.any(String),
        'key',
        'value',
      );
    });
  });

  it('should call the native method endExecutionTrace', () => {
    const trace = APM.startExecutionTrace('trace').then(() => {
      trace.end();

      expect(NativeAPM.endExecutionTrace).toBeCalledTimes(1);
      expect(NativeAPM.endExecutionTrace).toBeCalledWith(expect.any(String));
    });
  });

  it('should call the native method startUITrace', () => {
    APM.startUITrace('uiTrace');

    expect(NativeAPM.startUITrace).toBeCalledTimes(1);
    expect(NativeAPM.startUITrace).toBeCalledWith('uiTrace');
  });

  it('should call the native method endUITrace', () => {
    APM.endUITrace();

    expect(NativeAPM.endUITrace).toBeCalledTimes(1);
    expect(NativeAPM.endUITrace).toBeCalledWith();
  });

  it('should call the native method _ibgSleep', () => {
    APM._ibgSleep();

    expect(NativeAPM.ibgSleep).toBeCalledTimes(1);
    expect(NativeAPM.ibgSleep).toBeCalledWith();
  });
});
