jest.mock('react-native/Libraries/Core/Devtools/parseErrorStack', () => {
  const { Platform } = jest.requireActual('react-native');

  // This mock's goal is to provide a parseErrorStack function that adapts to the mock React Native version
  // This mock should work as long as the tests run with React Native version < 0.64
  return jest.fn((error) => {
    const originalParseErrorStack = jest.requireActual(
      'react-native/Libraries/Core/Devtools/parseErrorStack',
    );

    if (!Platform.hasOwnProperty('constants') || Platform.constants.reactNativeVersion.minor < 64) {
      return originalParseErrorStack(error.stack);
    }

    return originalParseErrorStack(error);
  });
});
