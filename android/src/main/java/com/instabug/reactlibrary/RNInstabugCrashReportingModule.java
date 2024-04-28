package com.instabug.reactlibrary;

import static com.instabug.reactlibrary.utils.InstabugUtil.getMethod;

import androidx.annotation.NonNull;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableMap;
import com.instabug.crash.CrashReporting;
import com.instabug.crash.models.IBGNonFatalException;
import com.instabug.library.Feature;
import com.instabug.reactlibrary.utils.MainThreadHandler;

import org.json.JSONObject;

import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;
import java.util.HashMap;
import java.util.Map;

import javax.annotation.Nonnull;
import javax.annotation.Nullable;

public class RNInstabugCrashReportingModule extends ReactContextBaseJavaModule {

    public RNInstabugCrashReportingModule(ReactApplicationContext reactApplicationContext) {
        super(reactApplicationContext);
    }

    @Nonnull
    @Override
    public String getName() {
        return "IBGCrashReporting";
    }

    /**
     * Sets whether crash reporting feature is Enabled or Disabled
     *
     * @param isEnabled Exception object to be sent to Instabug's servers
     */
    @ReactMethod
    public void setEnabled(final boolean isEnabled) {
        MainThreadHandler.runOnMainThread(new Runnable() {
            @Override
            public void run() {
                try {
                    if (isEnabled) {
                        CrashReporting.setState(Feature.State.ENABLED);
                    } else {
                        CrashReporting.setState(Feature.State.DISABLED);
                    }
                } catch (Exception e) {
                    e.printStackTrace();
                }
            }
        });
    }

    /**
     * Send unhandled JS error object
     *
     * @param exceptionObject Exception object to be sent to Instabug's servers
     * @param promise This makes sure that the RN side crashes the app only after the Android SDK
     *                finishes processing/handling the crash.
     */
    @ReactMethod
    public void sendJSCrash(final String exceptionObject, final Promise promise) {
        try {
            JSONObject jsonObject = new JSONObject(exceptionObject);
            sendJSCrashByReflection(jsonObject, false, new Runnable() {
                @Override
                public void run() {
                    promise.resolve(null);
                }
            });
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    /**
     * Send handled JS error object
     *
     * @param exceptionObject Exception object to be sent to Instabug's servers
     * @param userAttributes  (Optional) extra user attributes attached to the crash
     * @param fingerprint     (Optional) key used to customize how crashes are grouped together
     * @param levelType       different severity levels for errors
     */
    @ReactMethod
    public void sendHandledJSCrash(final String exceptionObject, @androidx.annotation.Nullable ReadableMap userAttributes, @androidx.annotation.Nullable String fingerprint, String levelType) {
        try {
            JSONObject jsonObject = new JSONObject(exceptionObject);
            MainThreadHandler.runOnMainThread(new Runnable() {
                @Override
                public void run() {
                    try {
                        Method method = getMethod(Class.forName("com.instabug.crash.CrashReporting"), "reportException", JSONObject.class, boolean.class,
                                Map.class, JSONObject.class, IBGNonFatalException.Level.class);
                        if (method != null) {
                            IBGNonFatalException.Level nonFatalExceptionLevelType = ArgsRegistry.nonFatalExceptionLevel.getOrDefault(levelType, IBGNonFatalException.Level.ERROR);
                            method.invoke(null, jsonObject, true, userAttributes == null ? null : userAttributes.toHashMap(), fingerprint == null ? null : CrashReporting.getFingerprintObject(fingerprint), nonFatalExceptionLevelType);

                            RNInstabugReactnativeModule.clearCurrentReport();
                        }
                    } catch (ClassNotFoundException | IllegalAccessException |
                             InvocationTargetException e) {
                        e.printStackTrace();
                    }
                }
            });
        } catch (Throwable e) {
            e.printStackTrace();
        }
    }

    private void sendJSCrashByReflection(final JSONObject exceptionObject, final boolean isHandled, @Nullable final Runnable onComplete) {
        MainThreadHandler.runOnMainThread(new Runnable() {
            @Override
            public void run() {
                try {
                    Method method = getMethod(Class.forName("com.instabug.crash.CrashReporting"), "reportException", JSONObject.class, boolean.class);
                    if (method != null) {
                        method.invoke(null, exceptionObject, isHandled);
                        RNInstabugReactnativeModule.clearCurrentReport();
                    }
                } catch (ClassNotFoundException e) {
                    e.printStackTrace();
                } catch (IllegalAccessException e) {
                    e.printStackTrace();
                } catch (InvocationTargetException e) {
                    e.printStackTrace();
                } finally {
                    if (onComplete != null) {
                        onComplete.run();
                    }
                }
            }
        });
    }

    /**
     * Enables and disables capturing native C++ NDK crash reporting.
     *
     * @param isEnabled boolean indicating enabled or disabled.
     */
    @ReactMethod
    public void setNDKCrashesEnabled(final boolean isEnabled) {
        MainThreadHandler.runOnMainThread(new Runnable() {
            @Override
            public void run() {
                try {
                    if (isEnabled) {
                        CrashReporting.setNDKCrashesState(Feature.State.ENABLED);
                    } else {
                        CrashReporting.setNDKCrashesState(Feature.State.DISABLED);
                    }
                } catch (Exception e) {
                    e.printStackTrace();
                }
            }
        });
    }
}
