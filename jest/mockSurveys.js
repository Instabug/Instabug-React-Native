jest.mock('NativeModules', () => {
    return {
        Instabug: {
            setSurveysEnabled: jest.fn(),
            showSurveysIfAvailable: jest.fn(),
            setThresholdForReshowingSurveyAfterDismiss: jest.fn(),
            getAvailableSurveys: jest.fn(),
            setAutoShowingSurveysEnabled: jest.fn(),
            setWillShowSurveyHandler: jest.fn(),
            setDidDismissSurveyHandler: jest.fn(),
            showSurveyWithToken: jest.fn(),
            hasRespondedToSurveyWithToken: jest.fn((_, cb) => cb(true)),
            setShouldShowSurveysWelcomeScreen: jest.fn(),
            addListener: jest.fn()
        },
    };
});