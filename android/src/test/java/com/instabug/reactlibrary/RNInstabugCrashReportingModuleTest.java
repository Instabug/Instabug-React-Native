package com.instabug.reactlibrary;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.mockStatic;

import android.os.Looper;

import com.instabug.crash.CrashReporting;
import com.instabug.library.Feature;
import com.instabug.reactlibrary.util.GlobalMocks;
import com.instabug.reactlibrary.utils.MainThreadHandler;

import org.junit.After;
import org.junit.Before;
import org.junit.Test;
import org.mockito.MockedStatic;
import org.mockito.Mockito;
import org.mockito.invocation.InvocationOnMock;
import org.mockito.stubbing.Answer;


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
    }

    /********Crashes*********/

    @Test
    public void givenTrue$SetNDKCrashesEnabledShouldCallNativeApiWithEnable() {
        // when
        rnModule.setNDKCrashesEnabled(true);

//then
        mockCrashReporting.verify(() -> CrashReporting.setNDKCrashesState(Feature.State.ENABLED));
    }

    @Test
    public void givenTrue$SetNDKCrashesEnabledShouldCallNativeApiWithDisabled() {
        // when
        rnModule.setNDKCrashesEnabled(false);

        //then
        mockCrashReporting.verify(() -> CrashReporting.setNDKCrashesState(Feature.State.DISABLED));
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
