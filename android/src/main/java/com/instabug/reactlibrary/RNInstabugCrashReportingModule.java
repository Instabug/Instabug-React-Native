package com.instabug.reactlibrary;

import static com.instabug.reactlibrary.utils.InstabugUtil.getMethod;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.instabug.crash.CrashReporting;
import com.instabug.library.Feature;
import com.instabug.reactlibrary.utils.MainThreadHandler;

import org.json.JSONObject;

import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;

import javax.annotation.Nonnull;

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
     */
    @ReactMethod
    public void sendJSCrash(final String exceptionObject) {
        try {
            JSONObject jsonObject = new JSONObject(exceptionObject);
            sendJSCrashByReflection(jsonObject, false);
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
            sendJSCrashByReflection(jsonObject, true);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

     private void sendJSCrashByReflection(final JSONObject exceptionObject, final boolean isHandled) {
         MainThreadHandler.runOnMainThread(new Runnable() {
             @Override
             public void run() {
                 try {
                     Method method = getMethod(Class.forName("com.instabug.crash.CrashReporting"), "reportException", JSONObject.class, boolean.class);
                     if (method != null) {
                         method.invoke(null, exceptionObject, isHandled);
                         RNInstabugReactnativeModule.currentReport = null;
                     }
                 } catch (ClassNotFoundException e) {
                     e.printStackTrace();
                 } catch (IllegalAccessException e) {
                     e.printStackTrace();
                 } catch (InvocationTargetException e) {
                     e.printStackTrace();
                 }
             }
         });

    }
}
