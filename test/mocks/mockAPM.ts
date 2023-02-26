import type { ApmNativeModule } from '../../src/native/ApmNativeModule';

const mockAPM: ApmNativeModule = {
  addListener: jest.fn(),
  removeListeners: jest.fn(),
  setEnabled: jest.fn(),
  setAppLaunchEnabled: jest.fn(),
  setAutoUITraceEnabled: jest.fn(),
  setLogLevel: jest.fn(),
  startExecutionTrace: jest.fn(),
  setExecutionTraceAttribute: jest.fn(),
  endExecutionTrace: jest.fn(),
  startUITrace: jest.fn(),
  endUITrace: jest.fn(),
  endAppLaunch: jest.fn(),
  ibgSleep: jest.fn(),
  networkLog: jest.fn(),
};

export default {
  IBGAPM: mockAPM,
};
