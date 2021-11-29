package com.instabug.reactlibrary;

import android.os.Looper;
import android.os.SystemClock;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.JavaOnlyMap;
import com.facebook.react.bridge.WritableMap;
import com.instabug.chat.Replies;
import com.instabug.library.Feature;
import com.instabug.reactlibrary.utils.MapUtil;
import com.instabug.reactlibrary.utils.MainThreadHandler;

import org.junit.After;
import org.junit.Before;
import org.junit.Test;
import org.mockito.MockedStatic;
import org.mockito.Mockito;
import org.mockito.invocation.InvocationOnMock;
import org.mockito.stubbing.Answer;

import java.util.concurrent.Executors;
import java.util.concurrent.ScheduledExecutorService;
import java.util.Map;
import java.util.HashMap;

import static org.mockito.Matchers.any;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.mockStatic;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;


public class RNInstabugRepliesModuleTest {
    private RNInstabugRepliesModule rnModule = new RNInstabugRepliesModule(null);
    private final static ScheduledExecutorService mainThread = Executors.newSingleThreadScheduledExecutor();

    // Mock Objects
    private MockedStatic<Looper> mockLooper;
    private MockedStatic <MainThreadHandler> mockMainThreadHandler;
    private MockedStatic <Replies> mockReplies;

    @Before
    public void mockMainThreadHandler() throws Exception {
        // Mock static functions
        mockReplies = mockStatic(Replies.class);
        mockLooper = mockStatic(Looper.class);
        mockMainThreadHandler = mockStatic(MainThreadHandler.class);

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
        mockReplies.close();
    }

    /********Replies*********/


    @Test
    public void givenFalse$setEnabled_whenQuery_thenShouldCallNativeApiWithDisabled() {
        // when
        rnModule.setEnabled(false);
        // then
        verify(Replies.class,times(1));
        Replies.setState(Feature.State.DISABLED);
    }

    @Test
    public void givenTrue$setEnabled_whenQuery_thenShouldCallNativeApiWithEnabled() {
        // when
        rnModule.setEnabled(true);
        // then
        verify(Replies.class,times(1));
        Replies.setState(Feature.State.ENABLED);
    }

    @Test
    public void givenCallback$hasChats_whenQuery_thenShouldCallNativeApiAndInvokeCallback() {
        // when
        Callback callback = mock(Callback.class);
        rnModule.hasChats(callback);
        // then
        verify(Replies.class,times(1));
        Replies.hasChats();
        verify(callback).invoke(any());
    }

    @Test
    public void given$show_whenQuery_thenShouldCallNativeApi() {
        // when
        rnModule.show();
        // then
        verify(Replies.class,times(1));
        Replies.show();
    }

    @Test
    public void given$setOnNewReplyReceivedHandler_whenQuery_thenShouldSetNativeCallback() {

        Callback callback = mock(Callback.class);
        // when
        rnModule.setOnNewReplyReceivedHandler(callback);
        // then
        verify(Replies.class,times(1));
        Replies.setOnNewReplyReceivedCallback(any(Runnable.class));
    }

    @Test
    public void givenCallback$getUnreadRepliesCount_whenQuery_thenShouldCallNativeApiAndInvokeCallback() {
        // when
        Callback callback = mock(Callback.class);
        rnModule.getUnreadRepliesCount(callback);
        // then
        verify(Replies.class,times(1));
        Replies.getUnreadRepliesCount();
        verify(callback).invoke(any());
    }

    @Test
    public void givenBoolean$setInAppNotificationsEnabled_whenQuery_thenShouldCallNativeApi() {
        // when
        rnModule.setInAppNotificationEnabled(true);
        // then
        verify(Replies.class,times(1));
        Replies.setInAppNotificationEnabled(true);
    }

    @Test
    public void givenBoolean$setInAppNotificationSound_whenQuery_thenShouldCallNativeApi() {
        // when
        rnModule.setInAppNotificationSound(true);
        // then
        verify(Replies.class,times(1));
        Replies.setInAppNotificationSound(true);
    }

    @Test
    public void givenBoolean$setPushNotificationRegistrationToken_whenQuery_thenShouldCallNativeApi() {
        // when
        rnModule.setPushNotificationRegistrationToken("123");
        // then
        verify(Replies.class,times(1));
        Replies.setPushNotificationRegistrationToken("123");
    }

    @Test
    public void givenBoolean$showNotification_whenQuery_thenShouldCallNativeApi() {
        // given
        MockedStatic mockClock = mockStatic(SystemClock.class);
        MockedStatic mockArgument = mockStatic(Arguments.class);

        // when
        when(Arguments.createMap())
                .thenAnswer(
                        new Answer<Object>() {
                            @Override
                            public Object answer(InvocationOnMock invocation) throws Throwable {
                                return new JavaOnlyMap();
                            }
                        });

        Map<String, String> map = new HashMap<>();
        when(Replies.isInstabugNotification(map))
                .thenAnswer(
                        new Answer<Object>() {
                            @Override
                            public Object answer(InvocationOnMock invocation) throws Throwable {
                                return true;
                            }
                        });

        WritableMap readableMap = MapUtil.toWritableMap(new HashMap<String, Object>());
        rnModule.showNotification(readableMap);

        verify(Replies.class,times(1));
        Replies.showNotification(map);
        mockArgument.close();
        mockClock.close();
    }

    @Test
    public void givenBoolean$setNotificationIcon_whenQuery_thenShouldCallNativeApi() {
        // when
        rnModule.setNotificationIcon(123);
        // then
        verify(Replies.class,times(1));
        Replies.setNotificationIcon(123);
    }

    @Test
    public void givenBoolean$setPushNotificationChannelId_whenQuery_thenShouldCallNativeApi() {
        // when
        rnModule.setPushNotificationChannelId("123");
        // then
        verify(Replies.class,times(1));
        Replies.setPushNotificationChannelId("123");
    }

    @Test
    public void givenBoolean$setSystemReplyNotificationSoundEnabled_whenQuery_thenShouldCallNativeApi() {
        // when
        rnModule.setSystemReplyNotificationSoundEnabled(true);
        // then
        verify(Replies.class,times(1));
        Replies.setSystemReplyNotificationSoundEnabled(true);
    }

}
