import { NativeInstabug } from '../../src/native/NativeInstabug';
import { FeatureFlags, registerW3CFlagsListener } from '../../src/utils/FeatureFlags';
import { _registerW3CFlagsChangeListener } from '../../src/modules/Instabug';

jest.mock('../../src/modules/Instabug', () => ({
  _registerW3CFlagsChangeListener: jest.fn(),
}));

describe('FeatureFlags', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('calls native methods by default', () => {
    (NativeInstabug.isW3ExternalTraceIDEnabled as jest.Mock).mockReturnValue(true);
    (NativeInstabug.isW3ExternalGeneratedHeaderEnabled as jest.Mock).mockReturnValue(false);
    (NativeInstabug.isW3CaughtHeaderEnabled as jest.Mock).mockReturnValue(true);

    expect(FeatureFlags.isW3ExternalTraceID()).toBe(true);
    expect(FeatureFlags.isW3ExternalGeneratedHeader()).toBe(false);
    expect(FeatureFlags.isW3CaughtHeader()).toBe(true);
  });

  it('overrides flags after listener is registered', async () => {
    const mockListener = jest.fn();
    (_registerW3CFlagsChangeListener as jest.Mock).mockImplementation((cb) => {
      mockListener.mockImplementation(cb);
      cb({
        isW3ExternalTraceIDEnabled: false,
        isW3ExternalGeneratedHeaderEnabled: true,
        isW3CaughtHeaderEnabled: false,
      });
    });

    registerW3CFlagsListener();

    expect(typeof FeatureFlags.isW3ExternalTraceID).toBe('function');

    // @ts-ignore - these are now async after listener runs
    await expect(FeatureFlags.isW3ExternalTraceID()).resolves.toBe(false);
    await expect(FeatureFlags.isW3ExternalGeneratedHeader()).resolves.toBe(true);
    await expect(FeatureFlags.isW3CaughtHeader()).resolves.toBe(false);
  });
});
