package com.instabug.reactlibrary;

import android.app.Application;

import com.facebook.react.ReactPackage;
import com.facebook.react.bridge.JavaScriptModule;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.uimanager.ViewManager;
import com.instabug.library.Instabug;
import com.instabug.library.InstabugColorTheme;
import com.instabug.library.invocation.InstabugInvocationEvent;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

public class RNInstabugReactnativePackage implements ReactPackage {

    private Application androidApplication;
    private String mAndroidApplicationToken;
    private Instabug mInstabug;
    private Instabug.Builder mBuilder;
    private InstabugInvocationEvent invocationEvent = InstabugInvocationEvent.FLOATING_BUTTON;
    private InstabugColorTheme instabugColorTheme = InstabugColorTheme.InstabugColorThemeLight;

    public RNInstabugReactnativePackage(String androidApplicationToken, Application androidApplication) {
        this.androidApplication = androidApplication;
        this.mAndroidApplicationToken = androidApplicationToken;
        mInstabug = new Instabug.Builder(this.androidApplication, this.mAndroidApplicationToken)
                .build();
    }

    @Deprecated
    public RNInstabugReactnativePackage(String androidApplicationToken, Application androidApplication,
                                        String invocationEventValue) {
        this(androidApplicationToken, androidApplication);
    }

    @Deprecated
    public RNInstabugReactnativePackage(String androidApplicationToken, Application androidApplication,
                                        String invocationEventValue, String instabugColorThemeValue) {
        this(androidApplicationToken, androidApplication);
    }

    @Override
    public List<NativeModule> createNativeModules(ReactApplicationContext reactContext) {
        List<NativeModule> modules = new ArrayList<>();
        modules.add(new RNInstabugReactnativeModule(reactContext, this.androidApplication, this.mInstabug));
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