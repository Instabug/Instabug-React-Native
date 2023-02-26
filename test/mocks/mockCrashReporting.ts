import type { CrashReportingNativeModule } from '../../src/native/CrashReportingNativeModule';

const mockCrashReporting: CrashReportingNativeModule = {
  addListener: jest.fn(),
  removeListeners: jest.fn(),
  setEnabled: jest.fn(),
  sendHandledJSCrash: jest.fn(),
  sendJSCrash: jest.fn(),
};

export default {
  IBGCrashReporting: mockCrashReporting,
};
