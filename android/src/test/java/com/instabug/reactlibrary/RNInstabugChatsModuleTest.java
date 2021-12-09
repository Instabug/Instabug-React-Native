package com.instabug.reactlibrary;

import android.os.Looper;

import com.instabug.chat.Chats;
import com.instabug.library.Feature;
import com.instabug.reactlibrary.utils.MainThreadHandler;


import org.junit.After;
import org.junit.Before;
import org.junit.Test;
import org.mockito.MockedStatic;
import org.mockito.invocation.InvocationOnMock;
import org.mockito.stubbing.Answer;

import static org.mockito.Matchers.any;
import static org.mockito.Mockito.doAnswer;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.mockStatic;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;


public class RNInstabugChatsModuleTest {
    private RNInstabugChatsModule chatsModule = new RNInstabugChatsModule(null);

    // Mock Objects
    private MockedStatic<Looper> mockLooper;
    private MockedStatic <MainThreadHandler> mockMainThreadHandler;
    private MockedStatic <Chats> mockChats;

    @Before
    public void mockMainThreadHandler() throws Exception {
        // Mock static functions
        mockChats = mockStatic(Chats.class);
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
        doAnswer(handlerPostAnswer).when(MainThreadHandler.class);
        MainThreadHandler.runOnMainThread(any(Runnable.class));
    }
    @After
    public void tearDown() {
        // Remove static mocks
        mockLooper.close();
        mockMainThreadHandler.close();
        mockChats.close();
    }


    /********Chats*********/

    @Test
    public void givenFalse$setChatsEnabled_whenQuery_thenShouldCallNativeApiWithDisabled() {
        // when
        chatsModule.setEnabled(false);
        // then
        verify(Chats.class,times(1));
        Chats.setState(Feature.State.DISABLED);
    }

    @Test
    public void givenTrue$setChatsEnabled_whenQuery_thenShouldCallNativeApiWithEnabled() {
        // when
        chatsModule.setEnabled(true);
        // then
        verify(Chats.class,times(1));
        Chats.setState(Feature.State.ENABLED);
    }

    @Test
    public void given$showChats_whenQuery_thenShouldCallNativeApi() {
        // when
        chatsModule.show();
        // then
        verify(Chats.class,times(1));
        Chats.show();
    }

}
