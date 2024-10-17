package com.instabug.reactlibrary;

import android.os.Looper;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.JavaOnlyArray;
import com.facebook.react.bridge.ReadableArray;
import com.facebook.react.bridge.WritableArray;
import com.instabug.featuresrequest.ActionType;
import com.instabug.featuresrequest.FeatureRequests;
import com.instabug.library.Feature;
import com.instabug.reactlibrary.utils.MainThreadHandler;

import org.junit.After;
import org.junit.Before;
import org.junit.Test;
import org.mockito.MockedStatic;
import org.mockito.Mockito;
import org.mockito.invocation.InvocationOnMock;
import org.mockito.stubbing.Answer;

import java.util.concurrent.Executors;
import java.util.concurrent.ScheduledExecutorService;

import static org.mockito.Matchers.any;
import static org.mockito.Mockito.mockStatic;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;


public class RNInstabugFeatureRequestsModuleTest {
    private RNInstabugFeatureRequestsModule featureRequestsModule = new RNInstabugFeatureRequestsModule(null);

    private final static ScheduledExecutorService mainThread = Executors.newSingleThreadScheduledExecutor();

    // Mock Objects
    private MockedStatic<Looper> mockLooper;
    private MockedStatic <MainThreadHandler> mockMainThreadHandler;
    private MockedStatic <FeatureRequests> mockFeature;

    @Before
    public void mockMainThreadHandler() throws Exception {
        // Mock static functions
        mockFeature = mockStatic(FeatureRequests.class);
        mockLooper = mockStatic(Looper.class);
        mockMainThreadHandler = mockStatic(MainThreadHandler.class);

        // Mock Looper class
        Looper mockMainThreadLooper = Mockito.mock(Looper.class);
        Mockito.when(Looper.getMainLooper()).thenReturn(mockMainThreadLooper);

        // Override runOnMainThread
        Answer<Boolean> handlerPostAnswer = new Answer<Boolean>() {
            @Override
            public Boolean answer(InvocationOnMock invocation) throws Throwable {
                invocation.getArgument(0, Runnable.class).run();
                return true;
            }
        };
        Mockito.doAnswer(handlerPostAnswer).when(MainThreadHandler.class);
        MainThreadHandler.runOnMainThread(any(Runnable.class));
    }
    @After
    public void tearDown() {
        // Remove static mocks
        mockLooper.close();
        mockMainThreadHandler.close();
        mockFeature.close();
    }

    /********Feature Requests*********/

    @Test
    public void givenArgs$setEmailFieldRequiredForFeatureRequests_whenQuery_thenShouldCallNativeApi() {
        // given
        MockedStatic mockArgument = mockStatic(Arguments.class);
        // when
        Mockito.when(Arguments.createArray()).thenReturn(new JavaOnlyArray());
        ReadableArray actionTypes = Arguments.createArray();
        ((WritableArray) actionTypes).pushString("requestNewFeature");
        ((WritableArray) actionTypes).pushString("addCommentToFeature");
        featureRequestsModule.setEmailFieldRequiredForFeatureRequests(true, actionTypes );
        int[] parsedActionTypes = new int[2];
        parsedActionTypes[0] = ActionType.REQUEST_NEW_FEATURE;
        parsedActionTypes[1] = ActionType.ADD_COMMENT_TO_FEATURE;
        // then
        verify(FeatureRequests.class, times(1));
        FeatureRequests.setEmailFieldRequired(true, parsedActionTypes);
        mockArgument.close();
    }

    @Test
    public void given$show_whenQuery_thenShouldCallNativeApi() {
        // when
        featureRequestsModule.show();
        // then
        verify(FeatureRequests.class, times(1));
        FeatureRequests.show();
    }

    @Test
    public void givenFalse$setEnabled_whenQuery_thenShouldCallNativeApiWithDisabled() throws Exception{
        // when
        featureRequestsModule.setEnabled(false);
        // then
        verify(FeatureRequests.class, times(1));
        FeatureRequests.setState(Feature.State.DISABLED);
    }

    @Test
    public void givenTrue$setEnabled_whenQuery_thenShouldCallNativeApiWithEnabled() {
        // when
        featureRequestsModule.setEnabled(true);
        // then
        verify(FeatureRequests.class, times(1));
        FeatureRequests.setState(Feature.State.ENABLED);
    }
}
