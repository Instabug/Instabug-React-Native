
package com.instabug.reactlibrary;

import android.os.SystemClock;
import android.util.Log;

import androidx.annotation.NonNull;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.WritableMap;
import com.instabug.apm.APM;
import com.instabug.apm.configuration.cp.APMFeature;
import com.instabug.apm.configuration.cp.FeatureAvailabilityCallback;
import com.instabug.apm.model.ExecutionTrace;
import com.instabug.apm.networking.APMNetworkLogger;
import com.instabug.apm.networkinterception.cp.APMCPNetworkLog;
import com.instabug.apm.configuration.cp.FeaturesChangeListener;
import com.instabug.apm.configuration.cp.APMFeaturesAvailability;
import com.instabug.reactlibrary.utils.EventEmitterModule;
import com.instabug.reactlibrary.utils.MainThreadHandler;
import com.instabug.apm.InternalAPM;

import org.json.JSONException;
import org.json.JSONObject;
import java.lang.reflect.Method;

import java.util.HashMap;

import javax.annotation.Nonnull;

import static com.instabug.reactlibrary.utils.InstabugUtil.getMethod;

public class RNInstabugAPMModule extends EventEmitterModule {

    public RNInstabugAPMModule(ReactApplicationContext reactApplicationContext) {
        super(reactApplicationContext);
    }

    @Deprecated
    HashMap<String, ExecutionTrace> traces = new HashMap<String, ExecutionTrace>();

    @Nonnull
    @Override
    public String getName() {
        return "IBGAPM";
    }

    @ReactMethod
    public void addListener(String event) {
        super.addListener(event);
    }

    @ReactMethod
    public void removeListeners(Integer count) {
        super.removeListeners(count);
    }

    /**
     * Sets the printed logs priority. Filter to one of the following levels.
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
                    APM.setColdAppLaunchEnabled(isEnabled);
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
     * Starts an AppFlow with the specified name.
     * <br/>
     * On starting two flows with the same name the older flow will end with force abandon end reason.
     * AppFlow name cannot exceed 150 characters otherwise it's truncated,
     * leading and trailing whitespaces are also ignored.
     *
     * @param name AppFlow name. It can not be empty string or null.
     *             Starts a new AppFlow, if APM is enabled, feature is enabled
     *             and Instabug SDK is initialised.
     */
    @ReactMethod
    public void startFlow(@NonNull final String name) {
        MainThreadHandler.runOnMainThread(new Runnable() {
            @Override
            public void run() {
                try {
                    APM.startFlow(name);
                } catch (Exception e) {
                    e.printStackTrace();
                }
            }
        });
    }

    /**
     * Sets custom attributes for AppFlow with a given name.
     * <br/>
     * Setting an attribute value to null will remove its corresponding key if it already exists.
     * <br/>
     * Attribute key name cannot exceed 30 characters.
     * Leading and trailing whitespaces are also ignored.
     * Does not accept empty strings or null.
     * <br/>
     * Attribute value name cannot exceed 60 characters,
     * leading and trailing whitespaces are also ignored.
     * Does not accept empty strings.
     * <br/>
     * If a trace is ended, attributes will not be added and existing ones will not be updated.
     * <br/>
     *
     * @param name  AppFlow name. It can not be empty string or null
     * @param key   AppFlow attribute key. It can not be empty string or null
     * @param value AppFlow attribute value. It can not be empty string. Null to remove attribute
     */
    @ReactMethod
    public void setFlowAttribute(@NonNull final String name, @NonNull final String key, final String value) {
        MainThreadHandler.runOnMainThread(new Runnable() {
            @Override
            public void run() {
                try {
                    APM.setFlowAttribute(name, key, value);
                } catch (Exception e) {
                    e.printStackTrace();
                }
            }
        });
    }

    /**
     * Ends AppFlow with a given name.
     *
     * @param name AppFlow name to be ended. It can not be empty string or null
     */
    @ReactMethod
    public void endFlow(@NonNull final String name) {
        MainThreadHandler.runOnMainThread(new Runnable() {
            @Override
            public void run() {
                try {
                    APM.endFlow(name);
                } catch (Exception e) {
                    e.printStackTrace();
                }
            }
        });
    }

