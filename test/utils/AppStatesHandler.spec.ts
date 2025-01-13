import { AppState } from 'react-native';
import { addAppStateListener, removeAppStateListener } from '../../src/utils/AppStatesHandler';

jest.mock('react-native', () => ({
  AppState: {
    addEventListener: jest.fn(),
  },
}));

describe('AppState Listener', () => {
  const mockHandleAppStateChange = jest.fn();
  const mockRemove = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (AppState.addEventListener as jest.Mock).mockReturnValue({ remove: mockRemove });
  });

  afterEach(() => {
    removeAppStateListener(); // Ensure no leftover subscriptions between tests
  });

  it('should add an AppState listener if none exists', () => {
    addAppStateListener(mockHandleAppStateChange);

    expect(AppState.addEventListener).toHaveBeenCalledTimes(1);
    expect(AppState.addEventListener).toHaveBeenCalledWith('change', mockHandleAppStateChange);
  });

  it('should not add another listener if one already exists', () => {
    addAppStateListener(mockHandleAppStateChange);
    addAppStateListener(mockHandleAppStateChange);

    expect(AppState.addEventListener).toHaveBeenCalledTimes(1); // Only called once
  });

  it('should remove the AppState listener if one exists', () => {
    addAppStateListener(mockHandleAppStateChange);
    removeAppStateListener();

    expect(mockRemove).toHaveBeenCalledTimes(1); // The remove function is called
  });

  it('should do nothing if removeAppStateListener is called without an existing subscription', () => {
    removeAppStateListener();

    expect(mockRemove).not.toHaveBeenCalled(); // No remove is called
  });

  it('should handle multiple add/remove calls properly', () => {
    addAppStateListener(mockHandleAppStateChange);
    removeAppStateListener();

    addAppStateListener(mockHandleAppStateChange);
    removeAppStateListener();

    expect(AppState.addEventListener).toHaveBeenCalledTimes(2); // Listener is added twice
    expect(mockRemove).toHaveBeenCalledTimes(2); // Listener is removed twice
  });
});
