package com.instabug.react.example;

import androidx.annotation.NonNull;

import com.facebook.react.ReactPackage;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.uimanager.ViewManager;
import com.instabug.reactlibrary.RNInstabugAPMModule;
import com.instabug.reactlibrary.RNInstabugBugReportingModule;
import com.instabug.reactlibrary.RNInstabugCrashReportingModule;
import com.instabug.reactlibrary.RNInstabugFeatureRequestsModule;
import com.instabug.reactlibrary.RNInstabugReactnativeModule;
import com.instabug.reactlibrary.RNInstabugRepliesModule;
import com.instabug.reactlibrary.RNInstabugSessionReplayModule;
import com.instabug.reactlibrary.RNInstabugSurveysModule;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

public class RNInstabugExampleReactnativePackage implements ReactPackage {

    private static final String TAG = RNInstabugExampleReactnativePackage.class.getSimpleName();

    public RNInstabugExampleReactnativePackage() {}

    @NonNull
    @Override
    public List<NativeModule> createNativeModules(@NonNull ReactApplicationContext reactContext) {
        List<NativeModule> modules = new ArrayList<>();
        modules.add(new RNInstabugExampleCrashReportingModule(reactContext));
        return modules;
    }

    @NonNull
    @Override
    public List<ViewManager> createViewManagers(@NonNull ReactApplicationContext reactContext) {
        return Collections.emptyList();
    }
}
