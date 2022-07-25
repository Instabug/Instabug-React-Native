package com.instabug.reactlibrary;

import android.os.Looper;
import android.os.SystemClock;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.JavaOnlyArray;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.WritableMap;
import com.instabug.library.Feature;
import com.instabug.reactlibrary.utils.InstabugUtil;
import com.instabug.survey.Survey;
import com.instabug.survey.Surveys;
import com.instabug.reactlibrary.utils.MainThreadHandler;
import com.instabug.survey.callbacks.OnDismissCallback;
import com.instabug.survey.callbacks.OnShowCallback;


import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;
import org.junit.After;
import org.junit.Before;
import org.junit.Test;
import org.mockito.Matchers;
import org.mockito.MockedStatic;
import org.mockito.Mockito;
import org.mockito.invocation.InvocationOnMock;
import org.mockito.stubbing.Answer;

import java.util.List;
import java.util.concurrent.Executors;
import java.util.concurrent.ScheduledExecutorService;

import static org.mockito.Matchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.doAnswer;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.mockStatic;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;


public class RNInstabugSurveysModuleTest {

    private RNInstabugSurveysModule surveysModule = new RNInstabugSurveysModule(mock(ReactApplicationContext.class));

    private final static ScheduledExecutorService mainThread = Executors.newSingleThreadScheduledExecutor();

    // Mock Objects
    private MockedStatic<Looper> mockLooper;
    private MockedStatic <MainThreadHandler> mockMainThreadHandler;
    private MockedStatic <Surveys> mockSurveys;
    private MockedStatic <InstabugUtil> mockInstabugUtil;

    @Before
    public void mockMainThreadHandler() throws Exception {
        // Mock static functions
        mockSurveys = mockStatic(Surveys.class);
        mockLooper = mockStatic(Looper.class);
        mockMainThreadHandler = mockStatic(MainThreadHandler.class);
        mockInstabugUtil = mockStatic(InstabugUtil.class);

        // Mock Looper class
        Looper mockMainThreadLooper = mock(Looper.class);
        Mockito.when(Looper.getMainLooper()).thenReturn(mockMainThreadLooper);

        // Override runOnMainThread
        Answer<Boolean> handlerPostAnswer = new Answer<Boolean>() {
            @Override
            public Boolean answer(InvocationOnMock invocation) throws Throwable {
                invocation.getArgument(0, Runnable.class).run();
                return true;
            }
        };
        doAnswer(handlerPostAnswer).when(MainThreadHandler.class);
        MainThreadHandler.runOnMainThread(any(Runnable.class));
    }
    @After
    public void tearDown() {
        // Remove static mocks
        mockLooper.close();
        mockMainThreadHandler.close();
        mockSurveys.close();
        mockInstabugUtil.close();
    }

    /********Surveys*********/

    @Test
    public void givenFalse$setEnabled_whenQuery_thenShouldCallNativeApiWithDisabled() {
        // when
        surveysModule.setEnabled(false);
        // then
        verify(Surveys.class,times(1));
        Surveys.setState(Feature.State.DISABLED);
    }

    @Test
    public void givenTrue$setSurveysEnabled_whenQuery_thenShouldCallNativeApiWithEnabled() {
        // when
        surveysModule.setEnabled(true);
        // then
        verify(Surveys.class,times(1));
        Surveys.setState(Feature.State.ENABLED);
    }

    @Test
    public void given$showSurveysIfAvailable_whenQuery_thenShouldCallNativeApi() {
        // when
        surveysModule.showSurveysIfAvailable();
        // then
        verify(Surveys.class,times(1));
        Surveys.showSurveyIfAvailable();
    }

