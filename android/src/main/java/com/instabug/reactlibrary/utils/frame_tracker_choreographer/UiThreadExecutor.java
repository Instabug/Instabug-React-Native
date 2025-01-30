package com.instabug.reactlibrary.utils.frame_tracker_choreographer;

import com.facebook.react.bridge.UiThreadUtil;

/**
 * Simple UI Thread Executor. By default, it is based on {@link UiThreadUtil#runOnUiThread}.
 */
public interface UiThreadExecutor {
    /**
     * Runs the given runnable on the UI Thread.
     */
    void runOnUiThread(Runnable runnable);
}

