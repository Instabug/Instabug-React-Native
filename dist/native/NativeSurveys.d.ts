import { NativeEventEmitter, NativeModule } from 'react-native';
export interface Survey {
    title: string;
}
export interface SurveysNativeModule extends NativeModule {
    setEnabled(isEnabled: boolean): void;
    setAutoShowingEnabled(autoShowingSurveysEnabled: boolean): void;
    showSurvey(surveyToken: string): void;
    showSurveysIfAvailable(): void;
    getAvailableSurveys(): Promise<Survey[]>;
    hasRespondedToSurvey(surveyToken: string): Promise<boolean>;
    switchTheUpdatingThread(): void;
    setShouldShowWelcomeScreen(shouldShowWelcomeScreen: boolean): void;
    setAppStoreURL(appStoreURL: string): void;
    setOnShowHandler(onShowHandler: () => void): void;
    setOnDismissHandler(onDismissHandler: () => void): void;
}
export declare const NativeSurveys: SurveysNativeModule;
export declare enum NativeEvents {
    WILL_SHOW_SURVEY_HANDLER = "IBGWillShowSurvey",
    DID_DISMISS_SURVEY_HANDLER = "IBGDidDismissSurvey"
}
export declare const emitter: NativeEventEmitter;
