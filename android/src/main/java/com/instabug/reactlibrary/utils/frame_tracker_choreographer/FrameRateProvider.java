package com.instabug.reactlibrary.utils.frame_tracker_choreographer;

import android.view.Choreographer;


public class FrameRateProvider {
    private final FpsFrameCallback frameCallback;

    public FrameRateProvider(final ReactFrameRateCallback reactFrameRateCallback,
                             final UiThreadExecutor uiThreadExecutor) {
        this.frameCallback = new FpsFrameCallback(reactFrameRateCallback, uiThreadExecutor);
    }

    public void start() {
        frameCallback.reset();
        frameCallback.start();
    }

    public void stop() {
        frameCallback.stop();
    }
}


class FpsFrameCallback implements Choreographer.FrameCallback {
    private final ReactFrameRateCallback reactFrameRateCallback;
    private final UiThreadExecutor uiThreadExecutor;
    private Choreographer choreographer;
    private long lastFrameTime = -1L;

    public FpsFrameCallback(final ReactFrameRateCallback reactFrameRateCallback,
                            final UiThreadExecutor uiThreadExecutor) {
        this.reactFrameRateCallback = reactFrameRateCallback;
        this.uiThreadExecutor = uiThreadExecutor;
    }

    @Override
    public void doFrame(long time) {
        if (lastFrameTime != -1L) {
            reactFrameRateCallback.onFrameRate((double) (time - lastFrameTime));
        }
        lastFrameTime = time;
        if (choreographer != null) {
            choreographer.postFrameCallback(this);
        }
    }

    public void start() {
        uiThreadExecutor.runOnUiThread(new Runnable() {
            @Override
            public void run() {
                choreographer = Choreographer.getInstance();
                if (choreographer != null) {
                    choreographer.postFrameCallback(FpsFrameCallback.this);
                }
            }
        });
    }

    public void stop() {
        uiThreadExecutor.runOnUiThread(new Runnable() {
            @Override
            public void run() {
                choreographer = Choreographer.getInstance();
                if (choreographer != null) {
                    choreographer.removeFrameCallback(FpsFrameCallback.this);
                }
            }
        });
    }

    public void reset() {
        lastFrameTime = -1L;
    }
}

