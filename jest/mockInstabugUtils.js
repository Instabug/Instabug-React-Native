jest.mock('../utils/InstabugUtils', () => {
    return {
        parseErrorStack: jest.fn(),
        captureJsErrors: jest.fn()
    }
});