package com.instabug.hybridsampleapp;
import com.instabug.reactlibrary.RNInstabug;

import android.app.Application;
import android.util.Log;
import com.instabug.library.LogLevel;
import com.instabug.library.invocation.InstabugInvocationEvent;

public class HybridApplication extends Application {
    @Override
    public void onCreate() {
        super.onCreate();
        Log.v("Instabug-Hybrid", "starting from native");

        new RNInstabug.Builder(this, "deb1910a7342814af4e4c9210c786f35")
                .setInvocationEvents(InstabugInvocationEvent.SHAKE, InstabugInvocationEvent.FLOATING_BUTTON)
                .build();
    }
}