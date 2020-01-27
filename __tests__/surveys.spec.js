/**
 * @format
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import "react-native";
import { NativeModules } from "react-native";
import "../jest/mockSurveys";
import Surveys from "../modules/Surveys";
import sinon from "sinon";

import IBGConstants from "../utils/InstabugConstants";
import IBGEventEmitter from "../utils/IBGEventEmitter";

describe("Surveys Module", () => {
  const setSurveysEnabled = sinon.spy(NativeModules.IBGSurveys, "setEnabled");
  const setAppStoreURL = sinon.spy(NativeModules.IBGSurveys, "setAppStoreURL");
  const showSurveysIfAvailable = sinon.spy(
    NativeModules.IBGSurveys,
    "showSurveysIfAvailable"
  );
  const setThresholdForReshowingSurveyAfterDismiss = sinon.spy(
    NativeModules.IBGSurveys,
    "setThresholdForReshowingSurveyAfterDismiss"
  );
  const getAvailableSurveys = sinon.spy(
    NativeModules.IBGSurveys,
    "getAvailableSurveys"
  );
  const setAutoShowingSurveysEnabled = sinon.spy(
    NativeModules.IBGSurveys,
    "setAutoShowingEnabled"
  );
  const setWillShowSurveyHandler = sinon.spy(
    NativeModules.IBGSurveys,
    "setOnShowHandler"
  );
  const setDidDismissSurveyHandler = sinon.spy(
    NativeModules.IBGSurveys,
    "setOnDismissHandler"
  );
  const showSurveyWithToken = sinon.spy(NativeModules.IBGSurveys, "showSurvey");
  const hasRespondedToSurveyWithToken = sinon.spy(
    NativeModules.IBGSurveys,
    "hasRespondedToSurvey"
  );
  const setShouldShowSurveysWelcomeScreen = sinon.spy(
    NativeModules.IBGSurveys,
    "setShouldShowWelcomeScreen"
  );

  beforeEach(() => {
    setWillShowSurveyHandler.resetHistory();
    setDidDismissSurveyHandler.resetHistory();
    IBGEventEmitter.removeAllListeners();
  });

  it("should call the native method setSurveysEnabled", () => {
    Surveys.setEnabled(true);

    expect(setSurveysEnabled.calledOnceWithExactly(true)).toBe(true);
  });

  it("should call the native method setAppStoreURL", () => {
    Surveys.setAppStoreURL("URL");

    expect(setAppStoreURL.calledOnceWithExactly("URL")).toBe(true);
  });

  it("should call the native method showSurveysIfAvailable", () => {
    Surveys.showSurveyIfAvailable();

    expect(showSurveysIfAvailable.calledOnce).toBe(true);
  });

  it("should call the native method setThresholdForReshowingSurveyAfterDismiss", () => {
    const sessionCount = 2;
    const daysCount = 3;
    Surveys.setThresholdForReshowingSurveyAfterDismiss(sessionCount, daysCount);

    expect(
      setThresholdForReshowingSurveyAfterDismiss.calledOnceWithExactly(
        sessionCount,
        daysCount
      )
    ).toBe(true);
  });

  it("should call the native method getAvailableSurveys", () => {
    const callback = jest.fn();
    Surveys.getAvailableSurveys(callback);

    expect(getAvailableSurveys.calledOnceWithExactly(callback)).toBe(true);
  });

  it("should call the native method setAutoShowingSurveysEnabled", () => {
    Surveys.setAutoShowingEnabled(true);

    expect(setAutoShowingSurveysEnabled.calledOnceWithExactly(true)).toBe(true);
  });

  it("should call the native method setWillShowSurveyHandler with a function", () => {
    const callback = jest.fn();
    Surveys.setOnShowHandler(callback);

    expect(setWillShowSurveyHandler.calledOnceWithExactly(callback)).toBe(true);
  });

  it("should invoke callback on emitting the event IBGWillShowSurvey", () => {
    const callback = jest.fn();
    Surveys.setOnShowHandler(callback);
    IBGEventEmitter.emit(IBGConstants.WILL_SHOW_SURVEY_HANDLER);

    expect(
      IBGEventEmitter.getListeners(IBGConstants.WILL_SHOW_SURVEY_HANDLER).length
    ).toEqual(1);
    expect(callback).toHaveBeenCalled();
  });

  it("should call the native method setDidDismissSurveyHandler with a function", () => {
    const callback = jest.fn();
    Surveys.setOnDismissHandler(callback);

    expect(setDidDismissSurveyHandler.calledOnceWithExactly(callback)).toBe(
      true
    );
  });

  it("should invoke callback on emitting the event IBGDidDismissSurvey", () => {
    const callback = jest.fn();
    Surveys.setOnDismissHandler(callback);
    IBGEventEmitter.emit(IBGConstants.DID_DISMISS_SURVEY_HANDLER);

    expect(
      IBGEventEmitter.getListeners(IBGConstants.DID_DISMISS_SURVEY_HANDLER)
        .length
    ).toEqual(1);
    expect(callback).toHaveBeenCalled();
  });

  it("should call the native method showSurveyWithToken", () => {
    const surveyToken = "HEU128JD";
    Surveys.showSurvey(surveyToken);

    expect(showSurveyWithToken.calledOnceWithExactly(surveyToken)).toBe(true);
  });

  it("should call the native method hasRespondedToSurveyWithToken", done => {
    const callback = hasResponded => {
      expect(hasResponded).toBe(true);
      done();
    };
    const surveyToken = "HEU128JD";
    Surveys.hasRespondedToSurvey(surveyToken, callback);

    expect(
      hasRespondedToSurveyWithToken.calledOnceWithExactly(surveyToken, callback)
    ).toBe(true);
  });

  it("should call the native method setShouldShowSurveysWelcomeScreen", () => {
    Surveys.setShouldShowWelcomeScreen(true);

    expect(setShouldShowSurveysWelcomeScreen.calledOnceWithExactly(true)).toBe(
      true
    );
  });
});
