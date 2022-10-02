import mockAPM from './mockAPM';
import mockBugReporting from './mockBugReporting';
import mockFeatureRequests from './mockFeatureRequests';
import mockInstabug from './mockInstabug';
import mockReplies from './mockReplies';
import mockSurveys from './mockSurveys';

const mockModules = [
  mockAPM,
  mockBugReporting,
  mockFeatureRequests,
  mockInstabug,
  mockReplies,
  mockSurveys,
];

jest.mock('react-native', () => {
  const RN = jest.requireActual('react-native');

  mockModules.forEach(mockModule => {
    Object.assign(RN.NativeModules, mockModule);
  });

  return RN;
});
