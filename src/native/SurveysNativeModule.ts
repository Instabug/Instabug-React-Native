import type { NativeModule } from 'react-native';

export interface Survey {
  title: string;
}

export interface SurveysNativeModule extends NativeModule {
  // Essential APIs //
  setEnabled(isEnabled: boolean): void;
  setAutoShowingEnabled(autoShowingSurveysEnabled: boolean): void;
  showSurvey(surveyToken: string): void;
  showSurveysIfAvailable(): void;
  getAvailableSurveys(availableSurveysCallback: (surveys: Survey[]) => void): void;
  hasRespondedToSurvey(
    surveyToken: string,
    surveyTokenCallback: (hasResponded: boolean) => void,
  ): void;

  // Misc APIs //
  setShouldShowWelcomeScreen(shouldShowWelcomeScreen: boolean): void;
  setAppStoreURL(appStoreURL: string): void;

  // Callbacks //
  setOnShowHandler(onShowHandler: () => void): void;
  setOnDismissHandler(onDismissHandler: () => void): void;
}
