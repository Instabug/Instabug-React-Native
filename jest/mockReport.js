jest.mock('NativeModules', () => {
    return {
      Instabug: {
        appendTagToReport: jest.fn(),
        appendConsoleLogToReport: jest.fn(),
        setUserAttributeToReport: jest.fn(),
        logDebugToReport: jest.fn(),
        logVerboseToReport: jest.fn(),
        logWarnToReport: jest.fn(),
        logErrorToReport: jest.fn(),
        logInfoToReport: jest.fn(),
        addFileAttachmentWithURLToReport: jest.fn(),
        addFileAttachmentWithDataToReport: jest.fn()
      },
    };
  });