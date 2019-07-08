package com.instabug.reactlibrary;

import android.os.Handler;
import android.os.Looper;

import com.instabug.bug.BugReporting;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.Matchers;
import org.mockito.Spy;
import org.mockito.internal.verification.VerificationModeFactory;
import org.mockito.invocation.InvocationOnMock;
import org.mockito.stubbing.Answer;
import org.powermock.api.mockito.PowerMockito;
import org.powermock.core.classloader.annotations.PrepareForTest;
import org.powermock.modules.junit4.PowerMockRunner;

import java.util.concurrent.Executors;
import java.util.concurrent.ScheduledExecutorService;
import java.util.concurrent.TimeUnit;

import static org.mockito.Matchers.any;
import static org.mockito.Matchers.anyLong;
import static org.powermock.api.mockito.PowerMockito.doAnswer;
import static org.powermock.api.mockito.PowerMockito.mock;
import static org.powermock.api.mockito.PowerMockito.when;

@RunWith(PowerMockRunner.class)
@PrepareForTest({Looper.class, android.os.Handler.class, BugReporting.class, Runnable.class, RNInstabugReactnativeModule.class})

public class RNInstabugReactnativeModuleTest {

    private RNInstabugReactnativeModule rnModule = new RNInstabugReactnativeModule(null,null,null);

    private final static ScheduledExecutorService mainThread = Executors.newSingleThreadScheduledExecutor();

    @Test
    public void testBugReportingInvoke() {
        PowerMockito.mockStatic(BugReporting.class);
        rnModule.invoke();
        PowerMockito.verifyStatic(VerificationModeFactory.times(1));
        BugReporting.invoke();
    }

    @Before
    public void mockMainThreadHandler() throws Exception {
        PowerMockito.mockStatic(Looper.class);
        Looper mockMainThreadLooper = mock(Looper.class);
        when(Looper.getMainLooper()).thenReturn(mockMainThreadLooper);
        Handler mockMainThreadHandler = mock(Handler.class);
        Answer<Boolean> handlerPostAnswer = new Answer<Boolean>() {
            @Override
            public Boolean answer(InvocationOnMock invocation) throws Throwable {
                Runnable runnable = invocation.getArgumentAt(0, Runnable.class);
                Long delay = 0L;
                if (invocation.getArguments().length > 1) {
                    delay = invocation.getArgumentAt(1, Long.class);
                }
                if (runnable != null) {
                    mainThread.schedule(runnable, delay, TimeUnit.MILLISECONDS);
                }
                return true;
            }
        };
        doAnswer(handlerPostAnswer).when(mockMainThreadHandler).post(any(Runnable.class));
        doAnswer(handlerPostAnswer).when(mockMainThreadHandler).postDelayed(any(Runnable.class), anyLong());
        PowerMockito.whenNew(Handler.class).withArguments(mockMainThreadLooper).thenReturn(mockMainThreadHandler);
    }


}