jest.mock('NativeModules', () => {
    return {
      Instabug: {
        setEmailFieldRequiredForFeatureRequests: jest.fn(),
        showFeatureRequests: jest.fn()
      },
    };
  });