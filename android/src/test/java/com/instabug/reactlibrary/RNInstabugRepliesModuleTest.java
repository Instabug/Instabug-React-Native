package com.instabug.reactlibrary;

import android.os.Handler;
import android.os.Looper;
import android.os.SystemClock;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.JavaOnlyMap;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.bridge.WritableNativeArray;
import com.instabug.bug.BugReporting;
import com.instabug.chat.Replies;
import com.instabug.library.Feature;
import com.instabug.reactlibrary.utils.InstabugUtil;
import com.instabug.reactlibrary.utils.MapUtil;
import com.instabug.survey.Surveys;
import com.instabug.reactlibrary.utils.MainThreadHandler;

import org.json.JSONObject;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.internal.verification.VerificationModeFactory;
import org.mockito.invocation.InvocationOnMock;
import org.mockito.stubbing.Answer;
import org.powermock.api.mockito.PowerMockito;
import org.powermock.core.classloader.annotations.PrepareForTest;
import org.powermock.modules.junit4.PowerMockRunner;

import java.util.concurrent.Executors;
import java.util.concurrent.ScheduledExecutorService;
import java.util.Map;
import java.util.HashMap;

import static org.mockito.Matchers.any;
import static org.mockito.Matchers.anyLong;
import static org.mockito.Mockito.verify;
import static org.powermock.api.mockito.PowerMockito.doAnswer;
import static org.powermock.api.mockito.PowerMockito.mock;
import static org.powermock.api.mockito.PowerMockito.when;

@RunWith(PowerMockRunner.class)
@PrepareForTest({Looper.class, android.os.Handler.class, BugReporting.class, Replies.class, Surveys.class, SystemClock.class, Runnable.class, WritableNativeArray.class, JSONObject.class, Arguments.class, InstabugUtil.class, RNInstabugRepliesModule.class, MainThreadHandler.class})

public class RNInstabugRepliesModuleTest {
    private RNInstabugRepliesModule rnModule = new RNInstabugRepliesModule(null);



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

    /********Replies*********/


    @Test
    public void givenFalse$setEnabled_whenQuery_thenShouldCallNativeApiWithDisabled() {
        // given
        PowerMockito.mockStatic(Replies.class);
        // when
        rnModule.setEnabled(false);
        // then
        PowerMockito.verifyStatic(VerificationModeFactory.times(1));
        Replies.setState(Feature.State.DISABLED);
    }

    @Test
    public void givenTrue$setEnabled_whenQuery_thenShouldCallNativeApiWithEnabled() {
        // given
        PowerMockito.mockStatic(Replies.class);
        // when
        rnModule.setEnabled(true);
        // then
        PowerMockito.verifyStatic(VerificationModeFactory.times(1));
        Replies.setState(Feature.State.ENABLED);
    }

    @Test
    public void givenCallback$hasChats_whenQuery_thenShouldCallNativeApiAndInvokeCallback() {
        // given
        PowerMockito.mockStatic(Replies.class);
        // when
        Callback callback = mock(Callback.class);
        rnModule.hasChats(callback);
        // then
        PowerMockito.verifyStatic(VerificationModeFactory.times(1));
        Replies.hasChats();
        verify(callback).invoke(any());
    }

    @Test
    public void given$show_whenQuery_thenShouldCallNativeApi() {
        // given
        PowerMockito.mockStatic(Replies.class);
        // when
        rnModule.show();
        // then
        PowerMockito.verifyStatic(VerificationModeFactory.times(1));
        Replies.show();
    }

    @Test
    public void given$setOnNewReplyReceivedHandler_whenQuery_thenShouldSetNativeCallback() {
        // given
        PowerMockito.mockStatic(Replies.class);
        Callback callback = mock(Callback.class);
        // when
        rnModule.setOnNewReplyReceivedHandler(callback);
        // then
        PowerMockito.verifyStatic(VerificationModeFactory.times(1));
        Replies.setOnNewReplyReceivedCallback(any(Runnable.class));
    }

