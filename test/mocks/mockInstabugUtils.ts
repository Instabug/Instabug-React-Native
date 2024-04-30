jest.mock('../../src/utils/InstabugUtils', () => {
  const actual = jest.requireActual('../../src/utils/InstabugUtils');

  return {
    ...actual,
    parseErrorStack: jest.fn(),
    captureJsErrors: jest.fn(),
    getActiveRouteName: jest.fn(),
    stringifyIfNotString: jest.fn(),
    sendCrashReport: jest.fn(),
    getStackTrace: jest.fn().mockReturnValue('javascriptStackTrace'),
    getFullRoute: jest.fn().mockImplementation(() => 'ScreenName'),
  };
});
