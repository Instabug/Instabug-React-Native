package com.instabug.reactlibrary;

import android.os.Handler;
import android.os.Looper;
import android.os.SystemClock;

import com.facebook.react.bridge.Callback;
import com.instabug.apm.APM;
import com.instabug.apm.model.ExecutionTrace;

import com.facebook.react.bridge.Arguments;
import com.instabug.reactlibrary.utils.InstabugUtil;
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
@PrepareForTest({Looper.class, android.os.Handler.class, APM.class, ExecutionTrace.class, SystemClock.class, Runnable.class, RNInstabugAPMModule.class, Arguments.class, InstabugUtil.class, MainThreadHandler.class})

public class RNInstabugAPMModuleTest {

    private RNInstabugAPMModule apmModule = new RNInstabugAPMModule(null);

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

    /********APM*********/

    @Test
    public void givenFalse$setEnabled_whenQuery_thenShouldCallNativeApiWithDisabled() {
        // given
        PowerMockito.mockStatic(APM.class);
        // when
        apmModule.setEnabled(false);
        // then
        PowerMockito.verifyStatic(VerificationModeFactory.times(1));
        APM.setEnabled(false);
    }

    @Test
    public void givenTrue$setEnabled_whenQuery_thenShouldCallNativeApiWithEnabled() {
        // given
        PowerMockito.mockStatic(APM.class);
        // when
        apmModule.setEnabled(true);
        // then
        PowerMockito.verifyStatic(VerificationModeFactory.times(1));
        APM.setEnabled(true);
    }

    @Test
    public void givenFalse$setAppLaunchEnabled_whenQuery_thenShouldCallNativeApiWithDisabled() {
        // given
        PowerMockito.mockStatic(APM.class);
        // when
        apmModule.setAppLaunchEnabled(false);
        // then
        PowerMockito.verifyStatic(VerificationModeFactory.times(1));
        APM.setAppLaunchEnabled(false);
    }

    @Test
    public void givenTrue$setAppLaunchEnabled_whenQuery_thenShouldCallNativeApiWithEnabled() {
        // given
        PowerMockito.mockStatic(APM.class);
        // when
        apmModule.setAppLaunchEnabled(true);
        // then
        PowerMockito.verifyStatic(VerificationModeFactory.times(1));
        APM.setAppLaunchEnabled(true);
    }

    @Test
    public void givenString$startExecutionTrace_whenQuery_thenShouldCallNativeApi() {
        // given
        PowerMockito.mockStatic(APM.class);
        Callback callback = mock(Callback.class);
        // when
        apmModule.startExecutionTrace("trace", "1", callback);
        // then
        PowerMockito.verifyStatic(VerificationModeFactory.times(1));
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
        // given
        PowerMockito.mockStatic(APM.class);
        // when
        apmModule.startUITrace("uiTrace");
        // then
        PowerMockito.verifyStatic(VerificationModeFactory.times(1));
        APM.startUITrace("uiTrace");
    }

    @Test
    public void given$endUITrace_whenQuery_thenShouldCallNativeApiWithEnabled() {
        // given
        PowerMockito.mockStatic(APM.class);
        // when
        apmModule.startUITrace("uiTrace");
        apmModule.endUITrace();
        // then
        PowerMockito.verifyStatic(VerificationModeFactory.times(1));
        APM.endUITrace();
    }
}
