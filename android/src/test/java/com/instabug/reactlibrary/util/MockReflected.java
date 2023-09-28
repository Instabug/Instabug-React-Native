package com.instabug.reactlibrary.util;

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
}
