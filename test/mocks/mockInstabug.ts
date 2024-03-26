import type { InstabugNativeModule } from '../../src/native/NativeInstabug';

/**
 * A fake implementation of the NativeConstants object using `Proxy` that
 * returns the name of the property as its value instead of hardcoding all
 * the constants.
 */
const fakeNativeConstants = new Proxy({}, { get: (_, prop) => prop });

const mockInstabug: InstabugNativeModule = {
  getConstants: jest.fn().mockReturnValue(fakeNativeConstants),
  addListener: jest.fn(),
  removeListeners: jest.fn(),
  setEnabled: jest.fn(),
  init: jest.fn(),
  setUserData: jest.fn(),
  setTrackUserSteps: jest.fn(),
  setIBGLogPrintsToConsole: jest.fn(),
  setSessionProfilerEnabled: jest.fn(),
  setLocale: jest.fn(),
  setColorTheme: jest.fn(),
  setPrimaryColor: jest.fn(),
  appendTags: jest.fn(),
  resetTags: jest.fn(),
  getTags: jest.fn(),
  setString: jest.fn(),
  identifyUser: jest.fn(),
  logOut: jest.fn(),
  logUserEvent: jest.fn(),
  logVerbose: jest.fn(),
  logInfo: jest.fn(),
  logWarn: jest.fn(),
  logError: jest.fn(),
  logDebug: jest.fn(),
  clearLogs: jest.fn(),
  setReproStepsConfig: jest.fn(),
  setUserAttribute: jest.fn(),
  getUserAttribute: jest.fn(),
  removeUserAttribute: jest.fn(),
  getAllUserAttributes: jest.fn(),
  clearAllUserAttributes: jest.fn(),
  showWelcomeMessageWithMode: jest.fn(),
  setWelcomeMessageMode: jest.fn(),
  setFileAttachment: jest.fn(),
  addPrivateView: jest.fn(),
  removePrivateView: jest.fn(),
  show: jest.fn(),
  setPreSendingHandler: jest.fn(),
  reportScreenChange: jest.fn(),
  reportCurrentViewChange: jest.fn(),
  addExperiments: jest.fn(),
  removeExperiments: jest.fn(),
  clearAllExperiments: jest.fn(),
  networkLog: jest.fn(),
  appendTagToReport: jest.fn(),
  appendConsoleLogToReport: jest.fn(),
  setUserAttributeToReport: jest.fn(),
  logDebugToReport: jest.fn(),
  logVerboseToReport: jest.fn(),
  logWarnToReport: jest.fn(),
  logErrorToReport: jest.fn(),
  logInfoToReport: jest.fn(),
  addFileAttachmentWithURLToReport: jest.fn(),
  addFileAttachmentWithDataToReport: jest.fn(),
  setNetworkLoggingEnabled: jest.fn(),
  setOnNetworkDiagnosticsHandler: jest.fn(),
};

export default mockInstabug;
