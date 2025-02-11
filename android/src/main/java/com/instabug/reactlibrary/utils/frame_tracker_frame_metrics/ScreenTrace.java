package com.instabug.reactlibrary.utils.frame_tracker_frame_metrics;


/**
 * Copyright 2021 Google Inc. All Rights Reserved.
 *
 * <p>Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file
 * except in compliance with the License. You may obtain a copy of the License at
 *
 * <p>http://www.apache.org/licenses/LICENSE-2.0
 *
 * <p>Unless required by applicable law or agreed to in writing, software distributed under the
 * License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either
 * express or implied. See the License for the specific language governing permissions and
 * limitations under the License.
 */

import android.app.Activity;
import android.os.Build;
import android.util.Log;
import android.util.SparseIntArray;
import android.view.WindowManager;

import androidx.core.app.FrameMetricsAggregator;


public class ScreenTrace {

    private static final String TAG = "Andrew";
    private static final String FRAME_METRICS_AGGREGATOR_CLASSNAME =
            "androidx.core.app.FrameMetricsAggregator";

    private final Activity activity;
    private String traceName;

    private final FrameMetricsAggregator frameMetricsAggregator;


    public ScreenTrace(Activity activity, String tag) throws IllegalStateException {
        this.activity = activity;

        // We don't care about adding the activity name to the trace name
        // because RN doesn't care about activities
        this.traceName = tag;

        boolean isScreenTraceSupported = checkScreenTraceSupport(activity);

        if (!isScreenTraceSupported) {
            throw new IllegalStateException(
                    "Device does not support screen traces. Hardware acceleration must be enabled and Android"
                            + " must not be 8.0 or 8.1.");
        }

        frameMetricsAggregator = new FrameMetricsAggregator();
    }

    // region Public APIs

    /**
     * Starts recording the frame metrics for the screen traces.
     */
    public void recordScreenTrace(String screenName) {
        traceName = screenName;
        Log.d(TAG, "Recording screen trace " + traceName);


        frameMetricsAggregator.add(activity);
    }

    /**
     * Stops recording screen traces and dispatches the trace capturing information on %age of
     * Slow/Frozen frames.
     *
     * <p>Inspired by fireperf source.
     */
    public void sendScreenTrace() {

        int totalFrames = 0;
        int slowFrames = 0;
        int frozenFrames = 0;

        // Stops recording metrics for this Activity and returns the currently-collected metrics
        SparseIntArray[] arr = frameMetricsAggregator.reset();

        if (arr != null) {
            SparseIntArray frameTimes = arr[FrameMetricsAggregator.TOTAL_INDEX];

            if (frameTimes != null) {
                for (int i = 0; i < frameTimes.size(); i++) {
                    int frameTime = frameTimes.keyAt(i);
                    int numFrames = frameTimes.valueAt(i);

                    totalFrames += numFrames;

                    if (frameTime > 700) {
                        // Frozen frames mean the app appear frozen. The recommended thresholds is 700ms
                        frozenFrames += numFrames;
                        Log.e("AndrewAmin", "frozenFrameStacktrace");
                        Thread.dumpStack();
                    }

                    if (frameTime > 16) {
                        // Slow frames are anything above 16ms (i.e. 60 frames/second)
                        slowFrames += numFrames;
                    }
                }
            }
        }

        // Only incrementMetric if corresponding metric is non-zero.
        if (totalFrames > 0) {
            Log.e(TAG, "totalFrames: " + totalFrames);
        }
        if (slowFrames > 0) {
            Log.e(TAG, "slowFrames: " + slowFrames);
        }
        if (frozenFrames > 0) {
            Log.e(TAG, "frozenFrames: " + frozenFrames);
        }

        Log.d(
                TAG,
                new StringBuilder()
                        .append("sendScreenTrace ")
                        .append(traceName)
                        .append(", name: ")
                        .append(getScreenTraceName())
                        .append(", total_frames: ")
                        .append(totalFrames)
                        .append(", slow_frames: ")
                        .append(slowFrames)
                        .append(", frozen_frames: ")
                        .append(frozenFrames)
                        .toString());

    }

    // endregion

    // region Helper Functions

    private static boolean checkScreenTraceSupport(Activity activity) {
        boolean isValidSDKVersion = checkSDKVersion();
        boolean hasFrameMetricsAggregatorClass = checkFrameMetricsAggregatorClass();
        boolean isActivityHardwareAccelerated =
                activity.getWindow() != null
                        && ((activity.getWindow().getAttributes().flags
                        & WindowManager.LayoutParams.FLAG_HARDWARE_ACCELERATED)
                        != 0);

        boolean supported =
                isValidSDKVersion && hasFrameMetricsAggregatorClass && isActivityHardwareAccelerated;

        Log.d(
                TAG,
                new StringBuilder()
                        .append("isValidSDKVersion: ")
                        .append(isValidSDKVersion)
                        .append("isScreenTraceSupported(")
                        .append(activity)
                        .append("): ")
                        .append(supported)
                        .append(" [hasFrameMetricsAggregatorClass: ")
                        .append(hasFrameMetricsAggregatorClass)
                        .append(", isActivityHardwareAccelerated: ")
                        .append(isActivityHardwareAccelerated)
                        .append("]")
                        .toString());

        return supported;
    }

    private static boolean checkSDKVersion() {
        if (Build.VERSION.SDK_INT == 26 || Build.VERSION.SDK_INT == 27) {
            return false;
        }

        return true;
    }

    /**
     * Inspired by fireperf source.
     */
    private static boolean checkFrameMetricsAggregatorClass() {
        try {
            Class<?> initializerClass = Class.forName(FRAME_METRICS_AGGREGATOR_CLASSNAME);
            return true;
        } catch (ClassNotFoundException e) {
            return false;
        }
    }

    /**
     * Inspired by fireperf source.
     */
    private String getScreenTraceName() {
        return traceName;
    }

    // endregion
}