    @Test
    public void givenCallback$getUnreadRepliesCount_whenQuery_thenShouldCallNativeApiAndInvokeCallback() {
        // given
        PowerMockito.mockStatic(Replies.class);
        // when
        Callback callback = mock(Callback.class);
        rnModule.getUnreadRepliesCount(callback);
        // then
        PowerMockito.verifyStatic(VerificationModeFactory.times(1));
        Replies.getUnreadRepliesCount();
        verify(callback).invoke(any());
    }

    @Test
    public void givenBoolean$setInAppNotificationsEnabled_whenQuery_thenShouldCallNativeApi() {
        // given
        PowerMockito.mockStatic(Replies.class);
        // when
        rnModule.setInAppNotificationEnabled(true);
        // then
        PowerMockito.verifyStatic(VerificationModeFactory.times(1));
        Replies.setInAppNotificationEnabled(true);
    }

    @Test
    public void givenBoolean$setInAppNotificationSound_whenQuery_thenShouldCallNativeApi() {
        // given
        PowerMockito.mockStatic(Replies.class);
        // when
        rnModule.setInAppNotificationSound(true);
        // then
        PowerMockito.verifyStatic(VerificationModeFactory.times(1));
        Replies.setInAppNotificationSound(true);
    }

    @Test
    public void givenBoolean$setPushNotificationRegistrationToken_whenQuery_thenShouldCallNativeApi() {
        // given
        PowerMockito.mockStatic(Replies.class);
        // when
        rnModule.setPushNotificationRegistrationToken("123");
        // then
        PowerMockito.verifyStatic(VerificationModeFactory.times(1));
        Replies.setPushNotificationRegistrationToken("123");
    }

    @Test
    public void givenBoolean$showNotification_whenQuery_thenShouldCallNativeApi() {
        // given
        PowerMockito.mockStatic(Replies.class);
        PowerMockito.mockStatic(SystemClock.class);
        PowerMockito.mockStatic(Arguments.class);

        // when
        PowerMockito.when(Arguments.createMap())
                .thenAnswer(
                        new Answer<Object>() {
                            @Override
                            public Object answer(InvocationOnMock invocation) throws Throwable {
                                return new JavaOnlyMap();
                            }
                        });

        Map<String, String> map = new HashMap<>();
        PowerMockito.when(Replies.isInstabugNotification(map))
                .thenAnswer(
                        new Answer<Object>() {
                            @Override
                            public Object answer(InvocationOnMock invocation) throws Throwable {
                                return true;
                            }
                        });

        WritableMap readableMap = MapUtil.toWritableMap(new HashMap<String, Object>());
        rnModule.showNotification(readableMap);

        PowerMockito.verifyStatic(VerificationModeFactory.times(1));
        Replies.showNotification(map);
    }

    @Test
    public void givenBoolean$setNotificationIcon_whenQuery_thenShouldCallNativeApi() {
        // given
        PowerMockito.mockStatic(Replies.class);
        // when
        rnModule.setNotificationIcon(123);
        // then
        PowerMockito.verifyStatic(VerificationModeFactory.times(1));
        Replies.setNotificationIcon(123);
    }

    @Test
    public void givenBoolean$setPushNotificationChannelId_whenQuery_thenShouldCallNativeApi() {
        // given
        PowerMockito.mockStatic(Replies.class);
        // when
        rnModule.setPushNotificationChannelId("123");
        // then
        PowerMockito.verifyStatic(VerificationModeFactory.times(1));
        Replies.setPushNotificationChannelId("123");
    }

    @Test
    public void givenBoolean$setSystemReplyNotificationSoundEnabled_whenQuery_thenShouldCallNativeApi() {
        // given
        PowerMockito.mockStatic(Replies.class);
        // when
        rnModule.setSystemReplyNotificationSoundEnabled(true);
        // then
        PowerMockito.verifyStatic(VerificationModeFactory.times(1));
        Replies.setSystemReplyNotificationSoundEnabled(true);
    }

}