    @Test
    public void given$getAvailableSurveys_whenQuery_thenShouldCallNativeApiAndInvokeCallback() throws Exception {
        // given
        MockedStatic mockClock = mockStatic(SystemClock.class);
        MockedStatic mockArgument =mockStatic(Arguments.class);

        Callback callback = mock(Callback.class);
        JSONArray json = mock(JSONArray.class);

        // Override surveyObjectToJson
        Answer<JSONArray> surveyObjectToJsonAnswer = new Answer<JSONArray>() {
            @Override
            public JSONArray answer(InvocationOnMock invocation) throws Throwable {
                List <Survey> list = invocation.getArgument(0, List.class);
                JSONArray jsonArray = json;
                try{
                    for (Survey obj : list) {
                        JSONObject object = new JSONObject();
                        object.put("title", obj.getTitle());
                        jsonArray.put(object);
                    }
                } catch (JSONException e) {
                    e.printStackTrace();
                }
                return jsonArray;
            }
        };
        Mockito.doAnswer(surveyObjectToJsonAnswer).when(InstabugUtil.class);
        InstabugUtil.surveyObjectToJson(any(List.class));
        Mockito.when(Arguments.createArray()).thenReturn(new JavaOnlyArray());
        // when
        surveysModule.getAvailableSurveys(callback);
        // then
        verify(Surveys.class,times(1));
        Surveys.getAvailableSurveys();
        verify(callback).invoke(any());
        mockArgument.close();
        mockClock.close();
    }

    @Test
    public void givenIsEnabled$setAutoShowingEnabled_whenQuery_thenShouldCallNativeApiWithIsEnabled() {
        // when
        surveysModule.setAutoShowingEnabled(true);
        // then
        verify(Surveys.class,times(1));
        Surveys.setAutoShowingEnabled(true);
    }

    @Test
    public void given$setOnShowSurveyHandler_whenQuery_thenShouldSetNativeCallback() {
        // given

        // when
        mockSurveys.when(() -> Surveys.setOnShowCallback(any(OnShowCallback.class)))
                .thenAnswer(new Answer<Object>() {
                    @Override
                    public Object answer(InvocationOnMock invocation) {
                        ((OnShowCallback) invocation.getArguments()[0]).onShow();
                        return null;
                    }
                });
        surveysModule.setOnShowHandler(null);

        // then
        verify(InstabugUtil.class,times(1));
        InstabugUtil.sendEvent(any(ReactApplicationContext.class), eq(Constants.IBG_ON_SHOW_SURVEY_HANDLER), Matchers.isNull(WritableMap.class));
    }

    @Test
    public void given$setOnDismissSurveyHandler_whenQuery_thenShouldSetNativeCallback() {
        // given

        // when
        mockSurveys.when(() -> Surveys.setOnDismissCallback(any(OnDismissCallback.class)))
                .thenAnswer(new Answer<Object>() {
                    @Override
                    public Object answer(InvocationOnMock invocation) {
                        ((OnDismissCallback) invocation.getArguments()[0]).onDismiss();
                        return null;
                    }
                });
        surveysModule.setOnDismissHandler(null);

        // then
        verify(InstabugUtil.class,times(1));
        InstabugUtil.sendEvent(any(ReactApplicationContext.class), eq(Constants.IBG_ON_DISMISS_SURVEY_HANDLER), Matchers.isNull(WritableMap.class));
    }

    @Test
    public void givenString$showSurvey_whenQuery_thenShouldCallNativeApiWithString() {
        // when
        surveysModule.showSurvey("123");
        // then
        verify(Surveys.class,times(1));
        Surveys.showSurvey("123");
    }

    @Test
    public void givenBoolean$hasRespondedToSurvey_whenQuery_thenShouldCallNativeApiAndInvokeCallback() {
        // when
        Callback callback = mock(Callback.class);
        surveysModule.hasRespondedToSurvey("123", callback);
        // then
        verify(Surveys.class,times(1));
        Surveys.hasRespondToSurvey("123");
        verify(callback).invoke(any());
    }

    @Test
    public void givenBoolean$setShouldShowWelcomeScreen_whenQuery_thenShouldCallNativeApi() {
        // when
        surveysModule.setShouldShowWelcomeScreen(true);
        // then
        verify(Surveys.class,times(1));
        Surveys.setShouldShowWelcomeScreen(true);
    }
}
