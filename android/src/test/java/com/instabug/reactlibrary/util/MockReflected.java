package com.instabug.reactlibrary.util;

import static com.instabug.reactlibrary.utils.InstabugUtil.getMethod;

import android.graphics.Bitmap;

import com.instabug.library.networkDiagnostics.model.NetworkDiagnosticsCallback;

import java.lang.reflect.Method;
import com.instabug.crash.models.IBGNonFatalException;

import org.json.JSONObject;

import java.util.Map;

/**
 * Includes fake implementations of methods called by reflection.
 * Used to verify whether or not a private methods was called.
 */
@SuppressWarnings("unused")
public class MockReflected {

    /**
     * Instabug.setCurrentPlatform
     */
    public static void setCurrentPlatform(int platform) {}

    /**
     * Instabug.util.InstabugDeprecationLogger.setBaseUrl
     */
    public static void setBaseUrl(String baseUrl) {}

    /**
     * com.instabug.library.Instabug.setNetworkDiagnosticsCallback
     */
    public static void setNetworkDiagnosticsCallback(NetworkDiagnosticsCallback callback) {}

    /**
     * com.instabug.library.Instabug.reportCurrentViewChange
     */
    public static void reportCurrentViewChange(String currentView) {}

    /**
     * com.instabug.library.Instabug.reportScreenChange
     */
    public static void reportScreenChange(Bitmap screenshot, String screen) {}
    /**
     * CrashReporting.reportException
     */
    public static void reportException(JSONObject exception, boolean isHandled, Map userAttributes, JSONObject fingerPrint, IBGNonFatalException.Level level) {}

}
