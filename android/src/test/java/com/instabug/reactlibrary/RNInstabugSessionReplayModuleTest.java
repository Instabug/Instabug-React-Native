package com.instabug.reactlibrary;

import static org.mockito.Matchers.any;
import static org.mockito.Mockito.doAnswer;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.mockStatic;
import static org.mockito.Mockito.timeout;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import android.os.Handler;
import android.os.Looper;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.JavaOnlyArray;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReadableArray;
import com.facebook.react.bridge.WritableArray;
import com.instabug.chat.Replies;
import com.instabug.featuresrequest.ActionType;
import com.instabug.featuresrequest.FeatureRequests;
import com.instabug.library.Feature;
import com.instabug.library.OnSessionReplayLinkReady;
import com.instabug.library.sessionreplay.SessionReplay;
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


public class RNInstabugSessionReplayModuleTest {
    private RNInstabugSessionReplayModule sessionReplayModule = new RNInstabugSessionReplayModule(null);

    private final static ScheduledExecutorService mainThread = Executors.newSingleThreadScheduledExecutor();

    // Mock Objects
    private MockedStatic<Looper> mockLooper;
    private MockedStatic<MainThreadHandler> mockMainThreadHandler;
    private MockedStatic<SessionReplay> mockSessionReplay;

    @Before
    public void mockMainThreadHandler() throws Exception {
        // Mock static functions
        mockSessionReplay = mockStatic(SessionReplay.class);
        mockLooper = mockStatic(Looper.class);
        mockMainThreadHandler = mockStatic(MainThreadHandler.class);

        // Mock Looper class
        Looper mockMainThreadLooper = Mockito.mock(Looper.class);
        when(Looper.getMainLooper()).thenReturn(mockMainThreadLooper);

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
        mockSessionReplay.close();
    }

    @Test
    public void testSetEnabled() {

        sessionReplayModule.setEnabled(true);

        mockSessionReplay.verify(() -> SessionReplay.setEnabled(true));
        mockSessionReplay.verifyNoMoreInteractions();
    }

    @Test
    public void testSetNetworkLogsEnabled() {

        sessionReplayModule.setNetworkLogsEnabled(true);

        mockSessionReplay.verify(() -> SessionReplay.setNetworkLogsEnabled(true));
        mockSessionReplay.verifyNoMoreInteractions();
    }

    @Test
    public void testSetInstabugLogsEnabled() {

        sessionReplayModule.setInstabugLogsEnabled(true);

        mockSessionReplay.verify(() -> SessionReplay.setIBGLogsEnabled(true));
        mockSessionReplay.verifyNoMoreInteractions();
    }

    @Test
    public void testGetSessionReplayLink() {
        Promise promise = mock(Promise.class);
        String link="instabug link";

        mockSessionReplay.when(() -> SessionReplay.getSessionReplayLink(any())).thenAnswer(
                invocation -> {
                    OnSessionReplayLinkReady callback = (OnSessionReplayLinkReady) invocation.getArguments()[0];
                    callback.onSessionReplayLinkReady(link);
                    return callback;
                });
        sessionReplayModule.getSessionReplayLink(promise);


        mockSessionReplay.verify(() -> SessionReplay.getSessionReplayLink(any()));
        mockSessionReplay.verifyNoMoreInteractions();


        verify(promise, timeout(1000)).resolve(link);


    }

    @Test
    public void testSetUserStepsEnabled() {

        sessionReplayModule.setUserStepsEnabled(true);

        mockSessionReplay.verify(() -> SessionReplay.setUserStepsEnabled(true));
        mockSessionReplay.verifyNoMoreInteractions();
    }


}
