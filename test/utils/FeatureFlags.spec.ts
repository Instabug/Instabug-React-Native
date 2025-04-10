import { FeatureFlags, registerW3CFlagsListener } from '../../src/utils/FeatureFlags';
import * as InstabugModule from '../../src/modules/Instabug';

describe('registerW3CFlagsListener', () => {
  beforeEach(() => {
    jest.clearAllMocks();
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
});
