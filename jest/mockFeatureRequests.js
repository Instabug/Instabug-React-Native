jest.mock('NativeModules', () => {
    return {
      IBGFeatureRequests: {
        setEmailFieldRequiredForFeatureRequests: jest.fn(),
        show: jest.fn(),
        setEnabled: jest.fn()
      },
      Instabug: {}
    };
  });