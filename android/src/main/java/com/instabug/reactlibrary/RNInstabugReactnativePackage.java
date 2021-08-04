package com.instabug.reactlibrary;

import android.app.Application;
import android.util.Log;

import com.facebook.react.ReactPackage;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.uimanager.ViewManager;
import com.instabug.bug.BugReporting;
import com.instabug.crash.CrashReporting;
import com.instabug.library.Platform;
import com.instabug.library.Feature;
import com.instabug.library.Instabug;
import com.instabug.library.InstabugColorTheme;
import com.instabug.library.invocation.InstabugInvocationEvent;
import com.instabug.library.invocation.util.InstabugFloatingButtonEdge;
import com.instabug.library.visualusersteps.State;
import com.instabug.reactlibrary.utils.InstabugUtil;
import com.instabug.reactlibrary.utils.MainThreadHandler;
import com.instabug.apm.APM;

import android.graphics.Color;

import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

public class RNInstabugReactnativePackage implements ReactPackage {

    private static final String TAG = RNInstabugReactnativePackage.class.getSimpleName();
    
    private Application androidApplication;
    private String mAndroidApplicationToken;
    private Instabug mInstabug;
    private Instabug.Builder mBuilder;
    private ArrayList<InstabugInvocationEvent> invocationEvents = new ArrayList<>();
    private InstabugColorTheme instabugColorTheme = InstabugColorTheme.InstabugColorThemeLight;

    public RNInstabugReactnativePackage() {}

    public RNInstabugReactnativePackage(String androidApplicationToken, Application androidApplication,
                                        String[] invocationEventValues, String primaryColor,
                                        InstabugFloatingButtonEdge floatingButtonEdge, Integer offset, boolean crashReportingEnabled) {
        this.androidApplication = androidApplication;
        this.mAndroidApplicationToken = androidApplicationToken;

        //setting invocation event
        this.parseInvocationEvent(invocationEventValues);

        setBaseUrlForDeprecationLogs();
        setCurrentPlatform();

        new Instabug.Builder(this.androidApplication, this.mAndroidApplicationToken)
                .setInvocationEvents(this.invocationEvents.toArray(new InstabugInvocationEvent[0]))
                .build();
        if (crashReportingEnabled)
            CrashReporting.setState(Feature.State.ENABLED);
        else
            CrashReporting.setState(Feature.State.DISABLED);

        if(primaryColor != null)
            Instabug.setPrimaryColor(Color.parseColor(primaryColor));
        if(floatingButtonEdge != null)
            BugReporting.setFloatingButtonEdge(floatingButtonEdge);
        if(offset != null)
            BugReporting.setFloatingButtonOffset(offset);

        // Temporarily disabling APM hot launches
        APM.setHotAppLaunchEnabled(false);
    }

    public RNInstabugReactnativePackage(String androidApplicationToken, Application androidApplication,
                                        String[] invocationEventValues, String primaryColor) {
        new RNInstabugReactnativePackage(androidApplicationToken,androidApplication,invocationEventValues,primaryColor,
                InstabugFloatingButtonEdge.LEFT,250, true);
    }

    private void parseInvocationEvent(String[] invocationEventValues) {

        for (int i = 0; i < invocationEventValues.length; i++) {
            if (invocationEventValues[i].equals("button")) {
                this.invocationEvents.add(InstabugInvocationEvent.FLOATING_BUTTON);
            } else if (invocationEventValues[i].equals("swipe")) {
                this.invocationEvents.add(InstabugInvocationEvent.TWO_FINGER_SWIPE_LEFT);

            } else if (invocationEventValues[i].equals("shake")) {
                this.invocationEvents.add(InstabugInvocationEvent.SHAKE);

            } else if (invocationEventValues[i].equals("screenshot")) {
                this.invocationEvents.add(InstabugInvocationEvent.SCREENSHOT);

            } else if (invocationEventValues[i].equals("none")) {
                this.invocationEvents.add(InstabugInvocationEvent.NONE);
            }
        }

        if (invocationEvents.isEmpty()) {
            invocationEvents.add(InstabugInvocationEvent.SHAKE);
        }
    }

