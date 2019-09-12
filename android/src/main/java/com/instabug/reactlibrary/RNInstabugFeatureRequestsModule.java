package com.instabug.reactlibrary;

import android.annotation.SuppressLint;
import android.os.Handler;
import android.os.Looper;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableArray;
import com.instabug.featuresrequest.FeatureRequests;
import com.instabug.library.Feature;
import com.instabug.reactlibrary.utils.ArrayUtil;
import com.instabug.reactlibrary.utils.InstabugUtil;
import com.instabug.reactlibrary.utils.MainThreadHandler;

import java.util.Arrays;

import javax.annotation.Nonnull;

public class RNInstabugFeatureRequestsModule extends ReactContextBaseJavaModule {

    public RNInstabugFeatureRequestsModule(ReactApplicationContext reactApplicationContext) {
        super(reactApplicationContext);
    }

    @Nonnull
    @Override
    public String getName() {
        return "IBGFeatureRequests";
    }

    /**
     * Sets whether email field is required or not when submitting
     * new-feature-request/new-comment-on-feature
     *
     * @param isEmailRequired set true to make email field required
     * @param actionTypes Bitwise-or of actions
     */
    @SuppressLint("WrongConstant")
    @ReactMethod
    public void setEmailFieldRequiredForFeatureRequests(final boolean isEmailRequired, final ReadableArray actionTypes) {
        MainThreadHandler.runOnMainThread(new Runnable() {
            @Override
            public void run() {
                try {
                    Object[] objectArray = ArrayUtil.toArray(actionTypes);
                    String[] stringArray = Arrays.copyOf(objectArray, objectArray.length, String[].class);
                    int[] parsedActionTypes = new int[stringArray.length];
                    int i = 0;
                    for (String action : stringArray) {
                        parsedActionTypes[i++] = (int) ArgsRegistry.getRawValue(action);
                    }

                    FeatureRequests.setEmailFieldRequired(isEmailRequired, parsedActionTypes);
                } catch (Exception e) {
                    e.printStackTrace();
                }
            }
        });
    }

    /**
     * Shows the UI for feature requests list
     */
    @ReactMethod
    public void show() {
        MainThreadHandler.runOnMainThread(new Runnable() {
            @Override
            public void run() {
                try {
                    FeatureRequests.show();
                } catch (Exception e) {
                    e.printStackTrace();
                }
            }
        });
    }

    /**
     * Enables or disables feature requests.
     * @param isEnabled boolean indicating enabled or disabled.
     */
    @ReactMethod
    public void setEnabled(final boolean isEnabled) {
        MainThreadHandler.runOnMainThread(new Runnable() {
            @Override
            public void run() {
                try {
                    if (isEnabled) {
                        FeatureRequests.setState(Feature.State.ENABLED);
                    } else {
                        FeatureRequests.setState(Feature.State.DISABLED);
                    }
                } catch (Exception e) {
                    e.printStackTrace();
                }
            }
        });
    }
}
