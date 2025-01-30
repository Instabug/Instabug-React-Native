package com.instabug.reactlibrary.utils.frame_tracker_choreographer;

import com.facebook.react.bridge.UiThreadUtil;

public class ReactUiThreadExecutor implements UiThreadExecutor {
    @Override
    public void runOnUiThread(Runnable runnable) {
        UiThreadUtil.runOnUiThread(runnable);
    }
}
