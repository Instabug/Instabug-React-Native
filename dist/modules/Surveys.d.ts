import type { Survey } from '../native/NativeSurveys';
export type { Survey };
/**
 * Sets whether surveys are enabled or not.
 * If you disable surveys on the SDK but still have active surveys on your Instabug dashboard,
 * those surveys are still going to be sent to the device, but are not going to be
 * shown automatically.
 * To manually display any available surveys, call `Instabug.showSurveyIfAvailable()`.
 * Defaults to `true`.
 * @param isEnabled A boolean to set whether Instabug Surveys is enabled or disabled.
 */
export declare const setEnabled: (isEnabled: boolean) => void;
/**
 * Shows one of the surveys that were not shown before, that also have conditions
 * that match the current device/user.
 * Does nothing if there are no available surveys or if a survey has already been shown
 * in the current session.
 */
export declare const showSurveyIfAvailable: () => void;
/**
 * Returns an array containing the available surveys.
 * @param callback DEPRECATED: callback with argument available surveys
 */
export declare const getAvailableSurveys: (callback?: ((surveys: Survey[]) => void) | undefined) => Promise<Survey[] | null>;
/**
 * Sets whether auto surveys showing are enabled or not.
 * @param autoShowingSurveysEnabled A boolean to indicate whether the
 *                                surveys auto showing are enabled or not.
 */
export declare const setAutoShowingEnabled: (autoShowingSurveysEnabled: boolean) => void;
/**
 * Sets a block of code to be executed just before the survey's UI is presented.
 * This block is executed on the UI thread. Could be used for performing any UI changes before
 * the survey's UI is shown.
 * @param onShowHandler - A block of code that gets executed before
 * presenting the survey's UI.
 */
export declare const setOnShowHandler: (onShowHandler: () => void) => void;
/**
 * Sets a block of code to be executed right after the survey's UI is dismissed.
 * This block is executed on the UI thread. Could be used for performing any UI
 * changes after the survey's UI is dismissed.
 * @param onDismissHandler - A block of code that gets executed after
 * the survey's UI is dismissed.
 */
export declare const setOnDismissHandler: (onDismissHandler: () => void) => void;
/**
 * Shows survey with a specific token.
 * Does nothing if there are no available surveys with that specific token.
 * Answered and cancelled surveys won't show up again.
 * @param surveyToken - A String with a survey token.
 *
 */
export declare const showSurvey: (surveyToken: string) => void;
/**
 * Returns true if the survey with a specific token was answered before.
 * Will return false if the token does not exist or if the survey was not answered before.
 * @param surveyToken - A String with a survey token.
 * @param callback DEPRECATED: callback with argument as the desired value of the whether
 * the survey has been responded to or not.
 *
 */
export declare const hasRespondedToSurvey: (surveyToken: string, callback?: ((hasResponded: boolean) => void) | undefined) => Promise<boolean | null>;
/**
 * Setting an option for all the surveys to show a welcome screen before
 * the user starts taking the survey.
 * @param shouldShowWelcomeScreen A boolean for setting whether the
 *                                welcome screen should show.
 */
export declare const setShouldShowWelcomeScreen: (shouldShowWelcomeScreen: boolean) => void;
/**
 * iOS Only
 * Sets url for the published iOS app on AppStore, You can redirect
 * NPS Surveys or AppRating Surveys to AppStore to let users rate your app on AppStore itself.
 * @param appStoreURL A String url for the published iOS app on AppStore
 */
export declare const setAppStoreURL: (appStoreURL: string) => void;
