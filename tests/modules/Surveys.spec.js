/**
 * @format
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import 'react-native';
import { NativeModules } from 'react-native';
import '../mocks/mockSurveys';
import Surveys from '../../src/modules/Surveys';

import IBGConstants from '../../src/utils/InstabugConstants';
import IBGEventEmitter from '../../src/utils/IBGEventEmitter';

const { IBGSurveys: NativeIBGSurveys } = NativeModules;

describe('Surveys Module', () => {
  beforeEach(() => {
    IBGEventEmitter.removeAllListeners();
  });

  it('should call the native method setSurveysEnabled', () => {
    Surveys.setEnabled(true);

    expect(NativeIBGSurveys.setEnabled).toBeCalledTimes(1);
    expect(NativeIBGSurveys.setEnabled).toBeCalledWith(true);
  });

  it('should call the native method setAppStoreURL', () => {
    Surveys.setAppStoreURL('URL');

    expect(NativeIBGSurveys.setAppStoreURL).toBeCalledTimes(1);
    expect(NativeIBGSurveys.setAppStoreURL).toBeCalledWith('URL');
  });

  it('should call the native method showSurveysIfAvailable', () => {
    Surveys.showSurveyIfAvailable();

    expect(NativeIBGSurveys.showSurveysIfAvailable).toBeCalledTimes(1);
  });

  it('should call the native method getAvailableSurveys', () => {
    const callback = jest.fn();
    Surveys.getAvailableSurveys(callback);

    expect(NativeIBGSurveys.getAvailableSurveys).toBeCalledTimes(1);
    expect(NativeIBGSurveys.getAvailableSurveys).toBeCalledWith(callback);
  });

  it('should call the native method setAutoShowingSurveysEnabled', () => {
    Surveys.setAutoShowingEnabled(true);

    expect(NativeIBGSurveys.setAutoShowingEnabled).toBeCalledTimes(1);
    expect(NativeIBGSurveys.setAutoShowingEnabled).toBeCalledWith(true);
  });

  it('should call the native method setWillShowSurveyHandler with a function', () => {
    const callback = jest.fn();
    Surveys.setOnShowHandler(callback);

    expect(NativeIBGSurveys.setOnShowHandler).toBeCalledTimes(1);
    expect(NativeIBGSurveys.setOnShowHandler).toBeCalledWith(callback);
  });

  it('should invoke callback on emitting the event IBGWillShowSurvey', () => {
    const callback = jest.fn();
    Surveys.setOnShowHandler(callback);
    IBGEventEmitter.emit(IBGConstants.WILL_SHOW_SURVEY_HANDLER);

    expect(IBGEventEmitter.getListeners(IBGConstants.WILL_SHOW_SURVEY_HANDLER).length).toEqual(1);
    expect(callback).toHaveBeenCalled();
  });

  it('should call the native method setDidDismissSurveyHandler with a function', () => {
    const callback = jest.fn();
    Surveys.setOnDismissHandler(callback);

    expect(NativeIBGSurveys.setOnDismissHandler).toBeCalledTimes(1);
    expect(NativeIBGSurveys.setOnDismissHandler).toBeCalledWith(callback);
  });

  it('should invoke callback on emitting the event IBGDidDismissSurvey', () => {
    const callback = jest.fn();
    Surveys.setOnDismissHandler(callback);
    IBGEventEmitter.emit(IBGConstants.DID_DISMISS_SURVEY_HANDLER);

    expect(IBGEventEmitter.getListeners(IBGConstants.DID_DISMISS_SURVEY_HANDLER).length).toEqual(1);
    expect(callback).toHaveBeenCalled();
  });

  it('should call the native method showSurveyWithToken', () => {
    const surveyToken = 'HEU128JD';
    Surveys.showSurvey(surveyToken);

    expect(NativeIBGSurveys.showSurvey).toBeCalledTimes(1);
    expect(NativeIBGSurveys.showSurvey).toBeCalledWith(surveyToken);
  });

  it('should call the native method hasRespondedToSurveyWithToken', () => {
    const callback = jest.fn();
    const surveyToken = 'HEU128JD';
    Surveys.hasRespondedToSurvey(surveyToken, callback);

    expect(NativeIBGSurveys.hasRespondedToSurvey).toBeCalledTimes(1);
    expect(NativeIBGSurveys.hasRespondedToSurvey).toBeCalledWith(surveyToken, callback);
    expect(callback).toBeCalledWith(true);
  });

  it('should call the native method setShouldShowSurveysWelcomeScreen', () => {
    Surveys.setShouldShowWelcomeScreen(true);

    expect(NativeIBGSurveys.setShouldShowWelcomeScreen).toBeCalledTimes(1);
    expect(NativeIBGSurveys.setShouldShowWelcomeScreen).toBeCalledWith(true);
  });
});
