package com.instabug.reactlibrary;


import static com.instabug.apm.configuration.cp.APMFeature.APM_NETWORK_PLUGIN_INSTALLED;
import static com.instabug.apm.configuration.cp.APMFeature.CP_NATIVE_INTERCEPTION_ENABLED;
import static com.instabug.apm.configuration.cp.APMFeature.NETWORK_INTERCEPTION_ENABLED;

import androidx.annotation.NonNull;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.bridge.WritableNativeMap;
import com.instabug.apm.InternalAPM;
import com.instabug.apm.sanitization.AsyncSanitizer;
import com.instabug.apm.sanitization.OnCompleteCallback;
import com.instabug.library.logging.listeners.networklogs.NetworkLogSnapshot;
import com.instabug.reactlibrary.utils.EventEmitterModule;
import com.instabug.reactlibrary.utils.MainThreadHandler;

import org.json.JSONException;
import org.json.JSONObject;

import java.util.HashMap;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;


public class RNInstabugNetworkLoggerModule extends EventEmitterModule {

    private final ConcurrentHashMap<String, OnCompleteCallback<NetworkLogSnapshot>> callbackMap = new ConcurrentHashMap<String, OnCompleteCallback<NetworkLogSnapshot>>();

    public RNInstabugNetworkLoggerModule(ReactApplicationContext reactContext) {
        super(reactContext);
    }


    @NonNull
    @Override
    public String getName() {
        return "IBGNetworkLogger";
    }


    @ReactMethod
    public void addListener(String event) {
        super.addListener(event);
    }

    @ReactMethod
    public void removeListeners(Integer count) {
        super.removeListeners(count);
    }

    private boolean getFlagValue(String key) {
        return InternalAPM._isFeatureEnabledCP(key, "");
    }

    private WritableMap convertFromMapToWriteableMap(Map map) {
        WritableMap writableMap = new WritableNativeMap();
        for (int i = 0; i < map.size(); i++) {
            Object key = map.keySet().toArray()[i];
            Object value = map.get(key);
            writableMap.putString((String) key, (String) value);
        }
        return writableMap;
    }

    /**
     * Get first time Value of [cp_native_interception_enabled] flag
     */
    @ReactMethod
    public void isNativeInterceptionEnabled(Promise promise) {
        MainThreadHandler.runOnMainThread(new Runnable() {
            @Override
            public void run() {
                try {
                    promise.resolve(getFlagValue(CP_NATIVE_INTERCEPTION_ENABLED));
                } catch (Exception e) {
                    e.printStackTrace();
                    promise.resolve(false); // Will rollback to JS interceptor
                }

            }
        });
    }

    /**
     * Indicate if user added APM Network plugin or not
     * [true] means user added the APM plugin
     * [false] means not
     */
    @ReactMethod
    public void hasAPMNetworkPlugin(Promise promise) {
        MainThreadHandler.runOnMainThread(new Runnable() {
            @Override
            public void run() {
                try {
                    promise.resolve(getFlagValue(APM_NETWORK_PLUGIN_INSTALLED));
                } catch (Exception e) {
                    e.printStackTrace();
                    promise.resolve(false);  // Will rollback to JS interceptor
                }

            }
        });
    }


    @ReactMethod
    public void registerNetworkLogsListener() {
        MainThreadHandler.runOnMainThread(new Runnable() {
            @Override
            public void run() {
                InternalAPM._registerNetworkLogSanitizer((networkLogSnapshot, onCompleteCallback) -> {
                    final String id = String.valueOf(onCompleteCallback.hashCode());
                    callbackMap.put(id, onCompleteCallback);

                    WritableMap networkSnapshotParams = Arguments.createMap();
                    networkSnapshotParams.putString("id", id);
                    networkSnapshotParams.putString("url", networkLogSnapshot.getUrl());
                    networkSnapshotParams.putInt("responseCode", networkLogSnapshot.getResponseCode());
                    networkSnapshotParams.putString("requestBody", networkLogSnapshot.getRequestBody());
                    networkSnapshotParams.putString("response", networkLogSnapshot.getResponse());
                    final Map<String, Object> requestHeaders = networkLogSnapshot.getRequestHeaders();
                    if (requestHeaders != null) {
                        networkSnapshotParams.putMap("requestHeader", convertFromMapToWriteableMap(networkLogSnapshot.getRequestHeaders()));
                    }
                    final Map<String, Object> responseHeaders = networkLogSnapshot.getResponseHeaders();
                    if (responseHeaders != null) {
                        networkSnapshotParams.putMap("responseHeader", convertFromMapToWriteableMap(networkLogSnapshot.getResponseHeaders()));
                    }

                    sendEvent("IBGNetworkLoggerHandler", networkSnapshotParams);
                });
            }
        });
    }

    @ReactMethod
    protected void updateNetworkLogSnapshot(String jsonString) {

        JSONObject newJSONObject = null;
        String url = "";
        NetworkLogSnapshot modifiedSnapshot = null;
        try {
            newJSONObject = new JSONObject(jsonString);
            url = newJSONObject.optString("url");
        } catch (JSONException e) {
            throw new RuntimeException(e);
        }
        final String ID = newJSONObject.optString("id");

        if (!url.isEmpty()) {
            modifiedSnapshot = new NetworkLogSnapshot(
                    url,
                    null,
                    null,
                    null,
                    null,
                    newJSONObject.optInt("responseCode")
            );
        }

        final OnCompleteCallback<NetworkLogSnapshot> callback = callbackMap.get(ID);
        if (callback != null) {
            callback.onComplete(modifiedSnapshot);
        }
        callbackMap.remove(ID);

    }
}
