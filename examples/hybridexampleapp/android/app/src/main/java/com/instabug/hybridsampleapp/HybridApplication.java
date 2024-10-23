package com.instabug.hybridsampleapp;

import android.app.Application;
import android.util.Log;
import com.instabug.library.Instabug;
import com.instabug.library.LogLevel;
import com.instabug.library.invocation.InstabugInvocationEvent;

public class HybridApplication extends Application {
    @Override
    public void onCreate() {
        super.onCreate();
        Log.v("Instabug-Hybrid", "starting from native");

        new Instabug.Builder(this, "f163dafcad22d79fb3653d3b6458729e")
                .setSdkDebugLogsLevel(LogLevel.VERBOSE)
                .setInvocationEvents(InstabugInvocationEvent.SHAKE, InstabugInvocationEvent.FLOATING_BUTTON)
                .build();
    }
}