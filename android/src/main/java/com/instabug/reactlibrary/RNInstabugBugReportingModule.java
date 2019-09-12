package com.instabug.reactlibrary;

import android.annotation.SuppressLint;
import android.annotation.TargetApi;
import android.os.Handler;
import android.os.Looper;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableArray;
import com.facebook.react.bridge.WritableMap;
import com.instabug.bug.BugReporting;
import com.instabug.bug.invocation.Option;
import com.instabug.chat.Replies;
import com.instabug.library.Feature;
import com.instabug.library.OnSdkDismissCallback;
import com.instabug.library.extendedbugreport.ExtendedBugReport;
import com.instabug.library.invocation.InstabugInvocationEvent;
import com.instabug.library.invocation.OnInvokeCallback;
import com.instabug.library.invocation.util.InstabugFloatingButtonEdge;
import com.instabug.library.invocation.util.InstabugVideoRecordingButtonPosition;
import com.instabug.reactlibrary.utils.ArrayUtil;
import com.instabug.reactlibrary.utils.InstabugUtil;
import com.instabug.reactlibrary.utils.MainThreadHandler;

import java.util.ArrayList;
import java.util.Arrays;

import javax.annotation.Nonnull;

public class RNInstabugBugReportingModule extends ReactContextBaseJavaModule {

