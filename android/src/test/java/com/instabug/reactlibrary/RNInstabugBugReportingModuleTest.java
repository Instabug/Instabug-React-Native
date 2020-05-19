package com.instabug.reactlibrary;

import android.os.Handler;
import android.os.Looper;
import android.os.SystemClock;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.JavaOnlyArray;
import com.facebook.react.bridge.JavaOnlyMap;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.bridge.WritableNativeArray;
import com.instabug.bug.BugReporting;
import com.instabug.library.Feature;
import com.instabug.library.OnSdkDismissCallback;
import com.instabug.library.extendedbugreport.ExtendedBugReport;
import com.instabug.library.invocation.InstabugInvocationEvent;
import com.instabug.library.invocation.OnInvokeCallback;
import com.instabug.library.invocation.util.InstabugVideoRecordingButtonPosition;
import com.instabug.reactlibrary.utils.InstabugUtil;
import com.instabug.reactlibrary.utils.MainThreadHandler;


import org.json.JSONObject;
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

import java.util.HashMap;
import java.util.Map;
import java.util.concurrent.Executors;
import java.util.concurrent.ScheduledExecutorService;

import static org.mockito.Matchers.any;
import static org.mockito.Matchers.anyLong;
import static org.mockito.Matchers.eq;
import static org.powermock.api.mockito.PowerMockito.doAnswer;
import static org.powermock.api.mockito.PowerMockito.mock;
import static org.powermock.api.mockito.PowerMockito.when;

@RunWith(PowerMockRunner.class)
@PrepareForTest({Looper.class, android.os.Handler.class, BugReporting.class, SystemClock.class, Runnable.class, WritableNativeArray.class, JSONObject.class, RNInstabugBugReportingModule.class, Arguments.class, InstabugUtil.class, MainThreadHandler.class})

public class RNInstabugBugReportingModuleTest {

    private RNInstabugBugReportingModule bugReportingModule = new RNInstabugBugReportingModule(null);

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

    /********BugReporting*********/


    @Test
    public void givenShakingThreshold$setShakingThresholdForAndroid_whenQuery_thenShouldCallNativeApiWithShakingThreshold() {
        // given
        PowerMockito.mockStatic(BugReporting.class);
        int shakingThreshold = 30;
        // when
        bugReportingModule.setShakingThresholdForAndroid(shakingThreshold);
        // then
        PowerMockito.verifyStatic(VerificationModeFactory.times(1));
        BugReporting.setShakingThreshold(shakingThreshold);
    }

    @Test
    public void givenFalse$setBugReportingEnabled_whenQuery_thenShouldCallNativeApiWithDisabled() {
        // given
        PowerMockito.mockStatic(BugReporting.class);
        // when
        bugReportingModule.setEnabled(false);
        // then
        PowerMockito.verifyStatic(VerificationModeFactory.times(1));
        BugReporting.setState(Feature.State.DISABLED);
    }

    @Test
    public void givenTrue$setBugReportingEnabled_whenQuery_thenShouldCallNativeApiWithEnabled() {
        // given
        PowerMockito.mockStatic(BugReporting.class);
        // when
        bugReportingModule.setEnabled(true);
        // then
        PowerMockito.verifyStatic(VerificationModeFactory.times(1));
        BugReporting.setState(Feature.State.ENABLED);
    }

    @Test
    public void givenIsEnabled$setAutoScreenRecordingEnabled_whenQuery_thenShouldCallNativeApiWithIsEnabled() {
        // given
        PowerMockito.mockStatic(BugReporting.class);
        // when
        bugReportingModule.setAutoScreenRecordingEnabled(true);
        // then
        PowerMockito.verifyStatic(VerificationModeFactory.times(1));
        BugReporting.setAutoScreenRecordingEnabled(true);
    }

    @Test
    public void givenTrue$setViewHierarchyEnabled_whenQuery_shouldCallNativeApiWithEnabled() {
        // given
        PowerMockito.mockStatic(BugReporting.class);
        // when
        bugReportingModule.setViewHierarchyEnabled(true);
        // then
        PowerMockito.verifyStatic(VerificationModeFactory.times(1));
        BugReporting.setViewHierarchyState(Feature.State.ENABLED);
    }

