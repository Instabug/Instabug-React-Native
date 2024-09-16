import * as SessionReplay from '../../src/modules/SessionReplay';
import { NativeSessionReplay, emitter, NativeEvents } from '../../src/native/NativeSessionReplay';

describe('Session Replay Module', () => {
  it('should call the native method setEnabled', () => {
    SessionReplay.setEnabled(true);

    expect(NativeSessionReplay.setEnabled).toBeCalledTimes(1);
    expect(NativeSessionReplay.setEnabled).toBeCalledWith(true);
  });

  it('should call the native method setNetworkLogsEnabled', () => {
    SessionReplay.setNetworkLogsEnabled(true);

    expect(NativeSessionReplay.setNetworkLogsEnabled).toBeCalledTimes(1);
    expect(NativeSessionReplay.setNetworkLogsEnabled).toBeCalledWith(true);
  });

  it('should call the native method setInstabugLogsEnabled', () => {
    SessionReplay.setInstabugLogsEnabled(true);

    expect(NativeSessionReplay.setInstabugLogsEnabled).toBeCalledTimes(1);
    expect(NativeSessionReplay.setInstabugLogsEnabled).toBeCalledWith(true);
  });

  it('should call the native method setUserStepsEnabled', () => {
    SessionReplay.setUserStepsEnabled(true);

    expect(NativeSessionReplay.setUserStepsEnabled).toBeCalledTimes(1);
    expect(NativeSessionReplay.setUserStepsEnabled).toBeCalledWith(true);
  });

  it('should call the native method getSessionReplayLink', () => {
    SessionReplay.getSessionReplayLink();

    expect(NativeSessionReplay.getSessionReplayLink).toBeCalledTimes(1);
    expect(NativeSessionReplay.getSessionReplayLink).toReturnWith('link');
  });

  it('should call the native method setSyncCallback', () => {
    const shouldSync = true;
    const callback = jest.fn().mockReturnValue(shouldSync);

    SessionReplay.setSyncCallback(callback);
    emitter.emit(NativeEvents.SESSION_REPLAY_ON_SYNC_CALLBACK_INVOCATION);

    expect(NativeSessionReplay.setSyncCallback).toBeCalledTimes(1);
    expect(emitter.listenerCount(NativeEvents.SESSION_REPLAY_ON_SYNC_CALLBACK_INVOCATION)).toBe(1);
    expect(NativeSessionReplay.evaluateSync).toBeCalledTimes(1);
    expect(NativeSessionReplay.evaluateSync).toBeCalledWith(shouldSync);
  });
});
