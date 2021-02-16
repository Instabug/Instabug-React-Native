jest.mock("NativeModules", () => {
  return {
    IBGAPM: {
      setEnabled: jest.fn(),
      setAppLaunchEnabled: jest.fn(),
      setAutoUITraceEnabled: jest.fn(),
      setLogLevel: jest.fn(),
      startExecutionTrace: jest.fn(),
      setExecutionTraceAttribute: jest.fn(),
      endExecutionTrace: jest.fn(),
      startUITrace: jest.fn(),
      endUITrace: jest.fn(),
    },
    Instabug: {},
  };
});