    @Test
    public void givenFalse$setViewHierarchyEnabled_whenQuery_shouldCallNativeApiWithDisabled() {
        // given
        PowerMockito.mockStatic(BugReporting.class);
        // when
        bugReportingModule.setViewHierarchyEnabled(false);
        // then
        PowerMockito.verifyStatic(VerificationModeFactory.times(1));
        BugReporting.setViewHierarchyState(Feature.State.DISABLED);
    }

    @Test
    public void givenBooleanArgs$setEnabledAttachmentTypes_whenQuery_shouldCallNativeApiWithBooleanArgs() {
        // given
        PowerMockito.mockStatic(BugReporting.class);
        // when
        bugReportingModule.setEnabledAttachmentTypes(true, true, false, true);
        // then
        PowerMockito.verifyStatic(VerificationModeFactory.times(1));
        BugReporting.setAttachmentTypesEnabled(true, true, false, true);
    }

    @Test
    public void givenExtendedBugReportMode$setExtendedBugReportMode_whenQuery_thenShouldCallNativeApiWithArgs() {
        // given
        PowerMockito.mockStatic(BugReporting.class);
        Map<String, Object> args = new HashMap<>();
        ArgsRegistry.registerInstabugExtendedBugReportModeArgs(args);
        // when
        for (String strExtendedBugReportMode : args.keySet()) {
            bugReportingModule.setExtendedBugReportMode(strExtendedBugReportMode);
        }
        // then
        for (Object extendedBugReportMode : args.values()) {
            ExtendedBugReport.State state = (ExtendedBugReport.State) extendedBugReportMode;
            PowerMockito.verifyStatic(VerificationModeFactory.times(1));
            BugReporting.setExtendedBugReportState(state);
        }
    }

    @Test
    public void givenInvocationEvent$setInvocationEvents_whenQuery_thenShouldCallNativeApiWithArgs() {
        // given
        PowerMockito.mockStatic(BugReporting.class);
        final Map<String, Object> args = new HashMap<>();
        ArgsRegistry.registerInstabugInvocationEventsArgs(args);
        final String[] keysArray = args.keySet().toArray(new String[0]);
        JavaOnlyArray actualArray = new JavaOnlyArray();
        for (String key : keysArray) {
            actualArray.pushString(key);
        }
        // when
        bugReportingModule.setInvocationEvents(actualArray);
        // then
        PowerMockito.verifyStatic(VerificationModeFactory.times(1));
        BugReporting.setInvocationEvents(args.values().toArray(new InstabugInvocationEvent[0]));
    }

    @Test
    public void givenOptions$setOptions_whenQuery_thenShouldCallNativeApiWithArgs() {
        // given
        PowerMockito.mockStatic(BugReporting.class);
        final Map<String, Object> args = new HashMap<>();
        ArgsRegistry.registerInvocationOptionsArgs(args);
        final String[] keysArray = args.keySet().toArray(new String[0]);
        JavaOnlyArray actualArray = new JavaOnlyArray();
        actualArray.pushString(keysArray[0]);
        actualArray.pushString(keysArray[1]);
        // when
        bugReportingModule.setOptions(actualArray);
        // then
        PowerMockito.verifyStatic(VerificationModeFactory.times(1));
        int option1 = (int) args.get(keysArray[0]);
        int option2 = (int) args.get(keysArray[1]);
        BugReporting.setOptions(option1);
        PowerMockito.verifyStatic(VerificationModeFactory.times(1));
        BugReporting.setOptions(option2);
    }

