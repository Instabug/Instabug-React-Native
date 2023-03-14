import { NativeEventEmitter, NativeModule } from 'react-native';

import { NativeModules } from './NativePackage';

export interface Survey {
  title: string;
}

export interface SurveysNativeModule extends NativeModule {
  // Essential APIs //
  setEnabled(isEnabled: boolean): void;
  setAutoShowingEnabled(autoShowingSurveysEnabled: boolean): void;
  showSurvey(surveyToken: string): void;
  showSurveysIfAvailable(): void;
  getAvailableSurveys(): Promise<Survey[] | null>;
  hasRespondedToSurvey(surveyToken: string): Promise<boolean | null>;

  // Misc APIs //
  setShouldShowWelcomeScreen(shouldShowWelcomeScreen: boolean): void;
  setAppStoreURL(appStoreURL: string): void;

  // Callbacks //
  setOnShowHandler(onShowHandler: () => void): void;
  setOnDismissHandler(onDismissHandler: () => void): void;
}

export const NativeSurveys = NativeModules.IBGSurveys;

export enum NativeEvents {
  WILL_SHOW_SURVEY_HANDLER = 'IBGWillShowSurvey',
  DID_DISMISS_SURVEY_HANDLER = 'IBGDidDismissSurvey',
}

export const emitter = new NativeEventEmitter(NativeSurveys);
