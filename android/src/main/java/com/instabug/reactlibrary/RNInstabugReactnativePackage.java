
package com.instabug.reactlibrary;

import java.util.Arrays;
import java.util.Collections;
import java.util.List;
import java.util.ArrayList;
import android.app.Application;

import com.facebook.react.ReactPackage;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.uimanager.ViewManager;
import com.facebook.react.bridge.JavaScriptModule;

import com.instabug.library.InstabugColorTheme;
import com.instabug.library.InstabugInvocationEvent;
import com.instabug.library.Instabug;

public class RNInstabugReactnativePackage implements ReactPackage {

    private String mToken;
    private Application mApplication;

    private Instabug mInstagbug;
    private Instabug.Builder mBuilder;

    public RNInstabugReactnativePackage(Instabug instabug) {
        this.mInstagbug = instabug;
    }

    public RNInstabugReactnativePackage(Instabug.Builder builder) {
        this.mBuilder = builder;
    }

    public RNInstabugReactnativePackage(String token, Application application) {
        this.mToken = token;
        this.mApplication = application;

        mInstagbug = new Instabug.Builder(mApplication, mToken)
                .setDebugEnabled(true)
                .setEmailFieldRequired(false)
                .setFloatingButtonOffsetFromTop(400)
                .setColorTheme(InstabugColorTheme.InstabugColorThemeDark)
                .setInvocationEvent(InstabugInvocationEvent.InstabugInvocationEventFloatingButton)
                .setShouldShowIntroDialog(false)
                //.setInvocationEvent(InstabugInvocationEvent.InstabugInvocationEventShake)
                .build();

    }
    @Override
    public List<NativeModule> createNativeModules(ReactApplicationContext reactContext) {
        List<NativeModule> modules = new ArrayList<>();
        modules.add(new RNInstabugReactnativeModule(reactContext, this.mInstagbug));
        return modules;
    }

    @Override
    public List<Class<? extends JavaScriptModule>> createJSModules() {
      return Collections.emptyList();
    }

    @Override
    public List<ViewManager> createViewManagers(ReactApplicationContext reactContext) {
      return Collections.emptyList();
    }
}