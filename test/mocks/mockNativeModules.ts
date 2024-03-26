import type { InstabugNativePackage } from '../../src/native/NativePackage';
import mockAPM from './mockAPM';
import mockBugReporting from './mockBugReporting';
import mockCrashReporting from './mockCrashReporting';
import mockSessionReplay from './mockSessionReplay';
import mockInstabug from './mockInstabug';
import mockReplies from './mockReplies';

jest.mock('react-native', () => {
  const RN = jest.requireActual('react-native');
  const mockNativeModules: InstabugNativePackage = {
    IBGAPM: mockAPM,
    IBGBugReporting: mockBugReporting,
    IBGCrashReporting: mockCrashReporting,
    IBGSessionReplay: mockSessionReplay,
    Instabug: mockInstabug,
    IBGReplies: mockReplies,
  };

  Object.assign(RN.NativeModules, mockNativeModules);

  return RN;
});
