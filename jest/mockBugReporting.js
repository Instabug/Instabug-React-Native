jest.mock('NativeModules', () => {
    return {
      Instabug: {
          setBugReportingEnabled: jest.fn(),
          setInvocationEvents: jest.fn(),
          setInvocationOptions: jest.fn(),
          setShakingThresholdForiPhone: jest.fn(),
          setShakingThresholdForiPad: jest.fn(),
          setShakingThresholdForAndroid: jest.fn(),
          setExtendedBugReportMode: jest.fn(),
          setReportTypes: jest.fn(),
          showBugReportingWithReportTypeAndOptions: jest.fn(),
          setPreInvocationHandler: jest.fn(),
          addListener: jest.fn(),
          setPostInvocationHandler: jest.fn()
      },
    };
  });