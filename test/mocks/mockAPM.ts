import type { ApmNativeModule } from '../../src/native/NativeAPM';

const mockAPM: ApmNativeModule = {
  addListener: jest.fn(),
  removeListeners: jest.fn(),
  setEnabled: jest.fn(),
  setAppLaunchEnabled: jest.fn(),
  setAutoUITraceEnabled: jest.fn(),
  startFlow: jest.fn(),
  setFlowAttribute: jest.fn(),
  endFlow: jest.fn(),
  startUITrace: jest.fn(),
  endUITrace: jest.fn(),
  endAppLaunch: jest.fn(),
  ibgSleep: jest.fn(),
  networkLogAndroid: jest.fn(),
};

export default mockAPM;
