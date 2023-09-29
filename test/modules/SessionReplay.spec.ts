import * as SessionReplay from '../../src/modules/SessionReplay';
import { NativeSessionReplay } from '../../src/native/NativeSessionReplay';

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
});
