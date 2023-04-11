import { Platform } from 'react-native';

import { mocked } from 'ts-jest/utils';

import * as Surveys from '../../src/modules/Surveys';
import { NativeEvents, NativeSurveys, emitter } from '../../src/native/NativeSurveys';

describe('Surveys Module', () => {
  beforeEach(() => {
    const events = Object.values(NativeEvents);
    events.forEach((event) => {
      emitter.removeAllListeners(event);
    });
  });

  it('should call the native method setSurveysEnabled', () => {
    Surveys.setEnabled(true);

    expect(NativeSurveys.setEnabled).toBeCalledTimes(1);
    expect(NativeSurveys.setEnabled).toBeCalledWith(true);
  });

  it('should call the native method setAppStoreURL', () => {
    Platform.OS = 'ios';
    Surveys.setAppStoreURL('URL');

    expect(NativeSurveys.setAppStoreURL).toBeCalledTimes(1);
    expect(NativeSurveys.setAppStoreURL).toBeCalledWith('URL');
  });

  it('should not call the native method setAppStoreURL if platform is android', () => {
    Platform.OS = 'android';
    Surveys.setAppStoreURL('URL');

    expect(NativeSurveys.setAppStoreURL).not.toBeCalled();
  });

  it('should call the native method showSurveysIfAvailable', () => {
    Surveys.showSurveyIfAvailable();

    expect(NativeSurveys.showSurveysIfAvailable).toBeCalledTimes(1);
  });

  it('should call the native method getAvailableSurveys', async () => {
    const expected = [{ title: 'survey1' }, { title: 'survey2' }];

    mocked(NativeSurveys).getAvailableSurveys.mockResolvedValueOnce(expected);

    const actual = await Surveys.getAvailableSurveys();

    expect(actual).toBe(expected);
    expect(NativeSurveys.getAvailableSurveys).toBeCalledTimes(1);
  });

  it('should call the native method setAutoShowingSurveysEnabled', () => {
    Surveys.setAutoShowingEnabled(true);

    expect(NativeSurveys.setAutoShowingEnabled).toBeCalledTimes(1);
    expect(NativeSurveys.setAutoShowingEnabled).toBeCalledWith(true);
  });

  it('should call the native method setWillShowSurveyHandler with a function', () => {
    const callback = jest.fn();
    Surveys.setOnShowHandler(callback);

    expect(NativeSurveys.setOnShowHandler).toBeCalledTimes(1);
    expect(NativeSurveys.setOnShowHandler).toBeCalledWith(callback);
  });

  it('should invoke callback on emitting the event IBGWillShowSurvey', () => {
    const callback = jest.fn();
    Surveys.setOnShowHandler(callback);
    emitter.emit(NativeEvents.WILL_SHOW_SURVEY_HANDLER);

    expect(emitter.listenerCount(NativeEvents.WILL_SHOW_SURVEY_HANDLER)).toBe(1);
    expect(callback).toHaveBeenCalled();
  });

  it('should call the native method setDidDismissSurveyHandler with a function', () => {
    const callback = jest.fn();
    Surveys.setOnDismissHandler(callback);

    expect(NativeSurveys.setOnDismissHandler).toBeCalledTimes(1);
    expect(NativeSurveys.setOnDismissHandler).toBeCalledWith(callback);
  });

  it('should invoke callback on emitting the event IBGDidDismissSurvey', () => {
    const callback = jest.fn();
    Surveys.setOnDismissHandler(callback);
    emitter.emit(NativeEvents.DID_DISMISS_SURVEY_HANDLER);

    expect(emitter.listenerCount(NativeEvents.DID_DISMISS_SURVEY_HANDLER)).toBe(1);
    expect(callback).toHaveBeenCalled();
  });

  it('should call the native method showSurveyWithToken', () => {
    const surveyToken = 'HEU128JD';
    Surveys.showSurvey(surveyToken);

    expect(NativeSurveys.showSurvey).toBeCalledTimes(1);
    expect(NativeSurveys.showSurvey).toBeCalledWith(surveyToken);
  });

  it('should call the native method hasRespondedToSurveyWithToken', async () => {
    const surveyToken = 'HEU128JD';
    const expected = true;

    mocked(NativeSurveys).hasRespondedToSurvey.mockResolvedValueOnce(expected);

    const actual = await Surveys.hasRespondedToSurvey(surveyToken);

    expect(actual).toBe(expected);
    expect(NativeSurveys.hasRespondedToSurvey).toBeCalledTimes(1);
    expect(NativeSurveys.hasRespondedToSurvey).toBeCalledWith(surveyToken);
  });

  it('should call the native method setShouldShowSurveysWelcomeScreen', () => {
    Surveys.setShouldShowWelcomeScreen(true);

    expect(NativeSurveys.setShouldShowWelcomeScreen).toBeCalledTimes(1);
    expect(NativeSurveys.setShouldShowWelcomeScreen).toBeCalledWith(true);
  });
});
