import type { ApmNativeModule } from '../../src/native/NativeAPM';

const mockAPM: ApmNativeModule = {
  addListener: jest.fn(),
  removeListeners: jest.fn(),
  setEnabled: jest.fn(),
  setAppLaunchEnabled: jest.fn(),
  setAutoUITraceEnabled: jest.fn(),
  startExecutionTrace: jest.fn(),
  setExecutionTraceAttribute: jest.fn(),
  endExecutionTrace: jest.fn(),
  startFlow: jest.fn(),
  setFlowAttribute: jest.fn(),
  endFlow: jest.fn(),
  startUITrace: jest.fn(),
  endUITrace: jest.fn(),
  endAppLaunch: jest.fn(),
  ibgSleep: jest.fn(),
  networkLog: jest.fn(),
  isW3ExternalTraceIDEnabled: jest.fn(),
  isW3ExternalGeneratedHeaderEnabled: jest.fn(),
  isW3CaughtHeaderEnabled: jest.fn(),
};

export default mockAPM;
