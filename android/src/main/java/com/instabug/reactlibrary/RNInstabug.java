package com.instabug.reactlibrary;

import android.app.Application;
import android.util.Log;

import androidx.annotation.NonNull;
import androidx.annotation.VisibleForTesting;

import com.instabug.apm.APM;
import com.instabug.library.Instabug;
import com.instabug.library.LogLevel;
import com.instabug.library.Platform;
import com.instabug.library.invocation.InstabugInvocationEvent;
import com.instabug.reactlibrary.utils.InstabugUtil;

import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;

public class RNInstabug {

    private static RNInstabug instance;
    
    private RNInstabug() {}


    public static RNInstabug getInstance() {
        if (instance == null) {
            synchronized (RNInstabug.class) {
                if (instance == null) {
                    instance = new RNInstabug();
                }
            }
        }
        return instance;
    }

    /**
     * Initializes the SDK on the native side, which is useful for capturing startup issues specific to the native part of the app.
     *
     * @param application The application context.
     * @param applicationToken The app's identifying token, available on your dashboard.
     * @param logLevel The level of detail in logs that you want to print.
     *      <p>Pick one of the log levels described in {@link LogLevel}.
     *      default logLevel is {@link LogLevel#ERROR}</p>
     * @param instabugInvocationEvent The events that trigger the SDK's user interface.
     *      Choose from the available events listed in {@link InstabugInvocationEvent}.
     *
     * @example <p>Here's an example usage: </p>
     * <blockquote><pre>
     * RNInstabug.getInstance().init(
     *     this,
     *     "your_token_here",
     *     LogLevel.VERBOSE,
     *     InstabugInvocationEvent.SHAKE,
     *     ... // Other invocation events
     * );
     * </pre></blockquote>
     */
    public void init(
            @NonNull Application application,
            @NonNull String applicationToken,
            int logLevel,
            @NonNull InstabugInvocationEvent... instabugInvocationEvent
    ) {
        try {

            setBaseUrlForDeprecationLogs();
            setCurrentPlatform();

            new Instabug.Builder(application, applicationToken, instabugInvocationEvent)
                    .setSdkDebugLogsLevel(logLevel)
                    .build();

            // Temporarily disabling APM hot launches
            APM.setHotAppLaunchEnabled(false);
        } catch (Exception e) {
            e.printStackTrace();
        }

    }



    /**
     * Initializes the SDK on the native side, which is useful for capturing startup issues specific to the native part of the app.
     *
     * @param application The application context.
     * @param applicationToken The app's identifying token, available on your dashboard.
     * @param invocationEvent The events that trigger the SDK's user interface.
     *      Choose from the available events listed in {@link InstabugInvocationEvent}.
     *
     * @example <p>Here's an example usage: </p>
     * <blockquote><pre>
     * RNInstabug.getInstance().init(
     *     this,
     *     "your_token_here",
     *     InstabugInvocationEvent.SHAKE,
     *     ... // Other invocation events
     * );
     * </pre></blockquote>
     */
    public void init(
            @NonNull Application application,
            @NonNull String applicationToken,
            @NonNull InstabugInvocationEvent... invocationEvent
    ) {
        init(application, applicationToken, LogLevel.ERROR, invocationEvent);
    }

    @VisibleForTesting
    public void setCurrentPlatform() {
        try {
            Method method = InstabugUtil.getMethod(Class.forName("com.instabug.library.Instabug"), "setCurrentPlatform", int.class);
            if (method != null) {
                Log.i("IBG-CP-Bridge", "invoking setCurrentPlatform with platform: " + Platform.RN);
                method.invoke(null, Platform.RN);
            } else {
                Log.e("IBG-CP-Bridge", "setCurrentPlatform was not found by reflection");
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    @VisibleForTesting
    public void setBaseUrlForDeprecationLogs() {
        try {
            Method method = InstabugUtil.getMethod(Class.forName("com.instabug.library.util.InstabugDeprecationLogger"), "setBaseUrl", String.class);
            if (method != null) {
                method.invoke(null, "https://docs.instabug.com/docs/react-native-sdk-migration-guide");
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
