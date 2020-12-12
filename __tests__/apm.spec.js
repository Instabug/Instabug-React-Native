/**
 * @format
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import "react-native";
import { NativeModules } from "react-native";
import "../jest/mockAPM";
import APM from "../modules/APM";
import sinon from "sinon";

import IBGConstants from "../utils/InstabugConstants";
import IBGEventEmitter from "../utils/IBGEventEmitter";

describe("APM Module", () => {
  const setEnabled = sinon.spy(NativeModules.IBGAPM, "setEnabled");
  const setAppLaunchEnabled = sinon.spy(NativeModules.IBGAPM, "setAppLaunchEnabled");
  const setLogLevel = sinon.spy(NativeModules.IBGAPM, "setLogLevel");
  const setAutoUITraceEnabled = sinon.spy(NativeModules.IBGAPM, "setAutoUITraceEnabled");
  const startExecutionTrace = sinon.spy(NativeModules.IBGAPM, "startExecutionTrace");
  const setExecutionTraceAttribute = sinon.spy(NativeModules.IBGAPM, "setExecutionTraceAttribute");
  const endExecutionTrace = sinon.spy(NativeModules.IBGAPM, "endExecutionTrace");
  const startUITrace = sinon.spy(NativeModules.IBGAPM, "startUITrace");
  const endUITrace = sinon.spy(NativeModules.IBGAPM, "endUITrace");

  beforeEach(() => {
    // setWillShowSurveyHandler.resetHistory();
    // setDidDismissSurveyHandler.resetHistory();
    IBGEventEmitter.removeAllListeners();
  });

  it("should call the native method setEnabled", () => {
    APM.setEnabled(true);

    expect(setEnabled.calledOnceWithExactly(true)).toBe(true);
  });

  it("should call the native method setAppLaunchEnabled", () => {
    APM.setAppLaunchEnabled(true);

    expect(setAppLaunchEnabled.calledOnceWithExactly(true)).toBe(true);
  });

  it("should call the native method setAutoUITraceEnabled", () => {
    APM.setAutoUITraceEnabled(true);

    expect(setAutoUITraceEnabled.calledOnceWithExactly(true)).toBe(true);
  });

  it("should call the native method setLogLevel", () => {
    APM.setLogLevel(APM.logLevel.verbose);

    expect(setLogLevel.calledOnceWithExactly(APM.logLevel.verbose)).toBe(true);
  });
  
  it("should call the native method startExecutionTrace", () => {
    APM.startExecutionTrace("trace");
    
    expect(startExecutionTrace.calledOnceWith("trace")).toBe(true);
  });
    
  it("should call the native method setExecutionTraceAttribute", () => {
    const trace = APM.startExecutionTrace("trace").then(() => {
      trace.setAttribute("key", "value");
      expect(setExecutionTraceAttribute.calledOnceWithExactly(expect.any(String), "key", "value")).toBe(true);
    });
  });
    
  it("should call the native method endExecutionTrace", () => {
    const trace = APM.startExecutionTrace("trace").then(() => {
      trace.end();
      expect(endExecutionTrace.calledOnceWithExactly(expect.any(String))).toBe(true);
    });
  });
    
  it("should call the native method startUITrace", () => {
    APM.startUITrace("uiTrace");

    expect(startUITrace.calledOnceWithExactly("uiTrace")).toBe(true);
  });

  it("should call the native method endUITrace", () => {
    APM.endUITrace();

    expect(endUITrace.calledOnceWithExactly()).toBe(true);
  });
    
  // it("should call the native method setAppStoreURL", () => {
  //   Surveys.setAppStoreURL("URL");

  //   expect(setAppStoreURL.calledOnceWithExactly("URL")).toBe(true);
  // });

  // it("should call the native method showSurveysIfAvailable", () => {
  //   Surveys.showSurveyIfAvailable();

  //   expect(showSurveysIfAvailable.calledOnce).toBe(true);
  // });

  // it("should call the native method setThresholdForReshowingSurveyAfterDismiss", () => {
  //   const sessionCount = 2;
  //   const daysCount = 3;
  //   Surveys.setThresholdForReshowingSurveyAfterDismiss(sessionCount, daysCount);

  //   expect(
  //     setThresholdForReshowingSurveyAfterDismiss.calledOnceWithExactly(
  //       sessionCount,
  //       daysCount
  //     )
  //   ).toBe(true);
  // });

  // it("should call the native method getAvailableSurveys", () => {
  //   const callback = jest.fn();
  //   Surveys.getAvailableSurveys(callback);

  //   expect(getAvailableSurveys.calledOnceWithExactly(callback)).toBe(true);
  // });

  // it("should call the native method setAutoShowingSurveysEnabled", () => {
  //   Surveys.setAutoShowingEnabled(true);

  //   expect(setAutoShowingSurveysEnabled.calledOnceWithExactly(true)).toBe(true);
  // });

  // it("should call the native method setWillShowSurveyHandler with a function", () => {
  //   const callback = jest.fn();
  //   Surveys.setOnShowHandler(callback);

  //   expect(setWillShowSurveyHandler.calledOnceWithExactly(callback)).toBe(true);
  // });

  // it("should invoke callback on emitting the event IBGWillShowSurvey", () => {
  //   const callback = jest.fn();
  //   Surveys.setOnShowHandler(callback);
  //   IBGEventEmitter.emit(IBGConstants.WILL_SHOW_SURVEY_HANDLER);

  //   expect(
  //     IBGEventEmitter.getListeners(IBGConstants.WILL_SHOW_SURVEY_HANDLER).length
  //   ).toEqual(1);
  //   expect(callback).toHaveBeenCalled();
  // });

  // it("should call the native method setDidDismissSurveyHandler with a function", () => {
  //   const callback = jest.fn();
  //   Surveys.setOnDismissHandler(callback);

  //   expect(setDidDismissSurveyHandler.calledOnceWithExactly(callback)).toBe(
  //     true
  //   );
  // });

  // it("should invoke callback on emitting the event IBGDidDismissSurvey", () => {
  //   const callback = jest.fn();
  //   Surveys.setOnDismissHandler(callback);
  //   IBGEventEmitter.emit(IBGConstants.DID_DISMISS_SURVEY_HANDLER);

  //   expect(
  //     IBGEventEmitter.getListeners(IBGConstants.DID_DISMISS_SURVEY_HANDLER)
  //       .length
  //   ).toEqual(1);
  //   expect(callback).toHaveBeenCalled();
  // });

  // it("should call the native method showSurveyWithToken", () => {
  //   const surveyToken = "HEU128JD";
  //   Surveys.showSurvey(surveyToken);

  //   expect(showSurveyWithToken.calledOnceWithExactly(surveyToken)).toBe(true);
  // });

  // it("should call the native method hasRespondedToSurveyWithToken", done => {
  //   const callback = hasResponded => {
  //     expect(hasResponded).toBe(true);
  //     done();
  //   };
  //   const surveyToken = "HEU128JD";
  //   Surveys.hasRespondedToSurvey(surveyToken, callback);

  //   expect(
  //     hasRespondedToSurveyWithToken.calledOnceWithExactly(surveyToken, callback)
  //   ).toBe(true);
  // });

  // it("should call the native method setShouldShowSurveysWelcomeScreen", () => {
  //   Surveys.setShouldShowWelcomeScreen(true);

  //   expect(setShouldShowSurveysWelcomeScreen.calledOnceWithExactly(true)).toBe(
  //     true
  //   );
  // });
});
