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

    public RNInstabugReactnativePackage(Application androidApplication) {
        this.androidApplication = androidApplication;
    }

    @Deprecated
    public RNInstabugReactnativePackage(String androidApplicationToken, Application application) {
        this(androidApplicationToken, application, "button");
    }

    @Deprecated
    public RNInstabugReactnativePackage(String androidApplicationToken, Application application,
                                        String invocationEventValue) {
        this(androidApplicationToken, application, invocationEventValue, "light");
    }

    @Deprecated
    public RNInstabugReactnativePackage(String androidApplicationToken, Application application,
                                        String invocationEventValue, String instabugColorThemeValue) {
        this.androidApplication = application;
    }

    @Override
    public List<NativeModule> createNativeModules(ReactApplicationContext reactContext) {
        List<NativeModule> modules = new ArrayList<>();
        modules.add(new RNInstabugReactnativeModule(reactContext, this.androidApplication));
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