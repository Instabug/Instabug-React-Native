
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


import com.instabug.library.Instabug;
import com.instabug.library.InstabugColorTheme;
import com.instabug.library.invocation.InstabugInvocationEvent;


public class RNInstabugReactnativePackage implements ReactPackage {

    Application androidApplication;
    private String mAndroidApplicationToken;
    private Instabug mInstabug;
    private Instabug.Builder mBuilder;
    private InstabugInvocationEvent invocationEvent=InstabugInvocationEvent.FLOATING_BUTTON;
    private InstabugColorTheme instabugColorTheme=InstabugColorTheme.InstabugColorThemeLight;
    public RNInstabugReactnativePackage(Instabug instabug) {
        this.mInstabug = instabug;
    }

    public RNInstabugReactnativePackage(String androidApplicationToken,Application application) {
        this.androidApplication = application;
        this.mAndroidApplicationToken = androidApplicationToken;

            mInstabug = new Instabug.Builder(androidApplication, mAndroidApplicationToken)
                    .setEmailFieldRequired(false)
                    .setFloatingButtonOffsetFromTop(400)
                    .setTheme(this.instabugColorTheme)
                    .setInvocationEvent(this.invocationEvent)
                    .setIntroMessageEnabled(false)
                    .build();
    }

    public RNInstabugReactnativePackage(String androidApplicationToken,Application application,String invocationEventValue) {
            if(invocationEventValue.equals("button")) {
                this.invocationEvent=InstabugInvocationEvent.FLOATING_BUTTON;
            } else if(invocationEventValue.equals("swipe")) {
                this.invocationEvent=InstabugInvocationEvent.TWO_FINGER_SWIPE_LEFT;

            } else if(invocationEventValue.equals("shake")) {
                this.invocationEvent=InstabugInvocationEvent.SHAKE;

            } else if(invocationEventValue.equals("screenshot")){
                this.invocationEvent=InstabugInvocationEvent.SCREENSHOT_GESTURE;

            } else if(invocationEventValue.equals("none")) {
                this.invocationEvent=InstabugInvocationEvent.NONE;

            } else {
                this.invocationEvent=InstabugInvocationEvent.FLOATING_BUTTON;
            }

            this(androidApplicationToken,application);

    }

    public RNInstabugReactnativePackage(String androidApplicationToken,Application application,String invocationEventValue,String instabugColorThemeValue) {
        if (instabugColorThemeValue.equals("light")) {
            this.instabugColorTheme=InstabugColorTheme.InstabugColorThemeLight;
        } else if (instabugColorThemeValue.equals("dark")) {
            this.instabugColorTheme=InstabugColorTheme.InstabugColorThemeDark;
        } else {
            this.instabugColorTheme=InstabugColorTheme.InstabugColorThemeLight;
        }

        this(androidApplicationToken,application,invocationEventValue);

    }

    @Override
    public List<NativeModule> createNativeModules(ReactApplicationContext reactContext) {
        List<NativeModule> modules = new ArrayList<>();
        modules.add(new RNInstabugReactnativeModule(reactContext, this.mInstabug));
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