    private void setCurrentPlatform() {
        try {
            Method method = InstabugUtil.getMethod(Class.forName("com.instabug.library.Instabug"), "setCurrentPlatform", int.class);
            if (method != null) {
                Log.i("IB-CP-Bridge", "invoking setCurrentPlatform with platform: " + Platform.RN);
                method.invoke(null, Platform.RN);
            } else {
                Log.e("IB-CP-Bridge", "setCurrentPlatform was not found by reflection");
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    private void setBaseUrlForDeprecationLogs() {
        try {
            Method method = InstabugUtil.getMethod(Class.forName("com.instabug.library.util.InstabugDeprecationLogger"), "setBaseUrl", String.class);
            if (method != null) {
                method.invoke(null, "https://docs.instabug.com/docs/react-native-sdk-migration-guide");
            }
        } catch (ClassNotFoundException e) {
            e.printStackTrace();
        } catch (IllegalAccessException e) {
            e.printStackTrace();
        } catch (InvocationTargetException e) {
            e.printStackTrace();
        }
    }

    @Override
    public List<NativeModule> createNativeModules(ReactApplicationContext reactContext) {
        List<NativeModule> modules = new ArrayList<>();
        modules.add(new RNInstabugReactnativeModule(reactContext, this.androidApplication, this.mInstabug));
        modules.add(new RNInstabugBugReportingModule(reactContext));
        modules.add(new RNInstabugSurveysModule(reactContext));
        modules.add(new RNInstabugFeatureRequestsModule(reactContext));
        modules.add(new RNInstabugRepliesModule(reactContext));
        modules.add(new RNInstabugChatsModule(reactContext));
        modules.add(new RNInstabugAPMModule(reactContext));
        return modules;
    }

    @Override
    public List<ViewManager> createViewManagers(ReactApplicationContext reactContext) {
        return Collections.emptyList();
    }


    public static class Builder {
        //FloatingButtonEdge
        private final String FLOATING_BUTTON_EDGE_RIGHT = "right";
        private final String FLOATING_BUTTON_EDGE_LEFT = "left";

        String androidApplicationToken;
        Application application;
        String[] invocationEvents;
        String primaryColor;
        InstabugFloatingButtonEdge floatingButtonEdge;
        int offset;
        boolean isCrashReportingEnabled = true;

        public Builder(String androidApplicationToken, Application application) {
            this.androidApplicationToken = androidApplicationToken;
            this.application = application;
        }

        public Builder setInvocationEvent(String... invocationEvents) {
            this.invocationEvents = invocationEvents;
            return this;
        }

        public Builder setCrashReportingEnabled(boolean enabled) {
            this.isCrashReportingEnabled = enabled;
            return this;
        }

        public Builder setPrimaryColor(String primaryColor) {
            this.primaryColor = primaryColor;
            return this;
        }

        public Builder setFloatingEdge(String floatingEdge) {
            this.floatingButtonEdge = getFloatingButtonEdge(floatingEdge);
            return this;
        }

        public Builder setFloatingButtonOffsetFromTop(int offset) {
            this.offset = offset;
            return this;
        }

        public RNInstabugReactnativePackage build() {
            return new RNInstabugReactnativePackage(androidApplicationToken,application,invocationEvents,primaryColor,floatingButtonEdge,offset, isCrashReportingEnabled);
        }

        private InstabugFloatingButtonEdge getFloatingButtonEdge(String floatingButtonEdgeValue) {
            InstabugFloatingButtonEdge floatingButtonEdge = InstabugFloatingButtonEdge.RIGHT;
            try {
                if (floatingButtonEdgeValue.equals(FLOATING_BUTTON_EDGE_LEFT)) {
                    floatingButtonEdge = InstabugFloatingButtonEdge.LEFT;
                } else if (floatingButtonEdgeValue.equals(FLOATING_BUTTON_EDGE_RIGHT)) {
                    floatingButtonEdge = InstabugFloatingButtonEdge.RIGHT;
                }
                return floatingButtonEdge;

            } catch(Exception e) {
                e.printStackTrace();
                return floatingButtonEdge;
            }
        }
    }

}
