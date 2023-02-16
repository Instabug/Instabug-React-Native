jest.mock('../../src/utils/InstabugUtils', () => {
  return {
    parseErrorStack: jest.fn(),
    captureJsErrors: jest.fn(),
    getActiveRouteName: jest.fn(),
    stringifyIfNotString: jest.fn(),
    getStackTrace: jest.fn().mockReturnValue('javascriptStackTrace'),
    getFullRoute: jest.fn().mockImplementation(() => 'ScreenName'),
  };
});
