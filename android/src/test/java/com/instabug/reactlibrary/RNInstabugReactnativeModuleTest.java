package com.instabug.reactlibrary;

import android.os.Handler;
import android.os.Looper;
import android.os.SystemClock;
import android.util.Log;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.JavaOnlyArray;
import com.facebook.react.bridge.JavaOnlyMap;
import com.facebook.react.bridge.WritableArray;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.bridge.WritableNativeArray;
import com.instabug.bug.BugReporting;
import com.instabug.chat.Chats;
import com.instabug.chat.Replies;
import com.instabug.featuresrequest.FeatureRequests;
import com.instabug.library.Feature;
import com.instabug.library.Instabug;
import com.instabug.library.InstabugColorTheme;
import com.instabug.library.InstabugCustomTextPlaceHolder;
import com.instabug.library.ui.onboarding.WelcomeMessage;
import com.instabug.library.visualusersteps.State;
import com.instabug.survey.Surveys;
import com.instabug.reactlibrary.utils.MainThreadHandler;

import org.json.JSONObject;
import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.Matchers;
import org.mockito.internal.verification.VerificationModeFactory;
import org.mockito.invocation.InvocationOnMock;
import org.mockito.stubbing.Answer;
import org.powermock.api.mockito.PowerMockito;
import org.powermock.core.classloader.annotations.PowerMockIgnore;
import org.powermock.core.classloader.annotations.PrepareForTest;
import org.powermock.modules.junit4.PowerMockRunner;
import org.powermock.reflect.Whitebox;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Locale;
import java.util.Map;
import java.util.concurrent.Executors;
import java.util.concurrent.ScheduledExecutorService;

import static org.mockito.Matchers.any;
import static org.mockito.Matchers.anyLong;
import static org.mockito.Mockito.verify;
import static org.powermock.api.mockito.PowerMockito.doAnswer;
import static org.powermock.api.mockito.PowerMockito.mock;
import static org.powermock.api.mockito.PowerMockito.when;

@RunWith(PowerMockRunner.class)
@PrepareForTest({Looper.class, android.os.Handler.class, Instabug.class, BugReporting.class, FeatureRequests.class, Chats.class, Replies.class, SystemClock.class, Surveys.class, Runnable.class, WritableNativeArray.class, JSONObject.class, RNInstabugReactnativeModule.class, Arguments.class, Log.class,  MainThreadHandler.class})


public class RNInstabugReactnativeModuleTest {

    private RNInstabugReactnativeModule rnModule = new RNInstabugReactnativeModule(null,null,null);

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


    /********CrashReporting*********/

//    @Test
//    public void givenFalse$CrashReportingEnabled_whenQuery_thenShouldCallNativeApiWithDisabled() {
//        // given
//        PowerMockito.mockStatic(CrashReporting.class);
//        // when
//        rnModule.setCrashReportingEnabled(false);
//        // then
//        PowerMockito.verifyStatic(VerificationModeFactory.times(1));
//        CrashReporting.setState(Feature.State.DISABLED);
//    }
//
//    @Test
//    public void givenTrue$CrashReportingEnabled_whenQuery_thenShouldCallNativeApiWithEnabled() {
//        // given
//        PowerMockito.mockStatic(CrashReporting.class);
//        // when
//        rnModule.setCrashReportingEnabled(true);
//        // then
//        PowerMockito.verifyStatic(VerificationModeFactory.times(1));
//        CrashReporting.setState(Feature.State.ENABLED);
//    }
//
//    @Test
//    public void givenString$sendHandledJSCrash_whenQuery_thenShouldCallNativeApiWithArgs() throws Exception {
//
//            JSONObject json = mock(JSONObject.class);
//            PowerMockito.whenNew(JSONObject.class).withArguments("exception").thenReturn(json);
//
//            // given
//            PowerMockito.mockStatic(CrashReporting.class);
//            // when
//            rnModule.sendHandledJSCrash("exception");
//            // then
//            JSONObject jsonObject = new JSONObject("exception");
//            PowerMockito.verifyPrivate(CrashReporting.class, VerificationModeFactory.times(1)).invoke("reportException", jsonObject, true);
//    }
//
//    @Test
//    public void givenString$sendJSCrash_whenQuery_thenShouldCallNativeApiWithArgs() throws Exception {
//
//            JSONObject json = mock(JSONObject.class);
//            PowerMockito.whenNew(JSONObject.class).withArguments("exception").thenReturn(json);
//
//            // given
//            PowerMockito.mockStatic(CrashReporting.class);
//            // when
//            rnModule.sendJSCrash("exception");
//            // then
//            JSONObject jsonObject = new JSONObject("exception");
//            PowerMockito.verifyPrivate(CrashReporting.class, VerificationModeFactory.times(1)).invoke("reportException", jsonObject, false);
//    }

