import type { NetworkLoggerNativeModule } from '../../src/native/NativeNetworkLogger';

const mockNetworkLogger: NetworkLoggerNativeModule = {
  addListener: jest.fn(),
  removeListeners: jest.fn(),
  hasAPMNetworkPlugin: jest.fn(),
  isNativeInterceptionEnabled: jest.fn(),
  forceStartNetworkLoggingIOS: jest.fn(),
  forceStopNetworkLoggingIOS: jest.fn(),
  registerNetworkLogsListener: jest.fn(),
  updateNetworkLogSnapshot: jest.fn(),
  setNetworkLoggingRequestFilterPredicateIOS: jest.fn(),
};

export default mockNetworkLogger;
