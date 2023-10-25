
package com.instabug.react.example.nativeModule;

import android.util.Log;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.instabug.react.example.nativeLibs.CppNativeLib;


import androidx.annotation.NonNull;

/**
 * A native module for React Native, providing a bridge between JavaScript and native Android code.
 */
public class InstabugExampleModule extends ReactContextBaseJavaModule {

    public InstabugExampleModule(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @NonNull
    @Override
    public String getName() {
        return "InstabugExampleModule";
    }

    @ReactMethod
    public void sendNDKCrash() {
        CppNativeLib.crashNDK();
    }
}
