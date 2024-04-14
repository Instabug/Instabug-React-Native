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
    public static native void causeSIGSEGVCrash();
    public static native void causeSIGABRTCrash();
    public static native void causeSIGFPECrash();
    public static native void causeSIGILLCrash();
    public static native void causeSIGBUSCrash();
    public static native void causeSIGTRAPCrash();


}
