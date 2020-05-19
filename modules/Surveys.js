import { NativeModules, Platform } from "react-native";
import IBGEventEmitter from "../utils/IBGEventEmitter";
import InstabugConstants from "../utils/InstabugConstants";
let { IBGSurveys } = NativeModules;

/**
 * Surveys
 * @exports Surveys
 */
export default {
  /**
   * @summary Sets whether surveys are enabled or not.
   * If you disable surveys on the SDK but still have active surveys on your Instabug dashboard,
   * those surveys are still going to be sent to the device, but are not going to be
   * shown automatically.
   * To manually display any available surveys, call `Instabug.showSurveyIfAvailable()`.
   * Defaults to `true`.
   * @param {boolean} isEnabled A boolean to set whether Instabug Surveys is enabled or disabled.
   */
  setEnabled: function(isEnabled) {
    IBGSurveys.setEnabled(isEnabled);
  },

  /**
   * @summary Shows one of the surveys that were not shown before, that also have conditions
   * that match the current device/user.
   * Does nothing if there are no available surveys or if a survey has already been shown
   * in the current session.
   */
  showSurveyIfAvailable: function() {
    IBGSurveys.showSurveysIfAvailable();
  },

  /**
   * Sets a threshold for numbers of sessions and another for number of days
   * required before a survey, that has been dismissed once, would show again.
   * @param {number} sessionCount Number of sessions required to be
   *                initialized before a dismissed survey can be shown again.
   * @param {number} daysCount Number of days required to pass before a
   *                dismissed survey can be shown again.
   */
  setThresholdForReshowingSurveyAfterDismiss: function(
    sessionCount,
    daysCount
  ) {
    IBGSurveys.setThresholdForReshowingSurveyAfterDismiss(
      sessionCount,
      daysCount
    );
  },

  /**
   * Returns an array containing the available surveys.
   * @param {availableSurveysCallback} availableSurveysCallback callback with
   * argument available surveys
   *
   */
  getAvailableSurveys: function(availableSurveysCallback) {
    IBGSurveys.getAvailableSurveys(availableSurveysCallback);
  },

  /**
   * Sets whether auto surveys showing are enabled or not.
   * @param autoShowingSurveysEnabled A boolean to indicate whether the
   *                                surveys auto showing are enabled or not.
   *
   */
  setAutoShowingEnabled: function(autoShowingSurveysEnabled) {
    IBGSurveys.setAutoShowingEnabled(autoShowingSurveysEnabled);
  },

  /**
   * @deprecated use {@link Surveys.setOnShowHandler}
   * @summary Sets a block of code to be executed just before the survey's UI is presented.
   * This block is executed on the UI thread. Could be used for performing any UI changes before
   * the survey's UI is shown.
   * @param {function} willShowSurveyHandler - A block of code that gets executed before
   * presenting the survey's UI.
   */
  onShowCallback: function(willShowSurveyHandler) {
    this.setOnShowHandler(willShowSurveyHandler);
  },

  /**
   * @summary Sets a block of code to be executed just before the survey's UI is presented.
   * This block is executed on the UI thread. Could be used for performing any UI changes before
   * the survey's UI is shown.
   * @param {function} onShowHandler - A block of code that gets executed before
   * presenting the survey's UI.
   */
  setOnShowHandler: function(onShowHandler) {
    IBGEventEmitter.addListener(
      IBGSurveys,
      InstabugConstants.WILL_SHOW_SURVEY_HANDLER,
      onShowHandler
    );
    IBGSurveys.setOnShowHandler(onShowHandler);
  },

  /**
   * @deprecated use {@link Surveys.setOnDismissHandler}
   * @summary Sets a block of code to be executed right after the survey's UI is dismissed.
   * This block is executed on the UI thread. Could be used for performing any UI
   * changes after the survey's UI is dismissed.
   * @param {function} didDismissSurveyHandler - A block of code that gets executed after
   * the survey's UI is dismissed.
   */
  onDismissCallback: function(didDismissSurveyHandler) {
    this.setOnDismissHandler(didDismissSurveyHandler);
  },

  /**
   * @summary Sets a block of code to be executed right after the survey's UI is dismissed.
   * This block is executed on the UI thread. Could be used for performing any UI
   * changes after the survey's UI is dismissed.
   * @param {function} onDismissHandler - A block of code that gets executed after
   * the survey's UI is dismissed.
   */
  setOnDismissHandler: function(onDismissHandler) {
    IBGEventEmitter.addListener(
      IBGSurveys,
      InstabugConstants.DID_DISMISS_SURVEY_HANDLER,
      onDismissHandler
    );
    IBGSurveys.setOnDismissHandler(onDismissHandler);
  },

  /**
   * Shows survey with a specific token.
   * Does nothing if there are no available surveys with that specific token.
   * Answered and cancelled surveys won't show up again.
   * @param {string} surveyToken - A String with a survey token.
   *
   */
  showSurvey: function(surveyToken) {
    IBGSurveys.showSurvey(surveyToken);
  },

  /**
   * Returns true if the survey with a specific token was answered before.
   * Will return false if the token does not exist or if the survey was not answered before.
   * @param {string} surveyToken - A String with a survey token.
   * @param {function} surveyTokenCallback callback with argument as the desired value of the whether
   * the survey has been responded to or not.
   *
   */
  hasRespondedToSurvey: function(surveyToken, surveyTokenCallback) {
    IBGSurveys.hasRespondedToSurvey(surveyToken, surveyTokenCallback);
  },

  /**
   * Setting an option for all the surveys to show a welcome screen before
   * the user starts taking the survey.
   * @param shouldShowWelcomeScreen A boolean for setting whether the
   *                                welcome screen should show.
   *
   */
  setShouldShowWelcomeScreen: function(shouldShowWelcomeScreen) {
    IBGSurveys.setShouldShowWelcomeScreen(shouldShowWelcomeScreen);
  },

  /**
   * iOS Only
   * @summary Sets url for the published iOS app on AppStore, You can redirect
   * NPS Surveys or AppRating Surveys to AppStore to let users rate your app on AppStore itself.
   * @param {String} appStoreURL A String url for the published iOS app on AppStore
   */

  setAppStoreURL: function(appStoreURL) {
    if (Platform.OS === "ios") {
      IBGSurveys.setAppStoreURL(appStoreURL);
    }
  }
};
