package com.instabug.reactlibrary;

import static com.instabug.reactlibrary.utils.InstabugUtil.getMethod;

import android.graphics.Bitmap;
import android.os.Looper;
import android.util.Log;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.JavaOnlyArray;
import com.facebook.react.bridge.JavaOnlyMap;
import com.facebook.react.bridge.WritableArray;
import com.facebook.react.bridge.WritableMap;
import com.instabug.library.Feature;
import com.instabug.library.Instabug;
import com.instabug.library.InstabugColorTheme;
import com.instabug.library.InstabugCustomTextPlaceHolder;
import com.instabug.library.ui.onboarding.WelcomeMessage;
import com.instabug.library.visualusersteps.State;
import com.instabug.reactlibrary.utils.MainThreadHandler;

import org.junit.After;
import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;
import org.mockito.Matchers;
import org.mockito.MockedStatic;
import org.mockito.Mockito;
import org.mockito.internal.verification.VerificationModeFactory;
import org.mockito.invocation.InvocationOnMock;
import org.mockito.stubbing.Answer;

import java.lang.reflect.Field;
import java.lang.reflect.Method;
import java.sql.Array;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Locale;
import java.util.Map;
import java.util.concurrent.Executors;
import java.util.concurrent.ScheduledExecutorService;

import static org.mockito.Matchers.any;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.mockStatic;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;


public class RNInstabugReactnativeModuleTest {
    private RNInstabugReactnativeModule rnModule = new RNInstabugReactnativeModule(null,null,null);

    private final static ScheduledExecutorService mainThread = Executors.newSingleThreadScheduledExecutor();

    // Mock Objects
    private MockedStatic<Looper> mockLooper;
    private MockedStatic <MainThreadHandler> mockMainThreadHandler;
    private MockedStatic <Instabug> mockInstabug;

    @Before
    public void mockMainThreadHandler() throws Exception {
        // Mock static functions
        mockInstabug = mockStatic(Instabug.class);
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
        Mockito.doAnswer(handlerPostAnswer).when(MainThreadHandler.class);
        MainThreadHandler.runOnMainThread(any(Runnable.class));
    }
    @After
    public void tearDown() {
        // Remove static mocks
        mockLooper.close();
        mockMainThreadHandler.close();
        mockInstabug.close();
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
        // when
        rnModule.setDebugEnabled(true);
        // then
        verify(Instabug.class,times(1));
        Instabug.setDebugEnabled(true);
    }

    @Test
    public void givenArgs$setUserAttribute_whenQuery_thenShouldCallNativeApi() {
        // given

        String key = "company";
        String value = "Instabug";
        // when
        rnModule.setUserAttribute(key, value);
        // then
        verify(Instabug.class,times(1));
        Instabug.setUserAttribute(key, value);
    }

    @Test
    public void givenArg$removeUserAttribute_whenQuery_thenShouldCallNativeApi() {
        // given

        String key = "company";
        // when
        rnModule.removeUserAttribute(key);
        // then
        verify(Instabug.class,times(1));
        Instabug.removeUserAttribute(key);
    }

    @Test
    public void given$clearAllUserAttributes_whenQuery_thenShouldCallNativeApi() {
        // given

        // when
        rnModule.clearAllUserAttributes();
        // then
        verify(Instabug.class,times(1));
        Instabug.clearAllUserAttributes();
    }

    @Test
    public void givenStringTheme$setColorTheme_whenQuery_thenShouldCallNativeApiWithTheme() {
        // given

        Map<String, Object> themesArgs = new HashMap<>();
        ArgsRegistry.registerColorThemeArgs(themesArgs);
        final String[] keysArray = themesArgs.keySet().toArray(new String[0]);
        // when
        for (String key: keysArray) {
            rnModule.setColorTheme(key);
        }
        // then
        verify(Instabug.class,times(1));
        for (String key : keysArray) {
            InstabugColorTheme theme = (InstabugColorTheme) themesArgs.get(key);
            Instabug.setColorTheme(theme);
        }
    }

