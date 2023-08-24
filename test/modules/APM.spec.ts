import { Platform } from 'react-native';

import { mocked } from 'jest-mock';

import Trace from '../../src/models/Trace';
import * as APM from '../../src/modules/APM';
import { NativeAPM } from '../../src/native/NativeAPM';
import { NativeInstabug } from '../../src/native/NativeInstabug';

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

  it('should not call the native method setNetworkEnabledIOS if platform is android', () => {
    Platform.OS = 'android';
    APM.setNetworkEnabledIOS(true);

    expect(NativeInstabug.setNetworkLoggingEnabled).not.toBeCalled();
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
    mocked(NativeAPM).startExecutionTrace.mockResolvedValueOnce('trace-id');

    APM.startExecutionTrace('trace');

    expect(NativeAPM.startExecutionTrace).toBeCalledTimes(1);
    expect(NativeAPM.startExecutionTrace).toBeCalledWith('trace', expect.any(String));
  });

  it("should throw an error if native startExecutionTrace didn't return an ID", async () => {
    mocked(NativeAPM).startExecutionTrace.mockResolvedValueOnce(null);

    const promise = APM.startExecutionTrace('trace');

    await expect(promise).rejects.toThrowError(/trace "trace" wasn't created/i);
  });

  it('should resolve with an Trace object if native startExecutionTrace returned an ID', async () => {
    mocked(NativeAPM).startExecutionTrace.mockResolvedValueOnce('trace-id');

    const promise = APM.startExecutionTrace('trace');

    await expect(promise).resolves.toBeInstanceOf(Trace);
    await expect(promise).resolves.toHaveProperty('name', 'trace');
  });

  it('should call the native method setExecutionTraceAttribute', () => {
    mocked(NativeAPM).startExecutionTrace.mockResolvedValueOnce('trace-id');

    APM.startExecutionTrace('trace').then((trace) => {
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
    mocked(NativeAPM).startExecutionTrace.mockResolvedValueOnce('trace-id');

    APM.startExecutionTrace('trace').then((trace) => {
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
