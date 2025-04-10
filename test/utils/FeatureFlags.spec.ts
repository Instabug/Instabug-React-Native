import { FeatureFlags, registerW3CFlagsListener } from '../../src/utils/FeatureFlags';
import * as InstabugModule from '../../src/modules/Instabug';
import { NativeInstabug } from '../../src/native/NativeInstabug';

describe('FeatureFlags and registerW3CFlagsListener', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should use NativeInstabug methods by default before listener is called', async () => {
    jest.spyOn(NativeInstabug, 'isW3ExternalTraceIDEnabled').mockResolvedValue(true);
    jest.spyOn(NativeInstabug, 'isW3ExternalGeneratedHeaderEnabled').mockResolvedValue(false);
    jest.spyOn(NativeInstabug, 'isW3CaughtHeaderEnabled').mockResolvedValue(true);

    const traceID = await FeatureFlags.isW3ExternalTraceID();
    const generatedHeader = await FeatureFlags.isW3ExternalGeneratedHeader();
    const caughtHeader = await FeatureFlags.isW3CaughtHeader();

    expect(traceID).toBe(true);
    expect(generatedHeader).toBe(false);
    expect(caughtHeader).toBe(true);
  });

  it('should update the FeatureFlags methods using the listener response', async () => {
    const mockResponse = {
      isW3ExternalTraceIDEnabled: true,
      isW3ExternalGeneratedHeaderEnabled: false,
      isW3CaughtHeaderEnabled: true,
    };

    const listenerMock = jest
      .spyOn(InstabugModule, '_registerW3CFlagsChangeListener')
      .mockImplementation((callback) => {
        callback(mockResponse);
      });

    registerW3CFlagsListener();

    expect(await FeatureFlags.isW3ExternalTraceID()).toBe(true);
    expect(await FeatureFlags.isW3ExternalGeneratedHeader()).toBe(false);
    expect(await FeatureFlags.isW3CaughtHeader()).toBe(true);
    expect(listenerMock).toHaveBeenCalledTimes(1);
  });

  it('should update the FeatureFlags methods using the listener', async () => {
    const mockResponse = {
      isW3ExternalTraceIDEnabled: true,
      isW3ExternalGeneratedHeaderEnabled: false,
      isW3CaughtHeaderEnabled: true,
    };

    const listenerMock = jest
      .spyOn(InstabugModule, '_registerW3CFlagsChangeListener')
      .mockImplementation((callback) => {
        callback(mockResponse);
      });

    registerW3CFlagsListener();

    expect(await FeatureFlags.isW3ExternalTraceID()).toBe(true);
    expect(await FeatureFlags.isW3ExternalGeneratedHeader()).toBe(false);
    expect(await FeatureFlags.isW3CaughtHeader()).toBe(true);

    expect(listenerMock).toHaveBeenCalledTimes(1);
  });

  it('should retain default behavior if listener is never called', async () => {
    jest.spyOn(NativeInstabug, 'isW3ExternalTraceIDEnabled').mockResolvedValue(false);
    jest.spyOn(NativeInstabug, 'isW3ExternalGeneratedHeaderEnabled').mockResolvedValue(false);
    jest.spyOn(NativeInstabug, 'isW3CaughtHeaderEnabled').mockResolvedValue(false);

    jest.spyOn(InstabugModule, '_registerW3CFlagsChangeListener').mockImplementation(() => {});

    registerW3CFlagsListener();

    expect(await FeatureFlags.isW3ExternalTraceID()).toBe(true);
    expect(await FeatureFlags.isW3ExternalGeneratedHeader()).toBe(false);
    expect(await FeatureFlags.isW3CaughtHeader()).toBe(true);
  });
});
