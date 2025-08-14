package com.instabug.reactlibrary;

import androidx.annotation.NonNull;

import com.facebook.react.ReactPackage;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.uimanager.ViewManager;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

public class RNInstabugReactnativePackage implements ReactPackage {

    private static final String TAG = RNInstabugReactnativePackage.class.getSimpleName();

    public RNInstabugReactnativePackage() {}

    @NonNull
    @Override
    public List<NativeModule> createNativeModules(@NonNull ReactApplicationContext reactContext) {
        List<NativeModule> modules = new ArrayList<>();
        modules.add(new RNInstabugReactnativeModule(reactContext));
        modules.add(new RNInstabugBugReportingModule(reactContext));
        modules.add(new RNInstabugCrashReportingModule(reactContext));
        modules.add(new RNInstabugSurveysModule(reactContext));
        modules.add(new RNInstabugFeatureRequestsModule(reactContext));
        modules.add(new RNInstabugRepliesModule(reactContext));
        modules.add(new RNInstabugAPMModule(reactContext));
        modules.add(new RNInstabugSessionReplayModule(reactContext));
        modules.add(new RNInstabugNetworkLoggerModule(reactContext));
        return modules;
    }

    @NonNull
    @Override
    public List<ViewManager> createViewManagers(@NonNull ReactApplicationContext reactContext) {
        return Collections.emptyList();
    }
}
