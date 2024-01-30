package com.instabug.reactlibrary;

import static com.instabug.reactlibrary.utils.InstabugUtil.getMethod;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.instabug.crash.CrashReporting;
import com.instabug.crash.models.IBGNonFatalException;
import com.instabug.library.Feature;
import com.instabug.library.Instabug;
import com.instabug.reactlibrary.utils.MainThreadHandler;

import org.json.JSONObject;

import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;
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
     * Send unhandled exception
     *
     * @param throwable      throwable the original [Throwable] that should be reported.
     * @param userAttributes The user attributes to be added to the report.
     * @param fingerprint The fingerprint that'll be used to override Instabug's default grouping algorithm
     * @param level The severity [Level] to be assigned to the report.
     */
    public static void sendUnHandledCrash(@Nonnull Throwable throwable, Map<String, String> userAttributes, String fingerprint, IBGNonFatalException.Level level) {
        try {
            IBGNonFatalException.Builder builder = new IBGNonFatalException.Builder(throwable);
            if(userAttributes!=null){
                builder.setUserAttributes(userAttributes);
            }
            if(fingerprint!=null){
                builder.setFingerprint(fingerprint);
            }
            if(level!=null){
                builder.setLevel(level);
            }

            CrashReporting.report(builder.build());
        } catch (Exception e) {
            e.printStackTrace();
        }
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
     * @param promise         This makes sure that the RN side crashes the app only after the Android SDK
     *                        finishes processing/handling the crash.
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
     */
    @ReactMethod
    public void sendHandledJSCrash(final String exceptionObject) {
        try {
            JSONObject jsonObject = new JSONObject(exceptionObject);
            sendJSCrashByReflection(jsonObject, true, null);
        } catch (Exception e) {
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
}
