package com.instabug.reactlibrary.util;

import static org.mockito.Mockito.mockStatic;

import android.util.Log;

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
    }

    public static void close() {
        log.close();
        reflection.close();
        reflected.close();
    }
}
