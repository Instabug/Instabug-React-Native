package com.instabug.reactlibrary;

import android.os.Handler;
import android.os.Looper;
import android.os.SystemClock;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.JavaOnlyArray;
import com.facebook.react.bridge.ReadableArray;
import com.facebook.react.bridge.WritableArray;
import com.instabug.featuresrequest.ActionType;
import com.instabug.featuresrequest.FeatureRequests;
import com.instabug.library.Feature;
import com.instabug.reactlibrary.utils.MainThreadHandler;

import org.json.JSONObject;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
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
import static org.powermock.api.mockito.PowerMockito.doAnswer;
import static org.powermock.api.mockito.PowerMockito.mock;
import static org.powermock.api.mockito.PowerMockito.when;

@RunWith(PowerMockRunner.class)
@PrepareForTest({Looper.class, android.os.Handler.class, FeatureRequests.class, SystemClock.class, Runnable.class, RNInstabugFeatureRequestsModule.class, Arguments.class, MainThreadHandler.class})

public class RNInstabugFeatureRequestsModuleTest {
    private RNInstabugFeatureRequestsModule featureRequestsModule = new RNInstabugFeatureRequestsModule(null);

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

    /********Feature Requests*********/

    @Test
    public void givenArgs$setEmailFieldRequiredForFeatureRequests_whenQuery_thenShouldCallNativeApi() {
        // given
        PowerMockito.mockStatic(FeatureRequests.class);
        PowerMockito.mockStatic(Arguments.class);
        // when
        PowerMockito.when(Arguments.createArray()).thenReturn(new JavaOnlyArray());
        ReadableArray actionTypes = Arguments.createArray();
        ((WritableArray) actionTypes).pushString("requestNewFeature");
        ((WritableArray) actionTypes).pushString("addCommentToFeature");
        featureRequestsModule.setEmailFieldRequiredForFeatureRequests(true, actionTypes );
        int[] parsedActionTypes = new int[2];
        parsedActionTypes[0] = ActionType.REQUEST_NEW_FEATURE;
        parsedActionTypes[1] = ActionType.ADD_COMMENT_TO_FEATURE;
        // then
        PowerMockito.verifyStatic(VerificationModeFactory.times(1));
        FeatureRequests.setEmailFieldRequired(true, parsedActionTypes);
    }

    @Test
    public void given$show_whenQuery_thenShouldCallNativeApi() {
        // given
        PowerMockito.mockStatic(FeatureRequests.class);
        // when
        featureRequestsModule.show();
        // then
        PowerMockito.verifyStatic(VerificationModeFactory.times(1));
        FeatureRequests.show();
    }

    @Test
    public void givenFalse$setEnabled_whenQuery_thenShouldCallNativeApiWithDisabled() throws Exception{
        // given
        PowerMockito.mockStatic(FeatureRequests.class);
        // when
        featureRequestsModule.setEnabled(false);
        // then
        PowerMockito.verifyStatic(VerificationModeFactory.times(1));
        FeatureRequests.setState(Feature.State.DISABLED);
    }

    @Test
    public void givenTrue$setEnabled_whenQuery_thenShouldCallNativeApiWithEnabled() {
        // given
        PowerMockito.mockStatic(FeatureRequests.class);
        // when
        featureRequestsModule.setEnabled(true);
        // then
        PowerMockito.verifyStatic(VerificationModeFactory.times(1));
        FeatureRequests.setState(Feature.State.ENABLED);
    }
}
