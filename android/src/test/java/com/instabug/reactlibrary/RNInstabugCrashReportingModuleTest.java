package com.instabug.reactlibrary;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.mockStatic;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;

import android.os.Looper;

import com.instabug.crash.CrashReporting;
import com.instabug.crash.models.IBGNonFatalException;
import com.instabug.featuresrequest.FeatureRequests;
import com.instabug.library.Instabug;
import com.instabug.reactlibrary.utils.MainThreadHandler;

import org.junit.After;
import org.junit.Before;
import org.junit.Test;
import org.mockito.MockedStatic;
import org.mockito.Mockito;
import org.mockito.internal.matchers.Any;
import org.mockito.invocation.InvocationOnMock;
import org.mockito.stubbing.Answer;


public class RNInstabugCrashReportingModuleTest {
    private RNInstabugCrashReportingModule rnInstabugCrashReportingModule = new RNInstabugCrashReportingModule(null);

    private MockedStatic<Looper> mockLooper;
    private MockedStatic<MainThreadHandler> mockMainThreadHandler;
    private MockedStatic<CrashReporting> crashReportingMockedStatic;

    @Before
    public void mockMainThreadHandler() throws Exception {
        // Mock static functions
        mockLooper = mockStatic(Looper.class);
        mockMainThreadHandler = mockStatic(MainThreadHandler.class);
        crashReportingMockedStatic = mockStatic(CrashReporting.class);


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
    }

    @Test
    public void givenString$sendHandledJSCrash_whenQuery_thenShouldCallNativeApiWithArgs() throws Exception {
//        JSONObject json = mock(JSONObject.class);
//        PowerMockito.whenNew(JSONObject.class).withArguments("exception").thenReturn(json);
//
//        // given
//        PowerMockito.mockStatic(CrashReporting.class);
//        // when
//        rnModule.sendHandledJSCrash("exception");
//        // then
//        JSONObject jsonObject = new JSONObject("exception");
//        PowerMockito.verifyPrivate(CrashReporting.class, VerificationModeFactory.times(1)).invoke("reportException", jsonObject, true);
    }

    @Test
    public void givenThrowable$sendUnHandledCrash_whenQuery_thenShouldCallNativeApiWithArgs() throws Exception {

        rnInstabugCrashReportingModule.sendUnHandledCrash(new Throwable("test"), null, null, null);
        crashReportingMockedStatic.verify(() -> {
            CrashReporting.report(any(IBGNonFatalException.class));
        }, times(1));
    }


    @Test
    public void givenString$sendJSCrash_whenQuery_thenShouldCallNativeApiWithArgs() throws Exception {
//        JSONObject json = mock(JSONObject.class);
//        PowerMockito.whenNew(JSONObject.class).withArguments("exception").thenReturn(json);
//
//        // given
//        PowerMockito.mockStatic(CrashReporting.class);
//        // when
//        rnModule.sendJSCrash("exception");
//        // then
//        JSONObject jsonObject = new JSONObject("exception");
//        PowerMockito.verifyPrivate(CrashReporting.class, VerificationModeFactory.times(1)).invoke("reportException", jsonObject, false);
    }
}
