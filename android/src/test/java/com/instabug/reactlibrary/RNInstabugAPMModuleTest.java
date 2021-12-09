package com.instabug.reactlibrary;
import android.os.Looper;

import com.facebook.react.bridge.Callback;
import com.instabug.apm.APM;

import com.instabug.reactlibrary.utils.MainThreadHandler;

import org.junit.After;
import org.junit.Before;
import org.junit.Test;
import org.mockito.MockedStatic;
import org.mockito.invocation.InvocationOnMock;
import org.mockito.stubbing.Answer;

import java.util.concurrent.Executors;
import java.util.concurrent.ScheduledExecutorService;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.doAnswer;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.mockStatic;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

public class RNInstabugAPMModuleTest {

    private RNInstabugAPMModule apmModule = new RNInstabugAPMModule(null);
    private final static ScheduledExecutorService mainThread = Executors.newSingleThreadScheduledExecutor();

    // Mock Objects
    private MockedStatic<Looper> mockLooper;
    private MockedStatic <MainThreadHandler> mockMainThreadHandler;
    private MockedStatic <APM> mockAPM;

    @Before
    public void mockMainThreadHandler() throws Exception {
        // Mock static functions
        mockAPM = mockStatic(APM.class);
        mockLooper = mockStatic(Looper.class);
        mockMainThreadHandler = mockStatic(MainThreadHandler.class);

        // Mock Looper class
        Looper mockMainThreadLooper = mock(Looper.class);
        when(Looper.getMainLooper()).thenReturn(mockMainThreadLooper);

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
        mockAPM.close();
    }

    /********APM*********/

    @Test
    public void givenFalsesetEnabled_whenQuery_thenShouldCallNativeApiWithDisabled() {
        // when
        apmModule.setEnabled(false);
        // then
        verify(APM.class, times(1));
        APM.setEnabled(false);
    }

    @Test
    public void givenTruesetEnabled_whenQuery_thenShouldCallNativeApiWithEnabled() {
        // when
        apmModule.setEnabled(true);
        // then
        verify(APM.class, times(1));
        APM.setEnabled(true);
    }

    @Test
    public void givenFalse$setAppLaunchEnabled_whenQuery_thenShouldCallNativeApiWithDisabled() {

        // when
        apmModule.setAppLaunchEnabled(false);
        // then
        verify(APM.class, times(1));
        APM.setAppLaunchEnabled(false);
    }

    @Test
    public void givenTrue$setAppLaunchEnabled_whenQuery_thenShouldCallNativeApiWithEnabled() {

        // when
        apmModule.setAppLaunchEnabled(true);
        // then
        verify(APM.class, times(1));
        APM.setAppLaunchEnabled(true);
    }

    @Test
    public void given$endAppLaunch_whenQuery_thenShouldCallNativeApiWithEnabled() {
        // given
        PowerMockito.mockStatic(APM.class);
        // when
        apmModule.endAppLaunch();
        // then
        PowerMockito.verifyStatic(VerificationModeFactory.times(1));
        APM.endAppLaunch();
    }

    @Test
    public void givenString$startExecutionTrace_whenQuery_thenShouldCallNativeApi() {

        Callback callback = mock(Callback.class);
        // when
        apmModule.startExecutionTrace("trace", "1", callback);
        // then
        verify(APM.class, times(1));
        APM.startExecutionTrace("trace");
        verify(callback).invoke(any());
    }

    // @Test
    // public void givenString$setExecutionTraceAttribute_whenQuery_thenShouldCallNativeApiWithIntArgs() {
    //     // given
    //     PowerMockito.mockStatic(APM.class);
    //     ExecutionTrace trace = mock(ExecutionTrace.class);
    //     Callback callback = mock(Callback.class);
    //     // when
    //     PowerMockito.whenNew(ExecutionTrace.class).withArguments("trace").thenReturn(trace);
    //     apmModule.startExecutionTrace("trace", "1", callback);
    //     apmModule.setExecutionTraceAttribute("trace", "key", "value");
    //     // then
    //     verify(trace).setAttribute("key", "value");
    // }

    // @Test
    // public void givenTrace$endExecutionTrace_whenQuery_thenShouldCallNativeApiWithIntArgs() {
    //     // given
    //     PowerMockito.mockStatic(APM.class);
    //     ExecutionTrace trace = mock(ExecutionTrace.class);
    //     Callback callback = mock(Callback.class);
    //     // when
    //     PowerMockito.whenNew(ExecutionTrace.class).withArguments("trace").thenReturn(trace);
    //     apmModule.startExecutionTrace("trace", "1", callback);
    //     apmModule.endExecutionTrace("1");
    //     // then
    //     verify(trace).end();
    // }

    @Test
    public void givenString$startUITrace_whenQuery_thenShouldCallNativeApiWithEnabled() {

        // when
        apmModule.startUITrace("uiTrace");
        // then
        verify(APM.class, times(1));
        APM.startUITrace("uiTrace");
    }

    @Test
    public void given$endUITrace_whenQuery_thenShouldCallNativeApiWithEnabled() {

        // when
        apmModule.startUITrace("uiTrace");
        apmModule.endUITrace();
        // then
        verify(APM.class, times(1));
        APM.endUITrace();
    }
}