    /********Instabug*********/

    @Test
    public void givenBoolean$setDebugEnabled_whenQuery_thenShouldCallNativeApi() {
        // given
        PowerMockito.mockStatic(Instabug.class);
        // when
        rnModule.setDebugEnabled(true);
        // then
        PowerMockito.verifyStatic(VerificationModeFactory.times(1));
        Instabug.setDebugEnabled(true);
    }

    @Test
    public void givenArgs$setUserAttribute_whenQuery_thenShouldCallNativeApi() {
        // given
        PowerMockito.mockStatic(Instabug.class);
        String key = "company";
        String value = "Instabug";
        // when
        rnModule.setUserAttribute(key, value);
        // then
        PowerMockito.verifyStatic(VerificationModeFactory.times(1));
        Instabug.setUserAttribute(key, value);
    }

    @Test
    public void givenArg$removeUserAttribute_whenQuery_thenShouldCallNativeApi() {
        // given
        PowerMockito.mockStatic(Instabug.class);
        String key = "company";
        // when
        rnModule.removeUserAttribute(key);
        // then
        PowerMockito.verifyStatic(VerificationModeFactory.times(1));
        Instabug.removeUserAttribute(key);
    }

    @Test
    public void given$clearAllUserAttributes_whenQuery_thenShouldCallNativeApi() {
        // given
        PowerMockito.mockStatic(Instabug.class);
        // when
        rnModule.clearAllUserAttributes();
        // then
        PowerMockito.verifyStatic(VerificationModeFactory.times(1));
        Instabug.clearAllUserAttributes();
    }

    @Test
    public void givenStringTheme$setColorTheme_whenQuery_thenShouldCallNativeApiWithTheme() {
        // given
        PowerMockito.mockStatic(Instabug.class);
        Map<String, Object> themesArgs = new HashMap<>();
        ArgsRegistry.registerColorThemeArgs(themesArgs);
        final String[] keysArray = themesArgs.keySet().toArray(new String[0]);
        // when
        for (String key: keysArray) {
            rnModule.setColorTheme(key);
        }
        // then
        PowerMockito.verifyStatic(VerificationModeFactory.times(1));
        for (String key : keysArray) {
            InstabugColorTheme theme = (InstabugColorTheme) themesArgs.get(key);
            Instabug.setColorTheme(theme);
        }
    }

    @Test
    public void givenArg$setUserData_whenQuery_thenShouldCallNativeApiWithArg() {
        // given
        PowerMockito.mockStatic(Instabug.class);
        String data = "something";
        // when
        rnModule.setUserData(data);
        // then
        PowerMockito.verifyStatic(VerificationModeFactory.times(1));
        Instabug.setUserData(data);
    }

    @Test
    public void givenArg$setPrimaryColor_whenQuery_thenShouldCallNativeApiWithArg() {
        // given
        PowerMockito.mockStatic(Instabug.class);
        int color = 3902;
        // when
        rnModule.setPrimaryColor(color);
        // then
        PowerMockito.verifyStatic(VerificationModeFactory.times(1));
        Instabug.setPrimaryColor(color);
    }

