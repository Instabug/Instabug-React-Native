package com.instabug.hybridsampleapp;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.instabug.reactlibrary.RNInstabug;

import android.app.Application;
import android.util.Log;
import com.instabug.library.LogLevel;
import com.instabug.library.invocation.InstabugInvocationEvent;
import com.microsoft.codepush.react.CodePush;

import java.util.Collections;
import java.util.List;

public class HybridApplication extends Application {
    private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
        @Override
        protected String getJSBundleFile() {
            return CodePush.getJSBundleFile();
        }

        @Override
        public boolean getUseDeveloperSupport() {
            return false;
        }

        @Override
        protected List<ReactPackage> getPackages() {
            return Collections.emptyList();
        }
    };
    @Override
    public void onCreate() {
        super.onCreate();
        Log.v("Instabug-Hybrid", "starting from native");

        new RNInstabug.Builder(this, "0fcc87b8bf731164828cc411eccc802a")
                .setCodePushVersion("")
                .setInvocationEvents(InstabugInvocationEvent.SHAKE, InstabugInvocationEvent.FLOATING_BUTTON)
                .build();
    }
}