import type { CrashReportingNativeModule } from '../../src/native/CrashReportingNativeModule';

const mockedCrashReporting: CrashReportingNativeModule = {
  addListener: jest.fn(),
  removeListeners: jest.fn(),
  setEnabled: jest.fn(),
  sendHandledJSCrash: jest.fn(),
  sendJSCrash: jest.fn(),
};

export default {
  IBGCrashReporting: mockedCrashReporting,
};
