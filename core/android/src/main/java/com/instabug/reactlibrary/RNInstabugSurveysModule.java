package com.instabug.reactlibrary;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.WritableArray;
import com.instabug.library.Feature;
import com.instabug.reactlibrary.utils.ArrayUtil;
import com.instabug.reactlibrary.utils.EventEmitterModule;
import com.instabug.reactlibrary.utils.InstabugUtil;
import com.instabug.reactlibrary.utils.MainThreadHandler;
import com.instabug.survey.callbacks.*;
import com.instabug.survey.Surveys;
import com.instabug.survey.Survey;

import org.json.JSONArray;

import java.util.List;

import javax.annotation.Nonnull;

public class RNInstabugSurveysModule extends EventEmitterModule {

    public RNInstabugSurveysModule(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @Nonnull
    @Override
    public String getName() {
        return "IBGSurveys";
    }

    @ReactMethod
    public void addListener(String event) {
        super.addListener(event);
    }

    @ReactMethod
    public void removeListeners(Integer count) {
        super.removeListeners(count);
    }

    /**
     * Returns true if the survey with a specific token was answered before.
     * Will return false if the token does not exist or if the survey was not answered before.
     *
     * @param surveyToken          the attribute key as string
     * @param promise A promise that gets resolved with the returned value of whether
     *                             the user has responded to the survey or not.
     * @return the desired value of whether the user has responded to the survey or not.
     */
    @ReactMethod
    public void hasRespondedToSurvey(final String surveyToken, final Promise promise) {
        MainThreadHandler.runOnMainThread(new Runnable() {
            @Override
            public void run() {
                boolean hasResponded = false;
                try {
                    hasResponded = Surveys.hasRespondToSurvey(surveyToken);
                } catch (Exception e) {
                    e.printStackTrace();
                }
                promise.resolve(hasResponded);
            }
        });
    }

    /**
     * Shows survey with a specific token.
     * Does nothing if there are no available surveys with that specific token.
     * Answered and cancelled surveys won't show up again.
     *
     * @param surveyToken A String with a survey token.
     */
    @ReactMethod
    public void showSurvey(final String surveyToken) {
        MainThreadHandler.runOnMainThread(new Runnable() {
            @Override
            public void run() {
                try {
                    Surveys.showSurvey(surveyToken);
                } catch (Exception e) {
                    e.printStackTrace();
                }
            }
        });
    }

    /**
     * Show any valid survey if exist
     *
     * @return true if a valid survey was shown otherwise false
     */
    @ReactMethod
    public void showSurveysIfAvailable() {
        MainThreadHandler.runOnMainThread(new Runnable() {
            @Override
            public void run() {
                try {
                    Surveys.showSurveyIfAvailable();
                } catch (java.lang.Exception exception) {
                    exception.printStackTrace();
                }
            }
        });
    }

    /**
     * Show any valid survey if exist
     *
     * @return true if a valid survey was shown otherwise false
     */
    @ReactMethod
    public void setEnabled(final boolean isEnabled) {
        MainThreadHandler.runOnMainThread(new Runnable() {
            @Override
            public void run() {
                try {
                    if (isEnabled) {
                        Surveys.setState(Feature.State.ENABLED);
                    } else {
                        Surveys.setState(Feature.State.DISABLED);
                    }
                } catch (java.lang.Exception exception) {
                    exception.printStackTrace();
                }
            }
        });
    }

    /**
     * Sets the runnable that gets executed just before showing any valid survey<br/>
     * WARNING: This runs on your application's main UI thread. Please do not include
     * any blocking operations to avoid ANRs.
     *
     * @param handler to run on the UI thread before showing any valid survey
     */
    @ReactMethod
    public void setOnShowHandler(final Callback handler) {
        MainThreadHandler.runOnMainThread(new Runnable() {
            @Override
            public void run() {
                Surveys.setOnShowCallback(new OnShowCallback() {
                    @Override
                    public void onShow() {
                        sendEvent(Constants.IBG_ON_SHOW_SURVEY_HANDLER, null);
                    }
                });
            }
        });
    }

    /**
     * Sets the runnable that gets executed just after showing any valid survey<br/>
     * WARNING: This runs on your application's main UI thread. Please do not include
     * any blocking operations to avoid ANRs.
     *
     * @param handler to run on the UI thread after showing any valid survey
     */
    @ReactMethod
    public void setOnDismissHandler(final Callback handler) {
        MainThreadHandler.runOnMainThread(new Runnable() {
            @Override
            public void run() {
                Surveys.setOnDismissCallback(new OnDismissCallback() {
                    @Override
                    public void onDismiss() {
                        sendEvent(Constants.IBG_ON_DISMISS_SURVEY_HANDLER, null);
                    }
                });
            }
        });
    }

    /**
     * Returns an array containing the available surveys.
     */
    @ReactMethod
    public void getAvailableSurveys(final Promise promise) {
        MainThreadHandler.runOnMainThread(new Runnable() {
            @Override
            public void run() {
                try {
                    List<Survey> availableSurveys = Surveys.getAvailableSurveys();
                    JSONArray surveysArray = InstabugUtil.surveyObjectToJson(availableSurveys);
                    WritableArray array = ArrayUtil.convertJsonToWritableArray(surveysArray);
                    promise.resolve(array);
                } catch (Exception e) {
                    e.printStackTrace();
                    promise.resolve(Arguments.createArray());
                }
            }
        });
    }

    /**
     * Set Surveys auto-showing state, default state auto-showing enabled
     *
     * @param autoShowingSurveysEnabled whether Surveys should be auto-showing or not
     */
    @ReactMethod
    public void setAutoShowingEnabled(final boolean autoShowingSurveysEnabled) {
        MainThreadHandler.runOnMainThread(new Runnable() {
            @Override
            public void run() {
                try {
                    Surveys.setAutoShowingEnabled(autoShowingSurveysEnabled);
                } catch (Exception e) {
                    e.printStackTrace();
                }
            }
        });
    }

    /**
     * Set Surveys welcome screen enabled, default value is false
     *
     * @param shouldShow shouldShow whether should a welcome screen be shown
     *                   before taking surveys or not
     */
    @ReactMethod
    public void setShouldShowWelcomeScreen(final boolean shouldShow) {
        MainThreadHandler.runOnMainThread(new Runnable() {
            @Override
            public void run() {
                try {
                    Surveys.setShouldShowWelcomeScreen(shouldShow);
                } catch (java.lang.Exception exception) {
                    exception.printStackTrace();
                }
            }
        });
    }
}
