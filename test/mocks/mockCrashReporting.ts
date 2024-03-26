import type { CrashReportingNativeModule } from '../../src/native/NativeCrashReporting';

const mockCrashReporting: CrashReportingNativeModule = {
  addListener: jest.fn(),
  removeListeners: jest.fn(),
  setEnabled: jest.fn(),
  sendHandledJSCrash: jest.fn(),
  sendJSCrash: jest.fn(),
  setNDKCrashesEnabled: jest.fn(),
};

export default mockCrashReporting;
