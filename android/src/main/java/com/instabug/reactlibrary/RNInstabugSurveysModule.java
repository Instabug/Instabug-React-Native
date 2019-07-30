package com.instabug.reactlibrary;

import android.os.Handler;
import android.os.Looper;

import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.WritableArray;
import com.instabug.library.Feature;
import com.instabug.reactlibrary.utils.ArrayUtil;
import com.instabug.reactlibrary.utils.InstabugUtil;
import com.instabug.survey.OnDismissCallback;
import com.instabug.survey.OnShowCallback;
import com.instabug.survey.Surveys;
import com.instabug.survey.Survey;

import org.json.JSONArray;

import java.util.List;

import javax.annotation.Nonnull;

public class RNInstabugSurveysModule extends ReactContextBaseJavaModule {

    public RNInstabugSurveysModule(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @Nonnull
    @Override
    public String getName() {
        return "IBGSurveys";
    }

    /**
     * Returns true if the survey with a specific token was answered before.
     * Will return false if the token does not exist or if the survey was not answered before.
     *
     * @param surveyToken          the attribute key as string
     * @param hasRespondedCallback A callback that gets invoked with the returned value of whether
     *                             the user has responded to the survey or not.
     * @return the desired value of whether the user has responded to the survey or not.
     */
    @ReactMethod
    public void hasRespondedToSurveyWithToken(String surveyToken, Callback hasRespondedCallback) {
        boolean hasResponded;
        try {
            hasResponded = Surveys.hasRespondToSurvey(surveyToken);
            hasRespondedCallback.invoke(hasResponded);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    /**
     * Shows survey with a specific token.
     * Does nothing if there are no available surveys with that specific token.
     * Answered and cancelled surveys won't show up again.
     *
     * @param surveyToken A String with a survey token.
     */
    @ReactMethod
    public void showSurveyWithToken(String surveyToken) {
        try {
            Surveys.showSurvey(surveyToken);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    /**
     * Show any valid survey if exist
     *
     * @return true if a valid survey was shown otherwise false
     */
    @ReactMethod
    public void showSurveysIfAvailable() {
        try {
            Surveys.showSurveyIfAvailable();
        } catch (java.lang.Exception exception) {
            exception.printStackTrace();
        }
    }

    /**
     * Show any valid survey if exist
     *
     * @return true if a valid survey was shown otherwise false
     */
    @ReactMethod
    public void setSurveysEnabled(final boolean isEnabled) {
        new Handler(Looper.getMainLooper()).post(new Runnable() {
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
        Surveys.setOnShowCallback(new OnShowCallback() {
            @Override
            public void onShow() {
                InstabugUtil.sendEvent(getReactApplicationContext(), Constants.IBG_ON_SHOW_SURVEY_HANDLER, null);
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

        Surveys.setOnDismissCallback(new OnDismissCallback() {
            @Override
            public void onDismiss() {
                InstabugUtil.sendEvent(getReactApplicationContext(), Constants.IBG_ON_DISMISS_SURVEY_HANDLER, null);
            }
        });
    }

    /**
     * @deprecated
     * Set after how many sessions should the dismissed survey would show again.
     *
     * @param sessionsCount number of sessions that the dismissed survey will be shown after.
     * @param daysCount     number of days that the dismissed survey will show after
     */
    @ReactMethod
    public void setThresholdForReshowingSurveyAfterDismiss(int sessionsCount, int daysCount) {
        try {
            Surveys.setThresholdForReshowingSurveyAfterDismiss(sessionsCount, daysCount);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    /**
     * Returns an array containing the available surveys.
     * @param availableSurveysCallback - Callback with the returned value of the available surveys
     *
     */
    @ReactMethod
    public void getAvailableSurveys(Callback availableSurveysCallback) {
        try {
            List<Survey> availableSurveys = Surveys.getAvailableSurveys();
            JSONArray surveysArray = InstabugUtil.surveyObjectToJson(availableSurveys);
            WritableArray array = ArrayUtil.convertJsonToWritableArray(surveysArray);
            availableSurveysCallback.invoke(array);
        } catch (Exception e) {
            e.printStackTrace();
        }

    }

    /**
     * Set Surveys auto-showing state, default state auto-showing enabled
     *
     * @param autoShowingSurveysEnabled whether Surveys should be auto-showing or not
     */
    @ReactMethod
    public void setAutoShowingSurveysEnabled(boolean autoShowingSurveysEnabled) {
        try {
            Surveys.setAutoShowingEnabled(autoShowingSurveysEnabled);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    /**
     * Set Surveys welcome screen enabled, default value is false
     *
     * @param shouldShow shouldShow whether should a welcome screen be shown
     *                   before taking surveys or not
     */
    @ReactMethod
    public void setShouldShowWelcomeScreen(boolean shouldShow) {
        try {
            Surveys.setShouldShowWelcomeScreen(shouldShow);
        } catch (java.lang.Exception exception) {
            exception.printStackTrace();
        }
    }
}
