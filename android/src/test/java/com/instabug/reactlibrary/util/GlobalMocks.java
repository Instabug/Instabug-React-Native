package com.instabug.reactlibrary.util;

import static com.facebook.react.bridge.ReadableType.Map;
import static org.mockito.Mockito.mockStatic;

import android.util.Log;

import com.instabug.crash.models.IBGNonFatalException;
import com.instabug.reactlibrary.utils.InstabugUtil;

import org.json.JSONObject;
import org.mockito.MockedStatic;

import java.lang.reflect.Method;
import java.util.Map;

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

        Method mCrashReportException = MockReflected.class.getDeclaredMethod("reportException", JSONObject.class, boolean.class, java.util.Map.class, JSONObject.class, IBGNonFatalException.Level.class);
        mCrashReportException.setAccessible(true);
        reflection
                .when(() -> InstabugUtil.getMethod(Class.forName("com.instabug.crash.CrashReporting"), "reportException", JSONObject.class,
                        boolean.class, java.util.Map.class, JSONObject.class, IBGNonFatalException.Level.class))
                .thenReturn(mCrashReportException);
    }

    public static void close() {
        log.close();
        reflection.close();
        reflected.close();
    }
}
