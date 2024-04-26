package com.instabug.reactlibrary.util;

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
    public static void reportException(JSONObject exception, boolean isHandled, Map<String,String> userAttributes, JSONObject fingerPrint, IBGNonFatalException.Level level) {}

}
