package com.instabug.reactlibrary;

import android.os.Handler;
import android.os.Looper;
import android.os.SystemClock;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.JavaOnlyArray;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.WritableMap;
import com.instabug.library.Feature;
import com.instabug.reactlibrary.utils.InstabugUtil;
import com.instabug.survey.callbacks.*;
import com.instabug.survey.Surveys;
import com.instabug.reactlibrary.utils.MainThreadHandler;


import org.json.JSONArray;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.Matchers;
import org.mockito.internal.verification.VerificationModeFactory;
import org.mockito.invocation.InvocationOnMock;
import org.mockito.stubbing.Answer;
import org.powermock.api.mockito.PowerMockito;
import org.powermock.core.classloader.annotations.PrepareForTest;
import org.powermock.modules.junit4.PowerMockRunner;

import java.util.concurrent.Executors;
import java.util.concurrent.ScheduledExecutorService;

import static org.mockito.Matchers.any;
import static org.mockito.Matchers.anyLong;
import static org.mockito.Matchers.eq;
import static org.mockito.Mockito.verify;
import static org.powermock.api.mockito.PowerMockito.doAnswer;
import static org.powermock.api.mockito.PowerMockito.mock;
import static org.powermock.api.mockito.PowerMockito.when;

@RunWith(PowerMockRunner.class)
@PrepareForTest({Looper.class, android.os.Handler.class, Surveys.class, SystemClock.class, Runnable.class, RNInstabugSurveysModule.class, Arguments.class, InstabugUtil.class, MainThreadHandler.class})

public class RNInstabugSurveysModuleTest {

    private RNInstabugSurveysModule surveysModule = new RNInstabugSurveysModule(null);

    private final static ScheduledExecutorService mainThread = Executors.newSingleThreadScheduledExecutor();

    @Before
    public void mockMainThreadHandler() throws Exception {
        PowerMockito.mockStatic(Looper.class);
        Looper mockMainThreadLooper = mock(Looper.class);
        when(Looper.getMainLooper()).thenReturn(mockMainThreadLooper);
        Handler mockMainThreadHandler = mock(Handler.class);
        Answer<Boolean> handlerPostAnswer = new Answer<Boolean>() {
            @Override
            public Boolean answer(InvocationOnMock invocation) throws Throwable {
                invocation.getArgumentAt(0, Runnable.class).run();
                return true;
            }
        };
        doAnswer(handlerPostAnswer).when(mockMainThreadHandler).post(any(Runnable.class));
        doAnswer(handlerPostAnswer).when(mockMainThreadHandler).postDelayed(any(Runnable.class), anyLong());
        PowerMockito.whenNew(Handler.class).withArguments(mockMainThreadLooper).thenReturn(mockMainThreadHandler);
    }

    /********Surveys*********/

    @Test
    public void givenFalse$setEnabled_whenQuery_thenShouldCallNativeApiWithDisabled() {
        // given
        PowerMockito.mockStatic(Surveys.class);
        // when
        surveysModule.setEnabled(false);
        // then
        PowerMockito.verifyStatic(VerificationModeFactory.times(1));
        Surveys.setState(Feature.State.DISABLED);
    }

    @Test
    public void givenTrue$setSurveysEnabled_whenQuery_thenShouldCallNativeApiWithEnabled() {
        // given
        PowerMockito.mockStatic(Surveys.class);
        // when
        surveysModule.setEnabled(true);
        // then
        PowerMockito.verifyStatic(VerificationModeFactory.times(1));
        Surveys.setState(Feature.State.ENABLED);
    }

    @Test
    public void given$showSurveysIfAvailable_whenQuery_thenShouldCallNativeApi() {
        // given
        PowerMockito.mockStatic(Surveys.class);
        // when
        surveysModule.showSurveysIfAvailable();
        // then
        PowerMockito.verifyStatic(VerificationModeFactory.times(1));
        Surveys.showSurveyIfAvailable();
    }

    @Test
    public void givenIntArgs$setThresholdForReshowingSurveyAfterDismiss_whenQuery_thenShouldCallNativeApiWithIntArgs() {
        // given
        PowerMockito.mockStatic(Surveys.class);
        // when
        surveysModule.setThresholdForReshowingSurveyAfterDismiss(2,2);
        // then
        PowerMockito.verifyStatic(VerificationModeFactory.times(1));
        Surveys.setThresholdForReshowingSurveyAfterDismiss(2,2);
    }


