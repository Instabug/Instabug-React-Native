package com.instabug.reactlibrary;


import static com.instabug.apm.configuration.cp.APMFeature.APM_NETWORK_PLUGIN_INSTALLED;
import static com.instabug.apm.configuration.cp.APMFeature.CP_NATIVE_INTERCEPTION_ENABLED;
import static com.instabug.apm.configuration.cp.APMFeature.NETWORK_INTERCEPTION_ENABLED;

import androidx.annotation.NonNull;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactMethod;
import com.instabug.apm.InternalAPM;
import com.instabug.reactlibrary.utils.EventEmitterModule;
import com.instabug.reactlibrary.utils.MainThreadHandler;


public class RNInstabugNetworkLoggerModule extends EventEmitterModule {

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
        return InternalAPM._isFeatureEnabledCP( key , "");
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
}
