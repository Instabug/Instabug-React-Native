package com.instabug.reactlibrary.util;

import static com.instabug.reactlibrary.utils.InstabugUtil.getMethod;
import static org.mockito.Mockito.mockStatic;

import android.graphics.Bitmap;
import android.util.Log;

import com.instabug.library.networkDiagnostics.model.NetworkDiagnosticsCallback;
import com.instabug.reactlibrary.utils.InstabugUtil;

import org.mockito.MockedStatic;

import java.lang.reflect.Method;

public class GlobalMocks {
    public static MockedStatic<Log> log;
    private static MockedStatic<InstabugUtil> reflection;
    public static MockedStatic<MockReflected> reflected;

    public static void setUp() throws NoSuchMethodException {
        // Log mock
        log = mockStatic(Log.class);

        // Reflection mock
        reflection = mockStatic(InstabugUtil.class);
        reflected = mockStatic(MockReflected.class);

        Method mSetCurrentPlatform = MockReflected.class.getDeclaredMethod("setCurrentPlatform", int.class);
        mSetCurrentPlatform.setAccessible(true);

        // setCurrentPlatform mock
        reflection
                .when(() -> InstabugUtil.getMethod(Class.forName("com.instabug.library.Instabug"), "setCurrentPlatform", int.class))
                .thenReturn(mSetCurrentPlatform);

        // setBaseUrl mock
        Method mSetBaseUrl = MockReflected.class.getDeclaredMethod("setBaseUrl", String.class);
        mSetBaseUrl.setAccessible(true);
        reflection
                .when(() -> InstabugUtil.getMethod(Class.forName("com.instabug.library.util.InstabugDeprecationLogger"), "setBaseUrl", String.class))
                .thenReturn(mSetBaseUrl);

        // setNetworkDiagnosticsCallback mock
        Method mSetNetworkDiagnosticsCallback = MockReflected.class.getDeclaredMethod("setNetworkDiagnosticsCallback", NetworkDiagnosticsCallback.class);
        mSetNetworkDiagnosticsCallback.setAccessible(true);
        reflection
                .when(() -> InstabugUtil.getMethod(Class.forName("com.instabug.library.Instabug"), "setNetworkDiagnosticsCallback", NetworkDiagnosticsCallback.class))
                .thenReturn(mSetNetworkDiagnosticsCallback);

        // reportCurrentViewChange mock
        Method mReportCurrentViewChange = MockReflected.class.getDeclaredMethod("reportCurrentViewChange", String.class);
        mReportCurrentViewChange.setAccessible(true);

        reflection
                .when(() -> InstabugUtil.getMethod(Class.forName("com.instabug.library.Instabug"), "reportCurrentViewChange", String.class))
                .thenReturn(mReportCurrentViewChange);

        // reportScreenChange mock
        Method mReportScreenChange = MockReflected.class.getDeclaredMethod("reportScreenChange", Bitmap.class, String.class);
        mReportScreenChange.setAccessible(true);

        reflection
                .when(() -> InstabugUtil.getMethod(Class.forName("com.instabug.library.Instabug"), "reportScreenChange", Bitmap.class, String.class))
                .thenReturn(mReportScreenChange);
    }

    public static void close() {
        log.close();
        reflection.close();
        reflected.close();
    }
}
