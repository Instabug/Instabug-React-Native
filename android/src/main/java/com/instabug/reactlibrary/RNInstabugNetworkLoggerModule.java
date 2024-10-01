package com.instabug.reactlibrary;


import androidx.annotation.NonNull;

//import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactMethod;
//import com.facebook.react.bridge.WritableMap;
//import com.instabug.apm.InternalAPM;
//import com.instabug.apm.sanitization.OnCompleteCallback;
//import com.instabug.apm.sanitization.VoidSanitizer;
//import com.instabug.library.logging.listeners.networklogs.NetworkLogSnapshot;
import com.instabug.reactlibrary.utils.EventEmitterModule;
import com.instabug.reactlibrary.utils.MainThreadHandler;
//
//import org.json.JSONException;
//import org.json.JSONObject;
//
//import java.util.concurrent.ConcurrentHashMap;


public class RNInstabugNetworkLoggerModule extends EventEmitterModule {

    public RNInstabugNetworkLoggerModule(ReactApplicationContext reactContext) {
        super(reactContext);
    }

//    private final ConcurrentHashMap<Integer, OnCompleteCallback<NetworkLogSnapshot>> callbackMap = new ConcurrentHashMap<Integer, OnCompleteCallback<NetworkLogSnapshot>>();

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

    /**
     * Get first time Value of [cp_native_interception_enabled] flag
     */
    @ReactMethod
    public void isNativeInterceptionEnabled(Promise promise) {
        MainThreadHandler.runOnMainThread(new Runnable() {
            @Override
            public void run() {
                try {
                    promise.resolve(true);
                } catch (Exception e) {
                    e.printStackTrace();
                    promise.resolve(false);
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
                    promise.resolve(true);
                } catch (Exception e) {
                    e.printStackTrace();
                    promise.resolve(false);
                }

            }
        });
    }

    /**
     * Indicate APM is enabled & Network logging is enabled
     * [true] ApmEnabled && NetworkEnabled
     * [false] otherwise
     */
    @ReactMethod
    public void isAPMNetworkEnabled(Promise promise) {
        MainThreadHandler.runOnMainThread(new Runnable() {
            @Override
            public void run() {
                try {
                    promise.resolve(true);
                } catch (Exception e) {
                    e.printStackTrace();
                    promise.resolve(false);
                }

            }
        });
    }



//    @ReactMethod
//    public void registerNetworkLogsListener() {
//        MainThreadHandler.runOnMainThread(new Runnable() {
//            @Override
//            public void run() {
//                InternalAPM._registerNetworkLogSanitizer(new VoidSanitizer<NetworkLogSnapshot>() {
//                    @Override
//                    public void sanitize(NetworkLogSnapshot networkLogSnapshot, @NonNull OnCompleteCallback<NetworkLogSnapshot> onCompleteCallback) {
//                        final int id = onCompleteCallback.hashCode();
//                        callbackMap.put(id, onCompleteCallback);
//
//                        WritableMap networkSnapshotParams = Arguments.createMap();
//                        networkSnapshotParams.putInt("id", id);
//                        networkSnapshotParams.putString("url", networkLogSnapshot.getUrl());
//                        networkSnapshotParams.putInt("responseCode", networkLogSnapshot.getResponseCode());
//
//                        sendEvent("IBGNetworkLoggerHandler", networkSnapshotParams);
//
//                    }
//                });
//            }
//        });
//    }
//
//    @ReactMethod
//    protected void updateNetworkLogSnapshot(String jsonString) {
//
//        JSONObject newJSONObject = null;
//        try {
//            newJSONObject = new JSONObject(jsonString);
//        } catch (JSONException e) {
//            throw new RuntimeException(e);
//        }
//        final Integer ID = newJSONObject.optInt("id");
//        final NetworkLogSnapshot modifiedSnapshot = new NetworkLogSnapshot(
//                newJSONObject.optString("url"),
//                null,
//                null,
//                null,
//                null,
//                newJSONObject.optInt("responseCode")
//        );
//
//        final OnCompleteCallback<NetworkLogSnapshot> callback = callbackMap.get(ID);
//        if (callback != null) {
//            callback.onComplete(null);
//        }
//        callbackMap.remove(ID);
//
//    }
}
