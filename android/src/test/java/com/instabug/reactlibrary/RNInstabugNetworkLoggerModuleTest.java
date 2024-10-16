package com.instabug.reactlibrary;

import static com.instabug.apm.configuration.cp.APMFeature.APM_NETWORK_PLUGIN_INSTALLED;
import static com.instabug.apm.configuration.cp.APMFeature.CP_NATIVE_INTERCEPTION_ENABLED;
import static org.mockito.Mockito.*;
import static org.junit.Assert.*;

import android.os.Looper;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;

import org.junit.After;
import org.junit.Before;
import org.junit.Test;
import org.mockito.ArgumentCaptor;
import org.mockito.MockedStatic;
import org.mockito.Mockito;
import org.mockito.invocation.InvocationOnMock;
import org.mockito.stubbing.Answer;

import com.instabug.apm.InternalAPM;
import com.instabug.reactlibrary.utils.MainThreadHandler;

import java.util.concurrent.Executors;
import java.util.concurrent.ScheduledExecutorService;

public class RNInstabugNetworkLoggerModuleTest {

    // Mock MainThread
    private final static ScheduledExecutorService mainThread = Executors.newSingleThreadScheduledExecutor();

    // Mock Objects
    private MockedStatic<Looper> mockLooper;
    private MockedStatic<MainThreadHandler> mockMainThreadHandler;
    private RNInstabugNetworkLoggerModule networkLoggerModule;
    private Promise mockPromise;

    @Before
    public void mockMainThreadHandler() throws Exception {
        // Mock Object
        ReactApplicationContext mockReactApplicationContext = mock(ReactApplicationContext.class);
        mockPromise = mock(Promise.class);
        networkLoggerModule = new RNInstabugNetworkLoggerModule(mockReactApplicationContext);

        // Mock static functions
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
    }


    @Test
    public void testGetName() {
        // Test the getName method
        String name = networkLoggerModule.getName();
        assertEquals("IBGNetworkLogger", name);
    }

    @Test
    public void testAddListener() {
        // Test addListener method
        networkLoggerModule.addListener("event_name");
        // Nothing to assert, but check no exceptions are thrown
    }

    @Test
    public void testRemoveListeners() {
        // Test removeListeners method
        networkLoggerModule.removeListeners(1);
        // Nothing to assert, but check no exceptions are thrown
    }

    @Test
    public void testIsNativeInterceptionEnabled_True() {


        // Mock InternalAPM behavior within the scope of this test
        try (MockedStatic<InternalAPM> internalAPMMock = mockStatic(InternalAPM.class)) {
            internalAPMMock.when(() -> InternalAPM._isFeatureEnabledCP(CP_NATIVE_INTERCEPTION_ENABLED, ""))
                    .thenReturn(true);

            // Execute the method
            networkLoggerModule.isNativeInterceptionEnabled(mockPromise);

            // Capture the Promise.resolve() call
            ArgumentCaptor<Boolean> captor = ArgumentCaptor.forClass(Boolean.class);
            verify(mockPromise).resolve(captor.capture());

            // Assert that true was passed to resolve
            assertTrue(captor.getValue());
        }
    }

    @Test
    public void testIsNativeInterceptionEnabled_False() {


        try (MockedStatic<InternalAPM> internalAPMMock = mockStatic(InternalAPM.class)) {
            internalAPMMock.when(() -> InternalAPM._isFeatureEnabledCP(CP_NATIVE_INTERCEPTION_ENABLED, ""))
                    .thenReturn(false);

            // Execute the method
            networkLoggerModule.isNativeInterceptionEnabled(mockPromise);

            // Capture the Promise.resolve() call
            ArgumentCaptor<Boolean> captor = ArgumentCaptor.forClass(Boolean.class);
            verify(mockPromise).resolve(captor.capture());

            // Assert that false was passed to resolve
            assertFalse(captor.getValue());
        }
    }

    @Test
    public void testIsNativeInterceptionEnabled_Exception() {


        // Simulate an exception in InternalAPM
        try (MockedStatic<InternalAPM> internalAPMMock = mockStatic(InternalAPM.class)) {
            internalAPMMock.when(() -> InternalAPM._isFeatureEnabledCP(anyString(), anyString()))
                    .thenThrow(new RuntimeException("Error"));

            // Execute the method
            networkLoggerModule.isNativeInterceptionEnabled(mockPromise);

            // Capture the Promise.resolve() call in case of an exception
            ArgumentCaptor<Boolean> captor = ArgumentCaptor.forClass(Boolean.class);
            verify(mockPromise).resolve(captor.capture());

            // Assert that false was passed to resolve when exception occurs
            assertFalse(captor.getValue());
        }
    }

    @Test
    public void testHasAPMNetworkPlugin_True() {


        try (MockedStatic<InternalAPM> internalAPMMock = mockStatic(InternalAPM.class)) {
            internalAPMMock.when(() -> InternalAPM._isFeatureEnabledCP(APM_NETWORK_PLUGIN_INSTALLED, ""))
                    .thenReturn(true);

            // Execute the method
            networkLoggerModule.hasAPMNetworkPlugin(mockPromise);

            // Capture the Promise.resolve() call
            ArgumentCaptor<Boolean> captor = ArgumentCaptor.forClass(Boolean.class);
            verify(mockPromise).resolve(captor.capture());

            // Assert that true was passed to resolve
            assertTrue(captor.getValue());
        }
    }

    @Test
    public void testHasAPMNetworkPlugin_False() {


        try (MockedStatic<InternalAPM> internalAPMMock = mockStatic(InternalAPM.class)) {
            internalAPMMock.when(() -> InternalAPM._isFeatureEnabledCP(APM_NETWORK_PLUGIN_INSTALLED, ""))
                    .thenReturn(false);

            // Execute the method
            networkLoggerModule.hasAPMNetworkPlugin(mockPromise);

            // Capture the Promise.resolve() call
            ArgumentCaptor<Boolean> captor = ArgumentCaptor.forClass(Boolean.class);
            verify(mockPromise).resolve(captor.capture());

            // Assert that false was passed to resolve
            assertFalse(captor.getValue());
        }
    }

    @Test
    public void testHasAPMNetworkPlugin_Exception() {


        // Simulate an exception in InternalAPM
        try (MockedStatic<InternalAPM> internalAPMMock = mockStatic(InternalAPM.class)) {
            internalAPMMock.when(() -> InternalAPM._isFeatureEnabledCP(anyString(), anyString()))
                    .thenThrow(new RuntimeException("Error"));

            // Execute the method
            networkLoggerModule.hasAPMNetworkPlugin(mockPromise);

            // Capture the Promise.resolve() call in case of an exception
            ArgumentCaptor<Boolean> captor = ArgumentCaptor.forClass(Boolean.class);
            verify(mockPromise).resolve(captor.capture());

            // Assert that false was passed to resolve when exception occurs
            assertFalse(captor.getValue());
        }
    }
}