    /**
     * Starts an execution trace
     *
     * @param name string name of the trace.
     *
     * @deprecated see {@link #startFlow(String)}
     */
    @Deprecated
    @ReactMethod
    public void startExecutionTrace(final String name, final String id, final Promise promise) {
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
                    promise.resolve(result);
                } catch (Exception e) {
                    e.printStackTrace();
                    promise.resolve(null);
                }
            }
        });
    }

    /**
     * Adds a new attribute to trace
     *
     * @param id    String id of the trace.
     * @param key   attribute key
     * @param value attribute value. Null to remove attribute
     *
     * @deprecated see {@link #setFlowAttribute}
     */
    @Deprecated
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
     *
     * @param id string id of the trace.
     *
     * @deprecated see {@link #endFlow}
     */
    @Deprecated
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
    public void networkLog(String networkData, Boolean isW3cHeaderFound,Double partialId,Double networkStartTimeInSeconds,String W3CGeneratedHeader,String W3CCaughtHeader) throws JSONException {
        try{
            APMNetworkLogger apmNetworkLogger = new APMNetworkLogger();

            Long NetworkStartTime = null;
            Long PartialId=null;

            if (partialId.doubleValue() != 0.0){
                NetworkStartTime = networkStartTimeInSeconds.longValue();
                PartialId = partialId.longValue();
            }
            
            APMCPNetworkLog.W3CExternalTraceAttributes w3cExternalTraceAttributes =
                    new APMCPNetworkLog.W3CExternalTraceAttributes(isW3cHeaderFound,PartialId,NetworkStartTime,W3CGeneratedHeader,W3CCaughtHeader
                    );
                    
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
                Method method = getMethod(Class.forName("com.instabug.apm.networking.APMNetworkLogger"), "log", long.class, long.class, String.class, String.class, long.class, String.class, String.class, String.class, String.class, String.class, long.class, int.class, String.class, String.class, String.class, String.class,APMCPNetworkLog.W3CExternalTraceAttributes.class);
                if (method != null) {
                        method.invoke(apmNetworkLogger, requestStartTime, requestDuration, requestHeaders, requestBody, requestBodySize, requestMethod, requestUrl, requestContentType, responseHeaders, responseBody, responseBodySize, statusCode, responseContentType, errorMessage, gqlQueryName, serverErrorMessage,w3cExternalTraceAttributes);
                } else {
                    Log.e("IB-CP-Bridge", "apmNetworkLogByReflection was not found by reflection");
                }
            } catch (Throwable e) {
                e.printStackTrace();
            }
        }
        catch(Throwable e) {
            e.printStackTrace();
        }
    }

    /**
     * Register a listener for W3C flags value change
     */
    @ReactMethod
    public void registerW3CFlagsChangeListener(final Callback handler){

        MainThreadHandler.runOnMainThread(new Runnable() {
            @Override
            public void run() {
                try {
                    InternalAPM._registerCPFeaturesChangeListener(new FeaturesChangeListener() {
                        @Override
                        public void invoke(@NonNull APMFeaturesAvailability apmFeaturesAvailability) {
                            WritableMap params = Arguments.createMap();
                            params.putBoolean("isW3ExternalTraceIDEnabled", apmFeaturesAvailability.isW3CExternalTraceIdAvailable());
                            params.putBoolean("isW3ExternalGeneratedHeaderEnabled", apmFeaturesAvailability.getShouldAttachGeneratedHeader());
                            params.putBoolean("isW3CaughtHeaderEnabled", apmFeaturesAvailability.getShouldAttachCapturedHeader());

                            sendEvent(Constants.IBGAPM_ON_NEW_W3C_FLAGS_UPDATE_RECEIVED_CALLBACK, params);
                        }
                    });
                }
                catch (Exception e) {
                    e.printStackTrace();
                }

            }

        });
    }


    /**
     *  Get first time Value of W3ExternalTraceID flag
     */
    @ReactMethod
    public void isW3ExternalTraceIDEnabled(Promise promise){

        MainThreadHandler.runOnMainThread(new Runnable() {
            @Override
            public void run() {
                try {
                    promise.resolve(InternalAPM._isFeatureEnabledCP(APMFeature.W3C_EXTERNAL_TRACE_ID, " "));
                }
                catch (Exception e) {
                    e.printStackTrace();
                    promise.resolve(null);
                }

            }

        });
    }


    /**
     *  Get first time Value of W3ExternalGeneratedHeader flag
     */
    @ReactMethod
    public void isW3ExternalGeneratedHeaderEnabled(Promise promise){

        MainThreadHandler.runOnMainThread(new Runnable() {
            @Override
            public void run() {
                try {
                    promise.resolve(InternalAPM._isFeatureEnabledCP(APMFeature.W3C_GENERATED_HEADER_ATTACHING, " "));
                }
                catch (Exception e) {
                    e.printStackTrace();
                    promise.resolve(null);
                }

            }

        });
    }

    /**
     *  Get first time Value of W3CaughtHeader flag
     */
    @ReactMethod
    public void isW3CaughtHeaderEnabled(Promise promise){

        MainThreadHandler.runOnMainThread(new Runnable() {
            @Override
            public void run() {
                try {
                    promise.resolve(InternalAPM._isFeatureEnabledCP(APMFeature.W3C_CAPTURED_HEADER_ATTACHING,""));
                }
                catch (Exception e) {
                    e.printStackTrace();
                    promise.resolve(null);
                }

            }

        });
    }
}
