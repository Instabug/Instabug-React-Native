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
     * <p>
     *     This method is used for setting up the SDK's native side initialization in our MainApplication.
     *     It helps capture problems that occur before the React-Native bridge is established.
     *     This offers an alternative to the {@link RNInstabugReactnativeModule#init}.
     *     It catches start-up crashes that might slip.
     *     This is due to a gap between the native app launch and the initialization of the react-native.
     * </p>
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
     * RNInstabug.initNativeSdk(
     *     this,
     *     "f23c....",
     *     LogLevel.VERBOSE,
     *     InstabugInvocationEvent.SHAKE,
     *     ... // Other invocation events
     * );
     * </pre></blockquote>
     *
     * @example <p> you can pass an empty string in place of the last argument logLevel param and also
     * {@link InstabugInvocationEvent#NONE} to disable all invocation events:</p>
     *
     * <blockquote><pre>
     * RNInstabug.initNativeSdk(
     *     this,
     *     "f23c....",
     *     new InstabugInvocationEvent[]{
     *         InstabugInvocationEvent.NONE,
     *     },
     *     ""
     * );
     * </pre></blockquote>
     *
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

    @VisibleForTesting
    public void setCurrentPlatform() {
        try {
            Method method = InstabugUtil.getMethod(Class.forName("com.instabug.library.Instabug"), "setCurrentPlatform", int.class);
            if (method != null) {
                Log.i("IB-CP-Bridge", "invoking setCurrentPlatform with platform: " + Platform.RN);
                method.invoke(null, Platform.RN);
            } else {
                Log.e("IB-CP-Bridge", "setCurrentPlatform was not found by reflection");
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
        } catch (ClassNotFoundException e) {
            e.printStackTrace();
        } catch (IllegalAccessException e) {
            e.printStackTrace();
        } catch (InvocationTargetException e) {
            e.printStackTrace();
        }
    }
}