    @Test
    public void given$getAvailableSurveys_whenQuery_thenShouldCallNativeApiAndInvokeCallback() throws Exception {
        // given
        PowerMockito.mockStatic(Surveys.class);
        PowerMockito.mockStatic(SystemClock.class);
        PowerMockito.mockStatic(Arguments.class);
        Callback callback = mock(Callback.class);
        JSONArray json = mock(JSONArray.class);
        // when
        PowerMockito.whenNew(JSONArray.class).withAnyArguments().thenReturn(json);
        PowerMockito.when(Arguments.createArray()).thenReturn(new JavaOnlyArray());
        surveysModule.getAvailableSurveys(callback);
        // then
        PowerMockito.verifyStatic(VerificationModeFactory.times(1));
        Surveys.getAvailableSurveys();
        verify(callback).invoke(any());
    }

    @Test
    public void givenIsEnabled$setAutoShowingEnabled_whenQuery_thenShouldCallNativeApiWithIsEnabled() {
        // given
        PowerMockito.mockStatic(Surveys.class);
        // when
        surveysModule.setAutoShowingEnabled(true);
        // then
        PowerMockito.verifyStatic(VerificationModeFactory.times(1));
        Surveys.setAutoShowingEnabled(true);
    }

    @Test
    public void given$setOnShowSurveyHandler_whenQuery_thenShouldSetNativeCallback() {

        try {
            // given
            PowerMockito.mockStatic(Surveys.class);
            PowerMockito.mockStatic(InstabugUtil.class);
            // when
            PowerMockito.doAnswer(new Answer<Object>() {
                @Override
                public Object answer(InvocationOnMock invocation) {
                    ((OnShowCallback) invocation.getArguments()[0]).onShow();
                    return null;
                }
            }).when(Surveys.class, "setOnShowCallback", Matchers.anyObject());
            surveysModule.setOnShowHandler(null);
            // then
            PowerMockito.verifyStatic(VerificationModeFactory.times(1));
            InstabugUtil.sendEvent(any(ReactApplicationContext.class), eq(Constants.IBG_ON_SHOW_SURVEY_HANDLER), Matchers.isNull(WritableMap.class));

        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    @Test
    public void given$setOnDismissSurveyHandler_whenQuery_thenShouldSetNativeCallback() {
        try {
            // given
            PowerMockito.mockStatic(Surveys.class);
            PowerMockito.mockStatic(InstabugUtil.class);
            // when
            PowerMockito.doAnswer(new Answer<Object>() {
                @Override
                public Object answer(InvocationOnMock invocation) {
                    ((OnDismissCallback) invocation.getArguments()[0]).onDismiss();
                    return null;
                }
            }).when(Surveys.class, "setOnDismissCallback", Matchers.anyObject());
            surveysModule.setOnDismissHandler(null);
            // then
            PowerMockito.verifyStatic(VerificationModeFactory.times(1));
            InstabugUtil.sendEvent(any(ReactApplicationContext.class), eq(Constants.IBG_ON_DISMISS_SURVEY_HANDLER), Matchers.isNull(WritableMap.class));

        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    @Test
    public void givenString$showSurvey_whenQuery_thenShouldCallNativeApiWithString() {
        // given
        PowerMockito.mockStatic(Surveys.class);
        // when
        surveysModule.showSurvey("123");
        // then
        PowerMockito.verifyStatic(VerificationModeFactory.times(1));
        Surveys.showSurvey("123");
    }

    @Test
    public void givenBoolean$hasRespondedToSurvey_whenQuery_thenShouldCallNativeApiAndInvokeCallback() {
        // given
        PowerMockito.mockStatic(Surveys.class);
        // when
        Callback callback = mock(Callback.class);
        surveysModule.hasRespondedToSurvey("123", callback);
        // then
        PowerMockito.verifyStatic(VerificationModeFactory.times(1));
        Surveys.hasRespondToSurvey("123");
        verify(callback).invoke(any());
    }

    @Test
    public void givenBoolean$setShouldShowWelcomeScreen_whenQuery_thenShouldCallNativeApi() {
        // given
        PowerMockito.mockStatic(Surveys.class);
        // when
        surveysModule.setShouldShowWelcomeScreen(true);
        // then
        PowerMockito.verifyStatic(VerificationModeFactory.times(1));
        Surveys.setShouldShowWelcomeScreen(true);
    }
}
