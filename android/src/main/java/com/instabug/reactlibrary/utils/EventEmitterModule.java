package com.instabug.reactlibrary.utils;

import androidx.annotation.Nullable;
import androidx.annotation.VisibleForTesting;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.modules.core.DeviceEventManagerModule;

public abstract class EventEmitterModule extends ReactContextBaseJavaModule {
    private int listenerCount = 0;

    public EventEmitterModule(ReactApplicationContext context) {
        super(context);
    }

    @VisibleForTesting
    public void sendEvent(String event, @Nullable ReadableMap params) {
        if (listenerCount > 0) {
            getReactApplicationContext()
                    .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                    .emit(event, params);
        }
    }

    protected void addListener(String ignoredEvent) {
        listenerCount++;
    }

    protected void removeListeners(Integer count) {
        listenerCount -= count;
    }
}
