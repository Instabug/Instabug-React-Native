export default {
  IBGSurveys: {
    setEnabled: jest.fn(),
    setAppStoreURL: jest.fn(),
    showSurveysIfAvailable: jest.fn(),
    getAvailableSurveys: jest.fn(),
    setAutoShowingEnabled: jest.fn(),
    setOnShowHandler: jest.fn(),
    setOnDismissHandler: jest.fn(),
    showSurvey: jest.fn(),
    hasRespondedToSurvey: jest.fn((_, cb) => cb(true)),
    setShouldShowWelcomeScreen: jest.fn(),
    addListener: jest.fn(),
  },
};
