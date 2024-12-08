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
import org.mockito.stubbing.Answer;

import com.instabug.apm.InternalAPM;
import com.instabug.reactlibrary.utils.MainThreadHandler;

public class RNInstabugNetworkLoggerModuleTest {

    // Mock Objects
    private MockedStatic<Looper> mockLooper;
    private MockedStatic<MainThreadHandler> mockMainThreadHandler;
    private RNInstabugNetworkLoggerModule rnInstabugNetworkLoggerModule;
    private Promise mockPromise;

    @Before
    public void mockMainThreadHandler() {
        // Mock Object
        ReactApplicationContext mockReactApplicationContext = mock(ReactApplicationContext.class);
        mockPromise = mock(Promise.class);
        rnInstabugNetworkLoggerModule = new RNInstabugNetworkLoggerModule(mockReactApplicationContext);

        // Mock static functions
        mockLooper = mockStatic(Looper.class);
        mockMainThreadHandler = mockStatic(MainThreadHandler.class);
        // Mock Looper class
        Looper mockMainThreadLooper = mock(Looper.class);
        when(Looper.getMainLooper()).thenReturn(mockMainThreadLooper);

        // Override runOnMainThread
        Answer<Boolean> handlerPostAnswer = invocation -> {
            invocation.getArgument(0, Runnable.class).run();
            return true;
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
        String name = rnInstabugNetworkLoggerModule.getName();
        assertEquals("IBGNetworkLogger", name);
    }

    @Test
    public void testAddListener() {
        // Test addListener method
        rnInstabugNetworkLoggerModule.addListener("event_name");
        // Nothing to assert, but check no exceptions are thrown
    }

    @Test
    public void testRemoveListeners() {
        // Test removeListeners method
        rnInstabugNetworkLoggerModule.removeListeners(1);
        // Nothing to assert, but check no exceptions are thrown
    }

    @Test
    public void testIsNativeInterceptionEnabled_True() {

        // Mock InternalAPM behavior within the scope of this test
        try (MockedStatic<InternalAPM> internalAPMMock = mockStatic(InternalAPM.class)) {
            internalAPMMock.when(() -> InternalAPM._isFeatureEnabledCP(CP_NATIVE_INTERCEPTION_ENABLED, "")).thenReturn(true);

            // Execute the method
            rnInstabugNetworkLoggerModule.isNativeInterceptionEnabled(mockPromise);

            // Capture the Promise.resolve() call
            ArgumentCaptor<Boolean> captor = ArgumentCaptor.forClass(Boolean.class);
            verify(mockPromise).resolve(captor.capture());

            // Assert that true was passed to resolve
            internalAPMMock.verify(() -> InternalAPM._isFeatureEnabledCP(CP_NATIVE_INTERCEPTION_ENABLED, ""));
            assertTrue(captor.getValue());
        }
    }

    @Test
    public void testIsNativeInterceptionEnabled_False() {

        try (MockedStatic<InternalAPM> internalAPMMock = mockStatic(InternalAPM.class)) {
            internalAPMMock.when(() -> InternalAPM._isFeatureEnabledCP(CP_NATIVE_INTERCEPTION_ENABLED, "")).thenReturn(false);

            // Execute the method
            rnInstabugNetworkLoggerModule.isNativeInterceptionEnabled(mockPromise);

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
            internalAPMMock.when(() -> InternalAPM._isFeatureEnabledCP(anyString(), anyString())).thenThrow(new RuntimeException("Error"));

            // Execute the method
            rnInstabugNetworkLoggerModule.isNativeInterceptionEnabled(mockPromise);

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
            internalAPMMock.when(() -> InternalAPM._isFeatureEnabledCP(APM_NETWORK_PLUGIN_INSTALLED, "")).thenReturn(true);

            // Execute the method
            rnInstabugNetworkLoggerModule.hasAPMNetworkPlugin(mockPromise);

            // Capture the Promise.resolve() call
            ArgumentCaptor<Boolean> captor = ArgumentCaptor.forClass(Boolean.class);
            verify(mockPromise).resolve(captor.capture());

            // Assert that true was passed to resolve
            internalAPMMock.verify(() -> InternalAPM._isFeatureEnabledCP(APM_NETWORK_PLUGIN_INSTALLED, ""));
            assertTrue(captor.getValue());
        }
    }

    @Test
    public void testHasAPMNetworkPlugin_False() {

        try (MockedStatic<InternalAPM> internalAPMMock = mockStatic(InternalAPM.class)) {
            internalAPMMock.when(() -> InternalAPM._isFeatureEnabledCP(APM_NETWORK_PLUGIN_INSTALLED, "")).thenReturn(false);

            // Execute the method
            rnInstabugNetworkLoggerModule.hasAPMNetworkPlugin(mockPromise);

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
            internalAPMMock.when(() -> InternalAPM._isFeatureEnabledCP(anyString(), anyString())).thenThrow(new RuntimeException("Error"));

            // Execute the method
            rnInstabugNetworkLoggerModule.hasAPMNetworkPlugin(mockPromise);

            // Capture the Promise.resolve() call in case of an exception
            ArgumentCaptor<Boolean> captor = ArgumentCaptor.forClass(Boolean.class);
            verify(mockPromise).resolve(captor.capture());

            // Assert that false was passed to resolve when exception occurs
            assertFalse(captor.getValue());
        }
    }

    @Test
    public void testRegisterNetworkLogsListenerCalled() {
        try (MockedStatic<InternalAPM> internalAPMMock = mockStatic(InternalAPM.class)) {
            // Run the method
            rnInstabugNetworkLoggerModule.registerNetworkLogsListener();

            // Verify the sanitizer was registered
            internalAPMMock.verify(() -> InternalAPM._registerNetworkLogSanitizer(any()));
        }
    }


    @Test
    public void testUpdateNetworkLogSnapshotInvalidJson() {
        String invalidJsonString = "{\"id\":\"testId\"";

        assertThrows(RuntimeException.class, () -> rnInstabugNetworkLoggerModule.updateNetworkLogSnapshot(invalidJsonString));
    }
}
