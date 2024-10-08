package com.instabug.reactlibrary.utils;

import android.os.Handler;
import android.os.Looper;

public class MainThreadHandler {
    /**
     * Runs a block of code on the Main Thread
     */
    public static void runOnMainThread(Runnable runnable) {
        new Handler(Looper.getMainLooper()).post(runnable);
    }
}