    public RNInstabugBugReportingModule(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @Nonnull
    @Override
    public String getName() {
        return "IBGBugReporting";
    }

    /**
     * Enable or disable all BugReporting related features.
     * @param isEnabled boolean indicating enabled or disabled.
     */
    @ReactMethod
    public void setEnabled(final boolean isEnabled) {
        MainThreadHandler.runOnMainThread(new Runnable() {
            @Override
            public void run() {
                try {
                    if (isEnabled) {
                        BugReporting.setState(Feature.State.ENABLED);
                    } else {
                        BugReporting.setState(Feature.State.DISABLED);
                    }
                } catch (Exception e) {
                    e.printStackTrace();
                }
            }
        });

    }


    /**
     * Enable/Disable screen recording
     *
     * @param autoScreenRecordingEnabled boolean for enable/disable
     *                                   screen recording on crash feature
     */
    @TargetApi(21)
    @ReactMethod
    public void setAutoScreenRecordingEnabled(final boolean autoScreenRecordingEnabled) {
        MainThreadHandler.runOnMainThread(new Runnable() {
            @Override
            public void run() {
                try {
                    BugReporting.setAutoScreenRecordingEnabled(autoScreenRecordingEnabled);
                } catch (Exception e) {
                    e.printStackTrace();
                }
            }
        });
    }

    /**
     * Sets whether the extended bug report mode should be disabled,
     * enabled with required fields,  or enabled with optional fields.
     *
     * @param extendedBugReportMode
     */
    @ReactMethod
    public void setExtendedBugReportMode(final String extendedBugReportMode) {
        MainThreadHandler.runOnMainThread(new Runnable() {
            @Override
            public void run() {
                try {
                    BugReporting.setExtendedBugReportState(
                            ArgsRegistry.getDeserializedValue(extendedBugReportMode, ExtendedBugReport.State.class));
                } catch (Exception e) {
                    e.printStackTrace();
                }
            }
        });
    }

    /**
     * Enables or disables view hierarchy in the dashboard.
     * @param isEnabled boolean indicating enabled or disabled.
     */
    @ReactMethod
    public void setViewHierarchyEnabled(final boolean isEnabled) {
        MainThreadHandler.runOnMainThread(new Runnable() {
            @Override
            public void run() {
                try {
                    if (isEnabled) {
                        BugReporting.setViewHierarchyState(Feature.State.ENABLED);
                    } else {
                        BugReporting.setViewHierarchyState(Feature.State.DISABLED);
                    }
                } catch (Exception e) {
                    e.printStackTrace();
                }
            }
        });
    }

    /**
     * Sets the default corner at which the video recording floating button will be shown
     *
     * @param corner corner to stick the video recording floating button to
     */
    @ReactMethod
    public void setVideoRecordingFloatingButtonPosition(final String corner) {
        MainThreadHandler.runOnMainThread(new Runnable() {
            @Override
            public void run() {
                try {
                    BugReporting.setVideoRecordingFloatingButtonPosition(
                            ArgsRegistry.getDeserializedValue(corner, InstabugVideoRecordingButtonPosition.class));
                } catch (Exception e) {
                    e.printStackTrace();
                }
            }
        });
    }

    /**
     * Sets whether attachments in bug reporting and in-app messaging are enabled or not.
     *
     * @param  screenshot A boolean to enable or disable screenshot attachments.
     * @param {boolean} extraScreenShot A boolean to enable or disable extra screenshot attachments.
     * @param {boolean} galleryImage A boolean to enable or disable gallery image attachments.
     * @param {boolean} screenRecording A boolean to enable or disable screen recording attachments.
     */
    @ReactMethod
    public void setEnabledAttachmentTypes(final boolean screenshot, final boolean extraScreenshot, final boolean
            galleryImage, final boolean screenRecording) {
        MainThreadHandler.runOnMainThread(new Runnable() {
            @Override
            public void run() {
                try {
                    BugReporting.setAttachmentTypesEnabled(screenshot, extraScreenshot, galleryImage,
                            screenRecording);
                } catch (Exception e) {
                    e.printStackTrace();
                }
            }
        });
    }

    /**
     * @deprecated
     * Sets the event used to invoke Instabug SDK
     *
     * @param invocationEventValue the invocation event value
     * @see InstabugInvocationEvent
     */
    @ReactMethod
    public void setInvocationEvent(final String invocationEventValue) {
        MainThreadHandler.runOnMainThread(new Runnable() {
            @Override
            public void run() {
                try {
                    BugReporting.setInvocationEvents(
                            ArgsRegistry.getDeserializedValue(invocationEventValue, InstabugInvocationEvent.class));
                } catch (Exception e) {
                    e.printStackTrace();
                }
            }
        });
    }

    /**
     * Sets the event used to invoke Instabug SDK
     *
     * @param invocationEventValues the invocation event value
     * @see InstabugInvocationEvent
     */
    @ReactMethod
    public void setInvocationEvents(ReadableArray invocationEventValues) {

        try {
            Object[] objectArray = ArrayUtil.toArray(invocationEventValues);
            String[] stringArray = Arrays.copyOf(objectArray, objectArray.length, String[].class);
            final ArrayList<InstabugInvocationEvent> parsedInvocationEvents = new ArrayList<>();

            for (String event : stringArray) {
                parsedInvocationEvents.add(ArgsRegistry.getDeserializedValue(event, InstabugInvocationEvent.class));
            }
            MainThreadHandler.runOnMainThread(new Runnable() {
                @Override
                public void run() {
                    try {
                        BugReporting.setInvocationEvents(parsedInvocationEvents.toArray(new InstabugInvocationEvent[0]));
                    } catch (Exception e) {
                        e.printStackTrace();
                    }
                }
            });
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    /**
     * Sets the options for the features in the SDK
     *
     * @param optionValues the invocation option value
     */
    @ReactMethod
    public void setOptions(final ReadableArray optionValues) {
        MainThreadHandler.runOnMainThread(new Runnable() {
            @Override
            public void run() {
                try {
                    Object[] objectArray = ArrayUtil.toArray(optionValues);
                    String[] stringArray = Arrays.copyOf(objectArray, objectArray.length, String[].class);
                    for (String option : stringArray) {
                        BugReporting.setOptions((int) ArgsRegistry.getRawValue(option));
                    }
                } catch (Exception e) {
                    e.printStackTrace();
                }
            }
        });
    }

    /**
     * Sets a block of code to be executed just before the SDK's UI is presented.
     * This block is executed on the UI thread. Could be used for performing any
     * UI changes before the SDK's UI is shown.
     *
     * @param onInvokeHandler - A callback that gets executed before
     *                             invoking the SDK
     */
    @ReactMethod
    public void setOnInvokeHandler(final Callback onInvokeHandler) {
        MainThreadHandler.runOnMainThread(new Runnable() {
            @Override
            public void run() {
                try {
                            BugReporting.setOnInvokeCallback(new OnInvokeCallback() {
                        @Override
                        public void onInvoke() {
                            InstabugUtil.sendEvent(getReactApplicationContext(), Constants.IBG_PRE_INVOCATION_HANDLER, null);
                        }
                    });
                } catch (java.lang.Exception exception) {
                    exception.printStackTrace();
                }
            }
        });
    }

    /**
     * Sets the position of the Instabug floating button on the screen.
     * @param floatingButtonEdge left or right edge of the screen.
     * @param floatingButtonOffset integer offset from the left or right edge of the screen.
     */
    @ReactMethod
    public void setFloatingButtonEdge(final String floatingButtonEdge, final int floatingButtonOffset) {
        MainThreadHandler.runOnMainThread(new Runnable() {
            @Override
            public void run() {
                BugReporting.setFloatingButtonOffset(floatingButtonOffset);
                if (floatingButtonEdge.equals("left"))
                    BugReporting.setFloatingButtonEdge(InstabugFloatingButtonEdge.LEFT);
                else
                    BugReporting.setFloatingButtonEdge(InstabugFloatingButtonEdge.RIGHT);
            }
        });
    }

    /**
     * Sets a block of code to be executed right after the SDK's UI is dismissed.
     * This block is executed on the UI thread. Could be used for performing any
     * UI changes after the SDK's UI is dismissed.
     *
     * @param handler - A callback to get executed after
     *                              dismissing the SDK.
     */
    @ReactMethod
    public void setOnSDKDismissedHandler(final Callback handler) {
        MainThreadHandler.runOnMainThread(new Runnable() {
            @Override
            public void run() {
                try {
                    BugReporting.setOnDismissCallback(new OnSdkDismissCallback() {
                        @Override
                        public void call(DismissType dismissType, ReportType reportType) {
                            WritableMap params = Arguments.createMap();
                            params.putString("dismissType", dismissType.toString());
                            params.putString("reportType", reportType.toString());
                            InstabugUtil.sendEvent(getReactApplicationContext(), Constants.IBG_POST_INVOCATION_HANDLER, params);
                        }
                    });
                } catch (java.lang.Exception exception) {
                    exception.printStackTrace();
                }
            }
        });
    }

    /**
     * Sets the threshold value of the shake gesture for android devices.
     * Default for android is an integer value equals 350.
     * you could increase the shaking difficulty level by
     * increasing the `350` value and vice versa.
     *
     * @param androidThreshold Threshold for android devices.
     */
    @ReactMethod
    public void setShakingThresholdForAndroid(final int androidThreshold) {
        MainThreadHandler.runOnMainThread(new Runnable() {
            @Override
            public void run() {
                try {
                    BugReporting.setShakingThreshold(androidThreshold);
                } catch (Exception e) {
                    e.printStackTrace();
                }
            }
        });
    }

    /**
     * Sets the enabled report types to be shown in the prompt. Bug or Feedback or both.
     * @param types
     * @see BugReporting.ReportType
     */
    @SuppressLint("WrongConstant")
    @ReactMethod
    public void setReportTypes(ReadableArray types) {
        Object[] objectArray = ArrayUtil.toArray(types);
        String[] stringArray = Arrays.copyOf(objectArray, objectArray.length, String[].class);
        final int[] parsedReportTypes = new int[stringArray.length];
        for (int i = 0; i < stringArray.length; i++) {
            parsedReportTypes[i] = (int) ArgsRegistry.getRawValue(stringArray[i]);
        }
        MainThreadHandler.runOnMainThread(new Runnable() {
            @Override
            public void run() {
                try {
                    BugReporting.setReportTypes(parsedReportTypes);
                } catch (Exception e) {
                    e.printStackTrace();
                }
            }
        });
    }

    /**
     * Shows a bug or feedback report with optional options.
     * @param reportType Bug or Feedback.
     * @param options array of options
     * @see BugReporting.ReportType
     * @see Option
     */
    @ReactMethod
    public void show(final String reportType, final ReadableArray options) {
        MainThreadHandler.runOnMainThread(new Runnable() {
            @Override
            public void run() {
                if (ArgsRegistry.getDeserializedValue(reportType, Integer.class) == null) {
                    return;
                }
                BugReporting.show((int) ArgsRegistry.getRawValue(reportType));
                setOptions(options);
            }
        });
    }


}
