package com.instabug.reactlibrary;

import android.os.Handler;
import android.os.Looper;
import android.os.SystemClock;

import com.facebook.react.bridge.Arguments;
import com.instabug.chat.Chats;
import com.instabug.library.Feature;
import com.instabug.reactlibrary.utils.InstabugUtil;
import com.instabug.reactlibrary.utils.MainThreadHandler;


import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.internal.verification.VerificationModeFactory;
import org.mockito.invocation.InvocationOnMock;
import org.mockito.stubbing.Answer;
import org.powermock.api.mockito.PowerMockito;
import org.powermock.core.classloader.annotations.PrepareForTest;
import org.powermock.modules.junit4.PowerMockRunner;

import static org.mockito.Matchers.any;
import static org.mockito.Matchers.anyLong;
import static org.powermock.api.mockito.PowerMockito.doAnswer;
import static org.powermock.api.mockito.PowerMockito.mock;
import static org.powermock.api.mockito.PowerMockito.when;

@RunWith(PowerMockRunner.class)
@PrepareForTest({Looper.class, android.os.Handler.class, Chats.class, SystemClock.class, RNInstabugChatsModule.class, Arguments.class, InstabugUtil.class, MainThreadHandler.class})


public class RNInstabugChatsModuleTest {
    private RNInstabugChatsModule chatsModule = new RNInstabugChatsModule(null);

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

    /********Chats*********/

    @Test
    public void givenFalse$setChatsEnabled_whenQuery_thenShouldCallNativeApiWithDisabled() {
        // given
        PowerMockito.mockStatic(Chats.class);
        // when
        chatsModule.setEnabled(false);
        // then
        PowerMockito.verifyStatic(VerificationModeFactory.times(1));
        Chats.setState(Feature.State.DISABLED);
    }

    @Test
    public void givenTrue$setChatsEnabled_whenQuery_thenShouldCallNativeApiWithEnabled() {
        // given
        PowerMockito.mockStatic(Chats.class);
        // when
        chatsModule.setEnabled(true);
        // then
        PowerMockito.verifyStatic(VerificationModeFactory.times(1));
        Chats.setState(Feature.State.ENABLED);
    }

    @Test
    public void given$showChats_whenQuery_thenShouldCallNativeApi() {
        // given
        PowerMockito.mockStatic(Chats.class);
        // when
        chatsModule.show();
        // then
        PowerMockito.verifyStatic(VerificationModeFactory.times(1));
        Chats.show();
    }

}
