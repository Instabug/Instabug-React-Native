jest.mock('../../src/utils/XhrNetworkInterceptor', () => {
    return {
        setOnDoneCallback: jest.fn(),
        setOnProgressCallback: jest.fn(),
        enableInterception: jest.fn(),
        disableInterception: jest.fn()
    }
});