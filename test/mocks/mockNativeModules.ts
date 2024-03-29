import type { InstabugNativePackage } from '../../src/native/NativePackage';
import mockAPM from './mockAPM';
import mockBugReporting from './mockBugReporting';
import mockCrashReporting from './mockCrashReporting';
import mockFeatureRequests from './mockFeatureRequests';
import mockSessionReplay from './mockSessionReplay';
import mockInstabug from './mockInstabug';
import mockReplies from './mockReplies';
import mockSurveys from './mockSurveys';

jest.mock('react-native', () => {
  const RN = jest.requireActual('react-native');
  const mockNativeModules: InstabugNativePackage = {
    IBGAPM: mockAPM,
    IBGBugReporting: mockBugReporting,
    IBGCrashReporting: mockCrashReporting,
    IBGFeatureRequests: mockFeatureRequests,
    IBGSessionReplay: mockSessionReplay,
    Instabug: mockInstabug,
    IBGReplies: mockReplies,
    IBGSurveys: mockSurveys,
  };

  Object.assign(RN.NativeModules, mockNativeModules);

  return RN;
});
