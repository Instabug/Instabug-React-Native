
package com.instabug.reactlibrary;

import android.os.Handler;
import android.os.Looper;
import android.os.SystemClock;
import android.util.Log;

import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.instabug.apm.APM;
import com.instabug.apm.model.ExecutionTrace;
import com.instabug.apm.networking.APMNetworkLogger;
import com.instabug.bug.BugReporting;
import com.instabug.library.Feature;
import com.instabug.reactlibrary.utils.InstabugUtil;
import com.instabug.reactlibrary.utils.MainThreadHandler;

import org.json.JSONException;
import org.json.JSONObject;

import java.io.File;
import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;

import java.io.File;
import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Locale;
import java.util.Map;
import com.instabug.library.Platform;

import javax.annotation.Nonnull;

import static com.instabug.reactlibrary.utils.InstabugUtil.getMethod;

public class RNInstabugAPMModule extends ReactContextBaseJavaModule {

    public RNInstabugAPMModule(ReactApplicationContext reactApplicationContext) {
        super(reactApplicationContext);
    }
    HashMap<String, ExecutionTrace> traces = new HashMap<String, ExecutionTrace>();

    @Nonnull
    @Override
    public String getName() {
        return "IBGAPM";
    }

    /**
     * Sets the printed logs priority. Filter to one of the following levels.
     *
     * @param logLevel the priority level.
     */
    @ReactMethod
    public void ibgSleep() {
        MainThreadHandler.runOnMainThread(new Runnable() {
            @Override
            public void run() {
                SystemClock.sleep(3000);
            }
        });
    }

    /**
     * Sets the printed logs priority. Filter to one of the following levels.
     *
     * @param logLevel the priority level.
     */
    @ReactMethod
    public void setLogLevel(final String logLevel) {
        MainThreadHandler.runOnMainThread(new Runnable() {
            @Override
            public void run() {
                try {
                    if (ArgsRegistry.getDeserializedValue(logLevel, Integer.class) == null) {
                        return;
                    }
                    APM.setLogLevel((int) ArgsRegistry.getRawValue(logLevel));
                } catch (Exception e) {
                    e.printStackTrace();
                }
            }
        });
    }

    /**
     * Enables or disables APM.
     * @param isEnabled boolean indicating enabled or disabled.
     */
    @ReactMethod
    public void setEnabled(final boolean isEnabled) {
        MainThreadHandler.runOnMainThread(new Runnable() {
            @Override
            public void run() {
                try {
                    APM.setEnabled(isEnabled);
                } catch (Exception e) {
                    e.printStackTrace();
                }
            }
        });
    }

    /**
     * Enables or disables app launch tracking.
     * @param isEnabled boolean indicating enabled or disabled.
     */
    @ReactMethod
    public void setAppLaunchEnabled(final boolean isEnabled) {
        MainThreadHandler.runOnMainThread(new Runnable() {
            @Override
            public void run() {
                try {
                    APM.setAppLaunchEnabled(isEnabled);
                } catch (Exception e) {
                    e.printStackTrace();
                }
            }
        });
    }

    /**
     * Ends app launch
     */
    @ReactMethod
    public void endAppLaunch() {
        MainThreadHandler.runOnMainThread(new Runnable() {
            @Override
            public void run() {
                try {
                    APM.endAppLaunch();
                } catch (Exception e) {
                    e.printStackTrace();
                }
            }
        });
    }

    /**
     * Enables or disables auto UI tracing
     * @param isEnabled boolean indicating enabled or disabled.
     */
    @ReactMethod
    public void setAutoUITraceEnabled(final boolean isEnabled) {
        MainThreadHandler.runOnMainThread(new Runnable() {
            @Override
            public void run() {
                try {
                    APM.setAutoUITraceEnabled(isEnabled);
                } catch (Exception e) {
                    e.printStackTrace();
                }
            }
        });
    }

    /**
     * Starts an execution trace
     * @param name string name of the trace.
     */
    @ReactMethod
    public void startExecutionTrace(final String name, final String id, final Callback callback) {
        MainThreadHandler.runOnMainThread(new Runnable() {
            @Override
            public void run() {
                try {
                    String result = "";
                    ExecutionTrace trace = APM.startExecutionTrace(name);
                    if (trace != null) {
                        result = id;
                        traces.put(id, trace);
                    }
                    callback.invoke(result);
                } catch (Exception e) {
                    e.printStackTrace();
                }
            }
        });
    }

