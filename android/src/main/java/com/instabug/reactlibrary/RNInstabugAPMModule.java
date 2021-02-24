
package com.instabug.reactlibrary;

import android.os.Handler;
import android.os.Looper;
import android.os.SystemClock;

import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.instabug.apm.APM;
import com.instabug.apm.model.ExecutionTrace;
import com.instabug.bug.BugReporting;
import com.instabug.chat.Chats;
import com.instabug.library.Feature;
import com.instabug.reactlibrary.utils.InstabugUtil;
import com.instabug.reactlibrary.utils.MainThreadHandler;

import java.util.HashMap;

import javax.annotation.Nonnull;

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
}
