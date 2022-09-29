import mockAPM from './mockAPM';
import mockBugReporting from './mockBugReporting';
import mockFeatureRequests from './mockFeatureRequests';
import mockInstabug from './mockInstabug';
import mockInstabugUtils from './mockInstabugUtils';
import mockReplies from './mockReplies';
import mockSurveys from './mockSurveys';

jest.mock('NativeModules', () => ({
  ...mockAPM,
  ...mockBugReporting,
  ...mockFeatureRequests,
  ...mockInstabug,
  ...mockInstabugUtils,
  ...mockReplies,
  ...mockSurveys,
}));
