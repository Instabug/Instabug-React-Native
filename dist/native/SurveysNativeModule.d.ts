import type { NativeModule } from 'react-native';
export interface Survey {
    title: string;
}
export interface SurveysNativeModule extends NativeModule {
    setEnabled(isEnabled: boolean): void;
    setAutoShowingEnabled(autoShowingSurveysEnabled: boolean): void;
    showSurvey(surveyToken: string): void;
    showSurveysIfAvailable(): void;
    getAvailableSurveys(availableSurveysCallback: (surveys: Survey[]) => void): void;
    hasRespondedToSurvey(surveyToken: string, surveyTokenCallback: (hasResponded: boolean) => void): void;
    setShouldShowWelcomeScreen(shouldShowWelcomeScreen: boolean): void;
    setAppStoreURL(appStoreURL: string): void;
    setOnShowHandler(onShowHandler: () => void): void;
    setOnDismissHandler(onDismissHandler: () => void): void;
}
