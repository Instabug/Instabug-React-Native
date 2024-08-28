package com.instabug.reactlibrary;

import static junit.framework.TestCase.assertEquals;
import static junit.framework.TestCase.assertTrue;

import static org.mockito.Matchers.any;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.mockStatic;
import static org.mockito.Mockito.spy;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import android.os.Looper;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.JavaOnlyMap;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.WritableMap;
import com.instabug.library.OnSessionReplayLinkReady;
import com.instabug.library.SessionSyncListener;
import com.instabug.library.sessionreplay.SessionReplay;
import com.instabug.library.sessionreplay.model.SessionMetadata;
import com.instabug.reactlibrary.utils.MainThreadHandler;

import org.junit.After;
import org.junit.Before;
import org.junit.Test;
import org.mockito.MockedStatic;
import org.mockito.Mockito;
import org.mockito.invocation.InvocationOnMock;
import org.mockito.stubbing.Answer;

import java.util.concurrent.CountDownLatch;
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
        String link = "instabug link";

        mockSessionReplay.when(() -> SessionReplay.getSessionReplayLink(any())).thenAnswer(
                invocation -> {
                    OnSessionReplayLinkReady callback = (OnSessionReplayLinkReady) invocation.getArguments()[0];
                    callback.onSessionReplayLinkReady(link);
                    return callback;
                });
        sessionReplayModule.getSessionReplayLink(promise);


        mockSessionReplay.verify(() -> SessionReplay.getSessionReplayLink(any()));
        mockSessionReplay.verifyNoMoreInteractions();


        verify(promise).resolve(link);


    }

    @Test
    public void testSetUserStepsEnabled() {

        sessionReplayModule.setUserStepsEnabled(true);

        mockSessionReplay.verify(() -> SessionReplay.setUserStepsEnabled(true));
        mockSessionReplay.verifyNoMoreInteractions();
    }

    @Test

    public void testSetSyncCallback() throws Exception  {
        MockedStatic mockArgument = mockStatic(Arguments.class);
        RNInstabugSessionReplayModule SRModule = spy(new RNInstabugSessionReplayModule(mock(ReactApplicationContext.class)));

        CountDownLatch latch =new CountDownLatch(1);
        SRModule.latch=latch;

        when(Arguments.createMap()).thenReturn(new JavaOnlyMap());

        mockSessionReplay.when(() -> SessionReplay.setSyncCallback(any(SessionSyncListener.class)))
                .thenAnswer(new Answer<Void>() {
                    @Override
                    public Void answer(InvocationOnMock invocation) {
                        ((SessionSyncListener) invocation.getArguments()[0]).onSessionReadyToSync(new SessionMetadata("device","android","1.0",20));
                        return null;
                    }
                });

        Thread thread= new Thread (() ->{
            try {
                Thread.sleep(500);
            } catch (InterruptedException e) {
                throw new RuntimeException(e);
            }
            SRModule.evaluateSync(true);
        });
        thread.start();

        SRModule.setSyncCallback();

        WritableMap params = Arguments.createMap();
        params.putString("appVersion","1.0");
        params.putString("OS","android");
        params.putString("device","device");
        params.putDouble("sessionDurationInSeconds",20);

       assertEquals(SRModule.shouldSync,true);
       assertTrue("Latch should be zero after evaluateSync is called", SRModule.latch.getCount() == 0);

       verify(SRModule).sendEvent(Constants.IBG_SESSION_REPLAY_ON_SYNC_CALLBACK_INVOCATION, params);
       mockSessionReplay.verify(() -> SessionReplay.setSyncCallback(any(SessionSyncListener.class)));

        mockArgument.close();
    }

}