    /**
     * Adds a new attribute to trace
     * @param id String id of the trace.
     * @param key   attribute key
     * @param value attribute value. Null to remove attribute
     */
    @ReactMethod
    public void setExecutionTraceAttribute(final String id, final String key, final String value) {
        MainThreadHandler.runOnMainThread(new Runnable() {
            @Override
            public void run() {
                try {
                    traces.get(id).setAttribute(key, value);
                } catch (Exception e) {
                    e.printStackTrace();
                }
            }
        });
    }

    /**
     * Ends a trace
     * @param id string id of the trace.
     */
    @ReactMethod
    public void endExecutionTrace(final String id) {
        MainThreadHandler.runOnMainThread(new Runnable() {
            @Override
            public void run() {
                try {
                    traces.get(id).end();
                } catch (Exception e) {
                    e.printStackTrace();
                }
            }
        });
    }

    /**
     * Starts a UI trace
     * @param name string name of the UI trace.
     */
    @ReactMethod
    public void startUITrace(final String name) {
        MainThreadHandler.runOnMainThread(new Runnable() {
            @Override
            public void run() {
                try {
                    APM.startUITrace(name);
                } catch (Exception e) {
                    e.printStackTrace();
                }
            }
        });
    }

    /**
     * Ends the current running UI trace
     */
    @ReactMethod
    public void endUITrace() {
        MainThreadHandler.runOnMainThread(new Runnable() {
            @Override
            public void run() {
                try {
                    APM.endUITrace();
                } catch (Exception e) {
                    e.printStackTrace();
                }
            }
        });
    }

    /**
    *  Send Apm network log by Reflection 
    */
    @ReactMethod
    public void networkLog(String networkData) throws JSONException {
        try{
            APMNetworkLogger apmNetworkLogger = new APMNetworkLogger();
            JSONObject jsonObject = new JSONObject(networkData);
            final String requestUrl = (String) jsonObject.get("url");
            final String requestBody = (String) jsonObject.get("requestBody");
            final String responseBody = (String) jsonObject.get("responseBody");
            final String requestMethod = (String) jsonObject.get("method");
            //--------------------------------------------
            final String requestContentType = (String) jsonObject.get("requestContentType");
            final String responseContentType = (String) jsonObject.get("contentType");
            //--------------------------------------------
            final long requestBodySize = ((Number) jsonObject.get("requestBodySize")).longValue();
            final long responseBodySize = ((Number) jsonObject.get("responseBodySize")).longValue();
            //--------------------------------------------
            final String errorDomain = (String) jsonObject.get("errorDomain");
            final Integer statusCode = (Integer) jsonObject.get("responseCode");
            final long requestDuration = ((Number) jsonObject.get("duration")).longValue();
            final long requestStartTime = ((Number) jsonObject.get("startTime")).longValue() * 1000;
            final String requestHeaders = (String) jsonObject.get("requestHeaders").toString(); 
            final String responseHeaders = (String) jsonObject.get("responseHeaders").toString(); 
            final String errorMessage;
            if(errorDomain.equals("")) {
                errorMessage = null;
            } else {
                errorMessage = errorDomain;
            }
            //--------------------------------------------
            String gqlQueryName = null;
            if(jsonObject.has("gqlQueryName")){
                gqlQueryName = (String) jsonObject.get("gqlQueryName");
            } 
            final String serverErrorMessage = (String) jsonObject.get("serverErrorMessage");
            
            try {
                Method method = getMethod(Class.forName("com.instabug.apm.networking.APMNetworkLogger"), "log", long.class, long.class, String.class, String.class, long.class, String.class, String.class, String.class, String.class, String.class, long.class, int.class, String.class, String.class, String.class, String.class);
                if (method != null) {
                    method.invoke(apmNetworkLogger, requestStartTime, requestDuration, requestHeaders, requestBody, requestBodySize, requestMethod, requestUrl, requestContentType, responseHeaders, responseBody, responseBodySize, statusCode, responseContentType, errorMessage, gqlQueryName, serverErrorMessage);
                } else {
                    Log.e("IB-CP-Bridge", "apmNetworkLogByReflection was not found by reflection");
                }
            } catch (ClassNotFoundException e) {
                e.printStackTrace();
            } catch (IllegalAccessException e) {
                e.printStackTrace();
            } catch (InvocationTargetException e) {
                e.printStackTrace();
            }
        }
        catch(Exception e) {
            e.printStackTrace();
        }
    }
}