    @Test
    public void givenArgs$identifyUserWithEmail_whenQuery_thenShouldCallNativeApiWithArgs() {
        // given
        PowerMockito.mockStatic(Instabug.class);
        String email = "sali@instabug.com";
        String userName = "salmaali";
        // when
        rnModule.identifyUserWithEmail(email, userName);
        // then
        PowerMockito.verifyStatic(VerificationModeFactory.times(1));
        Instabug.identifyUser(userName, email);
    }

    @Test
    public void given$resetTags_whenQuery_thenShouldCallNativeApi() {
        // given
        PowerMockito.mockStatic(Instabug.class);
        // when
        rnModule.resetTags();
        // then
        PowerMockito.verifyStatic(VerificationModeFactory.times(1));
        Instabug.resetTags();
    }

    @Test
    public void given$isEnabled_whenQuery_thenShouldCallNativeApiAndReturnValue() {
        // given
        PowerMockito.mockStatic(Instabug.class);
        PowerMockito.when(Instabug.isEnabled()).thenReturn(true);
        // when
        boolean isEnabled = rnModule.isEnabled();
        // then
        PowerMockito.verifyStatic(VerificationModeFactory.times(1));
        Instabug.isEnabled();
        Assert.assertTrue(isEnabled);
    }

    @Test
    public void given$enable_whenQuery_thenShouldCallNativeApi() {
        // given
        PowerMockito.mockStatic(Instabug.class);
        // when
        rnModule.enable();
        // then
        PowerMockito.verifyStatic(VerificationModeFactory.times(1));
        Instabug.enable();
    }

    @Test
    public void given$disable_whenQuery_thenShouldCallNativeApi() {
        // given
        PowerMockito.mockStatic(Instabug.class);
        // when
        rnModule.disable();
        // then
        PowerMockito.verifyStatic(VerificationModeFactory.times(1));
        Instabug.disable();
    }

    @Test
    public void given$getAppToken_whenQuery_thenShouldCallNativeApiAndReturnValue() {
        // given
        PowerMockito.mockStatic(Instabug.class);
        PowerMockito.when(Instabug.getAppToken()).thenReturn("APP_TOKEN");
        // when
        String appToken = rnModule.getAppToken();
        // then
        PowerMockito.verifyStatic(VerificationModeFactory.times(1));
        Instabug.getAppToken();
        Assert.assertEquals("APP_TOKEN", appToken);
    }

    @Test
    public void given$logOut_whenQuery_thenShouldCallNativeApi() {
        // given
        PowerMockito.mockStatic(Instabug.class);
        // when
        rnModule.logOut();
        // then
        PowerMockito.verifyStatic(VerificationModeFactory.times(1));
        Instabug.logoutUser();
    }

    @Test
    public void given$logUserEventWithName_whenQuery_thenShouldCallNativeApi() {
        // given
        PowerMockito.mockStatic(Instabug.class);
        String eventName = "click";
        // when
        rnModule.logUserEventWithName(eventName);
        // then
        PowerMockito.verifyStatic(VerificationModeFactory.times(1));
        Instabug.logUserEvent(eventName);
    }

    @Test
    public void given$clearFileAttachment_whenQuery_thenShouldCallNativeApi() {
        // given
        PowerMockito.mockStatic(Instabug.class);
        // when
        rnModule.clearFileAttachment();
        // then
        PowerMockito.verifyStatic(VerificationModeFactory.times(1));
        Instabug.clearFileAttachment();
    }

    @Test
    public void givenArg$setReproStepsMode_whenQuery_thenShouldCallNativeApiWithArg() throws Exception {
        // given
        PowerMockito.mockStatic(Instabug.class);
        Map<String, Object> args = new HashMap<>();
        ArgsRegistry.registerReproStepsModeArgs(args);
        final String[] keysArray = args.keySet().toArray(new String[0]);
        // when
        for (String key : keysArray) {
            rnModule.setReproStepsMode(key);
        }
        // then
        for (String key : keysArray) {
            State mode = (State) args.get(key);
            PowerMockito.verifyStatic(VerificationModeFactory.times(1));
            Instabug.setReproStepsState(mode);
        }

    }

