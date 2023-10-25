package com.instabug.react.example.nativeLibs;

/**
 * C++ Native library bridge.
 */
public class CppNativeLib {

    static {
        System.loadLibrary("native-lib");
    }

    /**
     * Crashes the app with an invalid argument exception in the C++ native library.
     */
    public static native void crashNDK();
}