    @Test
    public void givenArg$setUserData_whenQuery_thenShouldCallNativeApiWithArg() {
        // given

        String data = "something";
        // when
        rnModule.setUserData(data);
        // then
        verify(Instabug.class,times(1));
        Instabug.setUserData(data);
    }

    @Test
    public void givenArg$setPrimaryColor_whenQuery_thenShouldCallNativeApiWithArg() {
        // given

        int color = 3902;
        // when
        rnModule.setPrimaryColor(color);
        // then
        verify(Instabug.class,times(1));
        Instabug.setPrimaryColor(color);
    }

    @Test
    public void givenArgs$identifyUserWithEmail_whenQuery_thenShouldCallNativeApiWithArgs() {
        // given

        String email = "sali@instabug.com";
        String userName = "salmaali";
        // when
        rnModule.identifyUserWithEmail(email, userName);
        // then
        verify(Instabug.class,times(1));
        Instabug.identifyUser(userName, email);
    }

    @Test
    public void given$resetTags_whenQuery_thenShouldCallNativeApi() {
        // given

        // when
        rnModule.resetTags();
        // then
        verify(Instabug.class,times(1));
        Instabug.resetTags();
    }

    @Test
    public void given$isEnabled_whenQuery_thenShouldCallNativeApiAndReturnValue() {
        // given

        when(Instabug.isEnabled()).thenReturn(true);
        // when
        boolean isEnabled = rnModule.isEnabled();
        // then
        verify(Instabug.class,times(1));
        Instabug.isEnabled();
        Assert.assertTrue(isEnabled);
    }

    @Test
    public void given$enable_whenQuery_thenShouldCallNativeApi() {
        // given

        // when
        rnModule.enable();
        // then
        verify(Instabug.class,times(1));
        Instabug.enable();
    }

    @Test
    public void given$disable_whenQuery_thenShouldCallNativeApi() {
        // given

        // when
        rnModule.disable();
        // then
        verify(Instabug.class,times(1));
        Instabug.disable();
    }

    @Test
    public void given$getAppToken_whenQuery_thenShouldCallNativeApiAndReturnValue() {
        // given

        when(Instabug.getAppToken()).thenReturn("APP_TOKEN");
        // when
        String appToken = rnModule.getAppToken();
        // then
        verify(Instabug.class,times(1));
        Instabug.getAppToken();
        Assert.assertEquals("APP_TOKEN", appToken);
    }

    @Test
    public void given$logOut_whenQuery_thenShouldCallNativeApi() {
        // given

        // when
        rnModule.logOut();
        // then
        verify(Instabug.class,times(1));
        Instabug.logoutUser();
    }

    @Test
    public void given$logUserEventWithName_whenQuery_thenShouldCallNativeApi() {
        // given

        String eventName = "click";
        // when
        rnModule.logUserEventWithName(eventName);
        // then
        verify(Instabug.class,times(1));
        Instabug.logUserEvent(eventName);
    }

    @Test
    public void given$clearFileAttachment_whenQuery_thenShouldCallNativeApi() {
        // given

        // when
        rnModule.clearFileAttachment();
        // then
        verify(Instabug.class,times(1));
        Instabug.clearFileAttachment();
    }

