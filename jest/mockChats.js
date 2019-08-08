jest.mock('NativeModules', () => {
    return {
      IBGChats: {
        setEnabled: jest.fn(),
        show: jest.fn()
      },
    };
  });