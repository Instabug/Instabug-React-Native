import type { NetworkLoggerNativeModule } from '../../src/native/NativeNetworkLogger';

jest.mock('../../src/modules/NetworkLogger');

const mockNetworkLogger: NetworkLoggerNativeModule = {
  addListener: jest.fn(),
  removeListeners: jest.fn(),
  hasAPMNetworkPlugin: jest.fn(),
  isAPMNetworkEnabled: jest.fn(),
  isNativeInterceptionEnabled: jest.fn(),
};

export default mockNetworkLogger;