    @Test
    public void givenArg$showWelcomeMessageWithMode_whenQuery_thenShouldCallNativeApiWithArg() {
        // given
        PowerMockito.mockStatic(Instabug.class);
        Map<String, Object> args = new HashMap<>();
        ArgsRegistry.registerWelcomeMessageArgs(args);
        final String[] keysArray = args.keySet().toArray(new String[0]);
        // when
        for (String key : keysArray) {
            rnModule.showWelcomeMessageWithMode(key);
        }
        // then
        PowerMockito.verifyStatic(VerificationModeFactory.times(1));
        for (String key : keysArray) {
            WelcomeMessage.State state = (WelcomeMessage.State) args.get(key);
            Instabug.showWelcomeMessage(state);
        }
    }

    @Test
    public void givenArg$setWelcomeMessageMode_whenQuery_thenShouldCallNativeApiWithArg() {
        // given
        PowerMockito.mockStatic(Instabug.class);
        Map<String, Object> args = new HashMap<>();
        ArgsRegistry.registerWelcomeMessageArgs(args);
        final String[] keysArray = args.keySet().toArray(new String[0]);
        // when
        for (String key : keysArray) {
            rnModule.setWelcomeMessageMode(key);
        }
        // then
        PowerMockito.verifyStatic(VerificationModeFactory.times(1));
        for (String key : keysArray) {
            WelcomeMessage.State state = (WelcomeMessage.State) args.get(key);
            Instabug.setWelcomeMessageState(state);
        }
    }

    @Test
    public void given$show_whenQuery_thenShouldCallNativeApi() {
        // given
        PowerMockito.mockStatic(Instabug.class);
        // when
        rnModule.show();
        // then
        PowerMockito.verifyStatic(VerificationModeFactory.times(1));
        Instabug.show();
    }

    @Test
    public void givenTrue$setSessionProfilerEnabled_whenQuery_thenShouldCallNativeApiWithEnabled() {
        // given
        PowerMockito.mockStatic(Instabug.class);
        // when
        rnModule.setSessionProfilerEnabled(true);
        // then
        PowerMockito.verifyStatic(VerificationModeFactory.times(1));
        Instabug.setSessionProfilerState(Feature.State.ENABLED);
    }

    @Test
    public void givenFalse$setSessionProfilerEnabled_whenQuery_thenShouldCallNativeApiWithDisabled() {
        // given
        PowerMockito.mockStatic(Instabug.class);
        // when
        rnModule.setSessionProfilerEnabled(false);
        // then
        PowerMockito.verifyStatic(VerificationModeFactory.times(1));
        Instabug.setSessionProfilerState(Feature.State.DISABLED);
    }

    @Test
    public void givenArg$appendTags_whenQuery_thenShouldCallNativeApiWithArg() {
        // given
        PowerMockito.mockStatic(Instabug.class);
        JavaOnlyArray array = new JavaOnlyArray();
        array.pushString("tag1");
        array.pushString("tag2");
        // when
        rnModule.appendTags(array);
        // then
        PowerMockito.verifyStatic(VerificationModeFactory.times(1));
        String [] expectedArray = {"tag1", "tag2"};
        Instabug.addTags(expectedArray);
    }

    @Test
    public void givenCallback$getTags_whenQuery_thenShouldCallNativeApiAndInvokeCallback() {
        // given
        PowerMockito.mockStatic(Instabug.class);
        PowerMockito.mockStatic(Arguments.class);
        Callback callback = mock(Callback.class);
        // when
        ArrayList<String> tags = new ArrayList<>();
        tags.add("tag1");
        tags.add("tag2");
        PowerMockito.when(Instabug.getTags()).thenReturn(tags);
        PowerMockito.when(Arguments.createArray()).thenReturn(new JavaOnlyArray());
        rnModule.getTags(callback);
        // then
        PowerMockito.verifyStatic(VerificationModeFactory.times(1));
        Instabug.getTags();
        WritableArray expectedArray = new JavaOnlyArray();
        expectedArray.pushString("tag1");
        expectedArray.pushString("tag2");
        verify(callback).invoke(expectedArray);

    }

