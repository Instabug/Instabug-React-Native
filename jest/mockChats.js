jest.mock('NativeModules', () => {
    return {
      Instabug: {
        setChatsEnabled: jest.fn(),
        showChats: jest.fn()
      },
    };
  });