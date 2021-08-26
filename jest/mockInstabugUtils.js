jest.mock('../utils/InstabugUtils', () => {
    return {
        parseErrorStack: jest.fn(),
        captureJsErrors: jest.fn(),
        setOnReportHandler: jest.fn(),
        isOnReportHandlerSet: jest.fn(),
        getActiveRouteName: jest.fn(),
        getStackTrace: jest.fn(() => 'javascriptStackTrace')
    }
});