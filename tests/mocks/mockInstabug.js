export default {
  Instabug: {
    start: jest.fn(),
    setUserData: jest.fn(),
    setTrackUserSteps: jest.fn(),
    setIBGLogPrintsToConsole: jest.fn(),
    didSelectPromptOptionHandler: jest.fn(),
    setSessionProfilerEnabled: jest.fn(),
    setLocale: jest.fn(),
    setColorTheme: jest.fn(),
    setPrimaryColor: jest.fn(),
    appendTags: jest.fn(),
    resetTags: jest.fn(),
    getTags: jest.fn(cb => cb(['tags1', 'tags2'])),
    setString: jest.fn(),
    identifyUser: jest.fn(),
    logOut: jest.fn(),
    logUserEvent: jest.fn(),
    log: jest.fn(),
    logVerbose: jest.fn(),
    logInfo: jest.fn(),
    logWarn: jest.fn(),
    logError: jest.fn(),
    logDebug: jest.fn(),
    clearLogs: jest.fn(),
    setReproStepsMode: jest.fn(),
    setSdkDebugLogsLevel: jest.fn(),
    setUserAttribute: jest.fn(),
    getUserAttribute: jest.fn((_, cb) => cb('24')),
    removeUserAttribute: jest.fn(),
    getAllUserAttributes: jest.fn(cb => cb([{ age: '24' }])),
    clearAllUserAttributes: jest.fn(),
    setDebugEnabled: jest.fn(),
    enable: jest.fn(),
    disable: jest.fn(),
    isRunningLive: jest.fn(cb => cb(true)),
    showWelcomeMessageWithMode: jest.fn(),
    setWelcomeMessageMode: jest.fn(),
    setFileAttachment: jest.fn(),
    addPrivateView: jest.fn(),
    removePrivateView: jest.fn(),
    show: jest.fn(),
    setPreSendingHandler: jest.fn(),
    callPrivateApi: jest.fn(),
    addListener: jest.fn(),
    getReport: jest.fn(),
    setCrashReportingEnabled: jest.fn(),
    sendHandledJSCrash: jest.fn(),
    sendJSCrash: jest.fn(),
    reportScreenChange: jest.fn(),
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
  },
};
