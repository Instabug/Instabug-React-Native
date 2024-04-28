package com.instabug.reactlibrary;

import static com.instabug.crash.CrashReporting.getFingerprintObject;
import static com.instabug.reactlibrary.util.GlobalMocks.reflected;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.mockStatic;

import android.os.Looper;

import com.facebook.react.bridge.ReadableMap;
import com.instabug.crash.CrashReporting;
import com.instabug.crash.models.IBGNonFatalException;
import com.instabug.library.Feature;
import com.instabug.reactlibrary.util.GlobalMocks;
import com.instabug.reactlibrary.util.MockReflected;
import com.instabug.reactlibrary.utils.MainThreadHandler;

import org.json.JSONObject;
import org.junit.After;
import org.junit.Before;
import org.junit.Test;
import org.mockito.MockedStatic;
import org.mockito.Mockito;
import org.mockito.invocation.InvocationOnMock;
import org.mockito.stubbing.Answer;

import java.util.HashMap;
import java.util.Map;


public class RNInstabugCrashReportingModuleTest {
    private final RNInstabugCrashReportingModule rnModule = new RNInstabugCrashReportingModule(null);

    // Mock Objects
    private MockedStatic<Looper> mockLooper;
    private MockedStatic<MainThreadHandler> mockMainThreadHandler;
    private MockedStatic<CrashReporting> mockCrashReporting;


    @Before
    public void mockMainThreadHandler() throws Exception {
        // Mock static functions
        mockLooper = mockStatic(Looper.class);
        mockMainThreadHandler = mockStatic(MainThreadHandler.class);
        mockCrashReporting = mockStatic(CrashReporting.class);
        // Mock Looper class
        Looper mockMainThreadLooper = mock(Looper.class);
        Mockito.when(Looper.getMainLooper()).thenReturn(mockMainThreadLooper);
        GlobalMocks.setUp();


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
        mockCrashReporting.close();
        GlobalMocks.close();

    }

    /********Crashes*********/

    @Test
    public void testSetNDKCrashesEnabledGivenTrue() {
        // when
        rnModule.setNDKCrashesEnabled(true);

//then
        mockCrashReporting.verify(() -> CrashReporting.setNDKCrashesState(Feature.State.ENABLED));
    }

    @Test
    public void testSetNDKCrashesEnabledGivenFalse() {
        // when
        rnModule.setNDKCrashesEnabled(false);

        //then
        mockCrashReporting.verify(() -> CrashReporting.setNDKCrashesState(Feature.State.DISABLED));
    }

    @Test
    public void testSendNonFatalError() {
        String jsonCrash = "{}";
        boolean isHandled = true;
        String fingerPrint = "test";
        String level = ArgsRegistry.nonFatalExceptionLevel.keySet().iterator().next();
        JSONObject finger = getFingerprintObject(fingerPrint);
        IBGNonFatalException.Level lev = ArgsRegistry.nonFatalExceptionLevel.get(level);
        rnModule.sendHandledJSCrash(jsonCrash, null, fingerPrint, level);
        reflected.verify(() -> MockReflected.reportException(any(JSONObject.class), eq(isHandled), eq(null), eq(finger), eq(lev)));
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
