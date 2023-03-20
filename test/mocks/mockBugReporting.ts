import type { BugReportingNativeModule } from '../../src/native/NativeBugReporting';

const mockBugReporting: BugReportingNativeModule = {
  addListener: jest.fn(),
  removeListeners: jest.fn(),
  setEnabled: jest.fn(),
  setInvocationEvents: jest.fn(),
  setOptions: jest.fn(),
  setFloatingButtonEdge: jest.fn(),
  setShakingThresholdForiPhone: jest.fn(),
  setShakingThresholdForiPad: jest.fn(),
  setShakingThresholdForAndroid: jest.fn(),
  setExtendedBugReportMode: jest.fn(),
  setReportTypes: jest.fn(),
  show: jest.fn(),
  setOnInvokeHandler: jest.fn(),
  setOnDismissHandler: jest.fn(),
  setAutoScreenRecordingEnabled: jest.fn(),
  setAutoScreenRecordingDuration: jest.fn(),
  setViewHierarchyEnabled: jest.fn(),
  setEnabledAttachmentTypes: jest.fn(),
  setDidSelectPromptOptionHandler: jest.fn(),
  setVideoRecordingFloatingButtonPosition: jest.fn(),
  setDisclaimerText: jest.fn(),
  setCommentMinimumCharacterCount: jest.fn(),
};

export default mockBugReporting;