    @Test
    public void givenArg$setReproStepsMode_whenQuery_thenShouldCallNativeApiWithArg() throws Exception {
        // given

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
            verify(Instabug.class,times(1));
            Instabug.setReproStepsState(mode);
        }

    }

    @Test
    public void givenArg$showWelcomeMessageWithMode_whenQuery_thenShouldCallNativeApiWithArg() {
        // given

        Map<String, Object> args = new HashMap<>();
        ArgsRegistry.registerWelcomeMessageArgs(args);
        final String[] keysArray = args.keySet().toArray(new String[0]);
        // when
        for (String key : keysArray) {
            rnModule.showWelcomeMessageWithMode(key);
        }
        // then
        verify(Instabug.class,times(1));
        for (String key : keysArray) {
            WelcomeMessage.State state = (WelcomeMessage.State) args.get(key);
            Instabug.showWelcomeMessage(state);
        }
    }

    @Test
    public void givenArg$setWelcomeMessageMode_whenQuery_thenShouldCallNativeApiWithArg() {
        // given

        Map<String, Object> args = new HashMap<>();
        ArgsRegistry.registerWelcomeMessageArgs(args);
        final String[] keysArray = args.keySet().toArray(new String[0]);
        // when
        for (String key : keysArray) {
            rnModule.setWelcomeMessageMode(key);
        }
        // then
        verify(Instabug.class,times(1));
        for (String key : keysArray) {
            WelcomeMessage.State state = (WelcomeMessage.State) args.get(key);
            Instabug.setWelcomeMessageState(state);
        }
    }

    @Test
    public void given$show_whenQuery_thenShouldCallNativeApi() {
        // given

        // when
        rnModule.show();
        // then
        verify(Instabug.class,times(1));
        Instabug.show();
    }

    @Test
    public void givenTrue$setSessionProfilerEnabled_whenQuery_thenShouldCallNativeApiWithEnabled() {
        // given

        // when
        rnModule.setSessionProfilerEnabled(true);
        // then
        verify(Instabug.class,times(1));
        Instabug.setSessionProfilerState(Feature.State.ENABLED);
    }

    @Test
    public void givenFalse$setSessionProfilerEnabled_whenQuery_thenShouldCallNativeApiWithDisabled() {
        // given

        // when
        rnModule.setSessionProfilerEnabled(false);
        // then
        verify(Instabug.class,times(1));
        Instabug.setSessionProfilerState(Feature.State.DISABLED);
    }

    @Test
    public void givenArg$appendTags_whenQuery_thenShouldCallNativeApiWithArg() {
        // given

        JavaOnlyArray array = new JavaOnlyArray();
        array.pushString("tag1");
        array.pushString("tag2");
        // when
        rnModule.appendTags(array);
        // then
        verify(Instabug.class,times(1));
        String [] expectedArray = {"tag1", "tag2"};
        Instabug.addTags(expectedArray);
    }

    @Test
    public void givenCallback$getTags_whenQuery_thenShouldCallNativeApiAndInvokeCallback() {
        // given

        MockedStatic mockArgument = mockStatic(Arguments.class);
        Callback callback = mock(Callback.class);
        // when
        ArrayList<String> tags = new ArrayList<>();
        tags.add("tag1");
        tags.add("tag2");
        when(Instabug.getTags()).thenReturn(tags);
        when(Arguments.createArray()).thenReturn(new JavaOnlyArray());
        rnModule.getTags(callback);
        // then
        verify(Instabug.class,times(1));
        Instabug.getTags();
        WritableArray expectedArray = new JavaOnlyArray();
        expectedArray.pushString("tag1");
        expectedArray.pushString("tag2");
        verify(callback).invoke(expectedArray);
        mockArgument.close();

    }

    @Test
    public void givenArgs$getUserAttribute_whenQuery_thenShouldCallNativeApiAndInvokeCallback() {
        // given

        Callback callback = mock(Callback.class);
        // when
        String key = "company";
        String value = "Instabug";
        when(Instabug.getUserAttribute(key)).thenReturn(value);
        rnModule.getUserAttribute(key, callback);
        // then
        verify(Instabug.class,times(1));
        Instabug.getUserAttribute(key);
        verify(callback).invoke(value);
    }

    @Test
    public void givenCallback$getAllUserAttributes_whenQuery_thenShouldCallNativeApiAndInvokeCallback() {
        // given
        MockedStatic mockArgument = mockStatic(Arguments.class);
        Callback callback = mock(Callback.class);
        // when
        HashMap<String, String> userAttributes = new HashMap<>();
        userAttributes.put("email", "sali@instabug.com");
        when(Arguments.createMap()).thenReturn(new JavaOnlyMap());
        when(Instabug.getAllUserAttributes()).thenReturn(userAttributes);
        rnModule.getAllUserAttributes(callback);
        // then
        verify(Instabug.class,times(1));
        Instabug.getAllUserAttributes();
        WritableMap expectedMap = new JavaOnlyMap();
        expectedMap.putString("email", "sali@instabug.com");
        verify(callback).invoke(expectedMap);
        mockArgument.close();
    }

    @Test
    public void givenArg$setLocale_whenQuery_thenShouldCallNativeApiWithLocale() {
        // given

        Map<String, Object> args = new HashMap<>();
        ArgsRegistry.registerLocaleArgs(args);
        String[] keysArray = args.keySet().toArray(new String[0]);
        // when
        for (String key : keysArray) {
            rnModule.setLocale(key);
        }
        // then
        verify(Instabug.class,times(1));
        for (String key : keysArray) {
            Locale locale = (Locale) args.get(key);
            Instabug.setLocale(locale);
        }
    }

    @Test
    public void givenString$setString_whenQuery_thenShouldCallNativeApiWithEnum() {
        // given
        mockStatic(Log.class);
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
        verify(Instabug.class ,VerificationModeFactory.atLeastOnce());
        Instabug.setCustomTextPlaceHolders(Matchers.any(InstabugCustomTextPlaceHolder.class));

        // access placeHolders field by reflection
        try {
            Field privateStringField = RNInstabugReactnativeModule.class.
                    getDeclaredField("placeHolders");
            privateStringField.setAccessible(true);
            InstabugCustomTextPlaceHolder placeHolders = (InstabugCustomTextPlaceHolder) privateStringField.get(rnModule);
        for (String key : keysArray) {
            InstabugCustomTextPlaceHolder.Key placeHolder = (InstabugCustomTextPlaceHolder.Key) args.get(key);
            Assert.assertEquals(placeHolders.get(placeHolder), key);
        }
        } catch (NoSuchFieldException | IllegalAccessException nsfe) {
            throw new RuntimeException(nsfe);
        }
    }

    @Test
    public void givenString$reportScreenChange_whenQuery_thenShouldCallNativeApiWithString() throws Exception {
        // when
        rnModule.reportScreenChange("screen");
        Method privateStringMethod = getMethod(Class.forName("com.instabug.library.Instabug"), "reportScreenChange", Bitmap.class, String.class);
        privateStringMethod.setAccessible(true);

        // then
        verify(Instabug.class, VerificationModeFactory.times(1));
        privateStringMethod.invoke("reportScreenChange", null,"screen");

    }

    @Test
    public void givenArg$addExperiments_whenQuery_thenShouldCallNativeApiWithArg() {
        // given
        JavaOnlyArray array = new JavaOnlyArray();
        array.pushString("exp1");
        array.pushString("exp2");

        // when
        rnModule.addExperiments(array);

        // then
        verify(Instabug.class,times(1));
        List<String> expectedList = new ArrayList<String>();
        expectedList.add("exp1");
        expectedList.add("exp2");
        Instabug.addExperiments(expectedList);
    }

    @Test
    public void givenArg$removeExperiments_whenQuery_thenShouldCallNativeApiWithArg() {
        // given
        JavaOnlyArray array = new JavaOnlyArray();
        array.pushString("exp1");
        array.pushString("exp2");

        // when
        rnModule.removeExperiments(array);

        // then
        verify(Instabug.class,times(1));
        List<String> expectedList = new ArrayList<String>();
        expectedList.add("exp1");
        expectedList.add("exp2");
        Instabug.removeExperiments(expectedList);
    }

    @Test
    public void given$clearAllExperiments_whenQuery_thenShouldCallNativeApi() {
        // given

        // when
        rnModule.clearAllExperiments();

        // then
        verify(Instabug.class,times(1));
        Instabug.clearAllExperiments();
    }
}