    @Test
    public void given$setOnInvokeHandler_whenQuery_thenShouldSetNativeCallback() {

        try {
            // given
            PowerMockito.mockStatic(BugReporting.class);
            PowerMockito.mockStatic(InstabugUtil.class);
            // when
            PowerMockito.doAnswer(new Answer<Object>() {
                @Override
                public Object answer(InvocationOnMock invocation) {
                    ((OnInvokeCallback) invocation.getArguments()[0]).onInvoke();
                    return null;
                }
            }).when(BugReporting.class, "setOnInvokeCallback", Matchers.anyObject());
            bugReportingModule.setOnInvokeHandler(null);
            // then
            PowerMockito.verifyStatic(VerificationModeFactory.times(1));
            InstabugUtil.sendEvent(any(ReactApplicationContext.class), eq(Constants.IBG_PRE_INVOCATION_HANDLER), Matchers.isNull(WritableMap.class));


        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    @Test
    public void given$setOnSDKDismissedHandler_whenQuery_thenShouldSetNativeCallback() {
        try {
            // given
            PowerMockito.mockStatic(BugReporting.class);
            PowerMockito.mockStatic(Arguments.class);
            PowerMockito.mockStatic(InstabugUtil.class);
            // when
            PowerMockito.when(Arguments.createMap()).thenReturn(new JavaOnlyMap());
            PowerMockito.doAnswer(new Answer<Object>() {
                @Override
                public Object answer(InvocationOnMock invocation) {
                    ((OnSdkDismissCallback) invocation.getArguments()[0])
                            .call(OnSdkDismissCallback.DismissType.CANCEL, OnSdkDismissCallback.ReportType.BUG);
                    return null;
                }
            }).when(BugReporting.class, "setOnDismissCallback", Matchers.anyObject());
            bugReportingModule.setOnSDKDismissedHandler(null);
            // then
            WritableMap params = new JavaOnlyMap();
            params.putString("dismissType", OnSdkDismissCallback.DismissType.CANCEL.toString());
            params.putString("reportType", OnSdkDismissCallback.ReportType.BUG.toString());
            PowerMockito.verifyStatic(VerificationModeFactory.times(1));
            InstabugUtil.sendEvent(any(ReactApplicationContext.class), eq(Constants.IBG_POST_INVOCATION_HANDLER), eq(params));

        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    @Test
    public void givenArray$setReportTypes_whenQuery_thenShouldCallNativeApiWithEnumArgs() {
        // given
        PowerMockito.mockStatic(BugReporting.class);
        final Map<String, Object> args = new HashMap<>();
        ArgsRegistry.registerInstabugReportTypesArgs(args);
        final String[] keysArray = args.keySet().toArray(new String[0]);
        JavaOnlyArray actualArray = new JavaOnlyArray();
        actualArray.pushString(keysArray[0]);
        actualArray.pushString(keysArray[1]);
        // when
        bugReportingModule.setReportTypes(actualArray);
        // then
        PowerMockito.verifyStatic(VerificationModeFactory.times(1));
        int type1 = (int) args.get(keysArray[0]);
        int type2 = (int) args.get(keysArray[1]);
        BugReporting.setReportTypes(type1, type2);
    }

    @Test
    public void givenString$setVideoRecordingFloatingButtonPosition_whenQuery_thenShouldCallNativeApi() {
        // given
        PowerMockito.mockStatic(BugReporting.class);
        final Map<String, Object> args = new HashMap<>();
        ArgsRegistry.registerInstabugVideoRecordingFloatingButtonPositionArgs(args);
        final String[] keysArray = args.keySet().toArray(new String[0]);
        // when
        bugReportingModule.setVideoRecordingFloatingButtonPosition(keysArray[0]);
        // then
        PowerMockito.verifyStatic(VerificationModeFactory.times(1));
        InstabugVideoRecordingButtonPosition position = (InstabugVideoRecordingButtonPosition) args.get(keysArray[0]);
        BugReporting.setVideoRecordingFloatingButtonPosition(position);
    }

    @Test
    public void givenArgs$showBugReportingWithReportTypeAndOptions_whenQuery_thenShouldCallNativeApiWithEnums() {
        // given
        PowerMockito.mockStatic(BugReporting.class);
        final Map<String, Object> optionsArgs = new HashMap<>();
        final Map<String, Object> reportTypeArgs = new HashMap<>();
        ArgsRegistry.registerInvocationOptionsArgs(optionsArgs);
        ArgsRegistry.registerInstabugReportTypesArgs(reportTypeArgs);
        final String[] keysArray = optionsArgs.keySet().toArray(new String[0]);
        final String[] reportTypeKeys = reportTypeArgs.keySet().toArray(new String[0]);
        JavaOnlyArray actualArray = new JavaOnlyArray();
        actualArray.pushString(keysArray[0]);
        actualArray.pushString(keysArray[1]);
        // when
        bugReportingModule.show(reportTypeKeys[0], actualArray);
        // then
        int option1 = (int) optionsArgs.get(keysArray[0]);
        int option2 = (int) optionsArgs.get(keysArray[1]);
        PowerMockito.verifyStatic(VerificationModeFactory.times(1));
        BugReporting.setOptions(option1);
        PowerMockito.verifyStatic(VerificationModeFactory.times(1));
        BugReporting.setOptions(option2);
        PowerMockito.verifyStatic(VerificationModeFactory.times(1));
        BugReporting.show((int) reportTypeArgs.get(reportTypeKeys[0]));
    }

}
