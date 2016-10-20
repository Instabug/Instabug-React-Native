
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


public class RNInstabugReactnativePackage implements ReactPackage {

    Application androidApplication;
    
    public RNInstabugReactnativePackage(Application application) {
        this.androidApplication = application;
    }

    @Override
    public List<NativeModule> createNativeModules(ReactApplicationContext reactContext) {
        List<NativeModule> modules = new ArrayList<>();
        modules.add(new RNInstabugReactnativeModule(reactContext,androidApplication));
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