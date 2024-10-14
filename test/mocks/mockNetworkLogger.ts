import type { NetworkLoggerNativeModule } from '../../src/native/NativeNetworkLogger';

const mockNetworkLogger: NetworkLoggerNativeModule = {
  addListener: jest.fn(),
  removeListeners: jest.fn(),
  hasAPMNetworkPlugin: jest.fn(),
  isNativeInterceptionEnabled: jest.fn(),
};

export default mockNetworkLogger;