    @Test
    public void givenArgs$getUserAttribute_whenQuery_thenShouldCallNativeApiAndInvokeCallback() {
        // given
        PowerMockito.mockStatic(Instabug.class);
        Callback callback = mock(Callback.class);
        // when
        String key = "company";
        String value = "Instabug";
        PowerMockito.when(Instabug.getUserAttribute(key)).thenReturn(value);
        rnModule.getUserAttribute(key, callback);
        // then
        PowerMockito.verifyStatic(VerificationModeFactory.times(1));
        Instabug.getUserAttribute(key);
        verify(callback).invoke(value);
    }

    @Test
    public void givenCallback$getAllUserAttributes_whenQuery_thenShouldCallNativeApiAndInvokeCallback() {
        // given
        PowerMockito.mockStatic(Instabug.class);
        PowerMockito.mockStatic(Arguments.class);
        Callback callback = mock(Callback.class);
        // when
        HashMap<String, String> userAttributes = new HashMap<>();
        userAttributes.put("email", "sali@instabug.com");
        PowerMockito.when(Arguments.createMap()).thenReturn(new JavaOnlyMap());
        PowerMockito.when(Instabug.getAllUserAttributes()).thenReturn(userAttributes);
        rnModule.getAllUserAttributes(callback);
        // then
        PowerMockito.verifyStatic(VerificationModeFactory.times(1));
        Instabug.getAllUserAttributes();
        WritableMap expectedMap = new JavaOnlyMap();
        expectedMap.putString("email", "sali@instabug.com");
        verify(callback).invoke(expectedMap);
    }

    @Test
    public void givenArg$setLocale_whenQuery_thenShouldCallNativeApiWithLocale() {
        // given
        PowerMockito.mockStatic(Instabug.class);
        Map<String, Object> args = new HashMap<>();
        ArgsRegistry.registerLocaleArgs(args);
        String[] keysArray = args.keySet().toArray(new String[0]);
        // when
        for (String key : keysArray) {
            rnModule.setLocale(key);
        }
        // then
        PowerMockito.verifyStatic(VerificationModeFactory.times(1));
        for (String key : keysArray) {
            Locale locale = (Locale) args.get(key);
            Instabug.setLocale(locale);
        }
    }

    @Test
    public void givenString$setString_whenQuery_thenShouldCallNativeApiWithEnum() {
        // given
        PowerMockito.mockStatic(Instabug.class);
        PowerMockito.mockStatic(Log.class);
        Map<String, Object> args = new HashMap<>();
        ArgsRegistry.registerCustomTextPlaceHolderKeysArgs(args);
        String[] keysArray = args.keySet().toArray(new String[0]);
        // when
        InstabugCustomTextPlaceHolder expectedPlaceHolders = new InstabugCustomTextPlaceHolder();
        for (String key : keysArray) {
            InstabugCustomTextPlaceHolder.Key placeHolder = (InstabugCustomTextPlaceHolder.Key) args.get(key);
            expectedPlaceHolders.set(placeHolder, key);
            rnModule.setString(key, key);
        }
        // then
        PowerMockito.verifyStatic(VerificationModeFactory.atLeastOnce());
        Instabug.setCustomTextPlaceHolders(Matchers.any(InstabugCustomTextPlaceHolder.class));
        InstabugCustomTextPlaceHolder placeHolders = Whitebox.getInternalState(rnModule, "placeHolders");
        for (String key : keysArray) {
            InstabugCustomTextPlaceHolder.Key placeHolder = (InstabugCustomTextPlaceHolder.Key) args.get(key);
            Assert.assertEquals(placeHolders.get(placeHolder), key);
        }
    }

    @Test
    public void givenString$reportScreenChange_whenQuery_thenShouldCallNativeApiWithString() throws Exception {
        // given
        PowerMockito.mockStatic(Instabug.class);
        rnModule.reportScreenChange("screen");

        // then
        PowerMockito.verifyPrivate(Instabug.class, VerificationModeFactory.times(1)).invoke("reportScreenChange", null,"screen");

    }

}