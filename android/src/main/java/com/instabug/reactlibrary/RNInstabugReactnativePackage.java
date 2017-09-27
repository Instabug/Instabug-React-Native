package com.instabug.reactlibrary;

import android.app.Application;

import com.facebook.react.ReactPackage;
import com.facebook.react.bridge.JavaScriptModule;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.uimanager.ViewManager;
import com.instabug.library.Feature;
import com.instabug.library.Instabug;
import com.instabug.library.InstabugColorTheme;
import com.instabug.library.invocation.InstabugInvocationEvent;
import com.instabug.library.invocation.util.InstabugFloatingButtonEdge;
import android.graphics.Color;

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

    public RNInstabugReactnativePackage(String androidApplicationToken, Application androidApplication,
                                        String invocationEventValue, String primaryColor,
                                        InstabugFloatingButtonEdge floatingButtonEdge, int offset) {
        this.androidApplication = androidApplication;
        this.mAndroidApplicationToken = androidApplicationToken;

        //setting invocation event
                if (invocationEventValue.equals("button")) {
                    this.invocationEvent = InstabugInvocationEvent.FLOATING_BUTTON;
                } else if (invocationEventValue.equals("swipe")) {
                    this.invocationEvent = InstabugInvocationEvent.TWO_FINGER_SWIPE_LEFT;

                } else if (invocationEventValue.equals("shake")) {
                    this.invocationEvent = InstabugInvocationEvent.SHAKE;

                } else if (invocationEventValue.equals("screenshot")) {
                    this.invocationEvent = InstabugInvocationEvent.SCREENSHOT_GESTURE;

                } else if (invocationEventValue.equals("none")) {
                    this.invocationEvent = InstabugInvocationEvent.NONE;

                } else {
                    this.invocationEvent = InstabugInvocationEvent.SHAKE;
                }


        mInstabug = new Instabug.Builder(this.androidApplication, this.mAndroidApplicationToken)
                .setInvocationEvent(this.invocationEvent)
                .setCrashReportingState(Feature.State.DISABLED)
                .build();

        Instabug.setPrimaryColor(Color.parseColor(primaryColor));
        Instabug.setFloatingButtonEdge(floatingButtonEdge);
        Instabug.setFloatingButtonOffsetFromTop(offset);

    }

    public RNInstabugReactnativePackage(String androidApplicationToken, Application androidApplication,
                                        String invocationEventValue, String primaryColor) {
        new RNInstabugReactnativePackage(androidApplicationToken,androidApplication,invocationEventValue,primaryColor,
                InstabugFloatingButtonEdge.LEFT,250);
    }

    public static class Builder {
        //FloatingButtonEdge
        private final String FLOATING_BUTTON_EDGE_RIGHT = "right";
        private final String FLOATING_BUTTON_EDGE_LEFT = "left";

        String androidApplicationToken;
        Application application;
        String invocationEvent;
        String primaryColor;
        InstabugFloatingButtonEdge floatingButtonEdge;
        int offset;

        public Builder(String androidApplicationToken, Application application) {
            this.androidApplicationToken = androidApplicationToken;
            this.application = application;
        }

        public Builder setInvocationEvent(String invocationEvent) {
            this.invocationEvent = invocationEvent;
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
            return new RNInstabugReactnativePackage(androidApplicationToken,application,invocationEvent,primaryColor,floatingButtonEdge,offset);
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

    @Override
    public List<NativeModule> createNativeModules(ReactApplicationContext reactContext) {
        List<NativeModule> modules = new ArrayList<>();
        modules.add(new RNInstabugReactnativeModule(reactContext, this.androidApplication, this.mInstabug));
        return modules;
    }

    public List<Class<? extends JavaScriptModule>> createJSModules() {
        return Collections.emptyList();
    }

    @Override
    public List<ViewManager> createViewManagers(ReactApplicationContext reactContext) {
        return Collections.emptyList();
    }

}
