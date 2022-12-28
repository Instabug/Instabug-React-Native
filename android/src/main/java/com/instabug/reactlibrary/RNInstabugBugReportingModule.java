package com.instabug.reactlibrary;

import android.annotation.SuppressLint;
import android.annotation.TargetApi;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableArray;
import com.facebook.react.bridge.WritableMap;
import com.instabug.bug.BugReporting;
import com.instabug.bug.invocation.Option;
import com.instabug.library.Feature;
import com.instabug.library.OnSdkDismissCallback;
import com.instabug.library.extendedbugreport.ExtendedBugReport;
import com.instabug.library.invocation.InstabugInvocationEvent;
import com.instabug.library.invocation.OnInvokeCallback;
import com.instabug.library.invocation.util.InstabugFloatingButtonEdge;
import com.instabug.library.invocation.util.InstabugVideoRecordingButtonPosition;
import com.instabug.reactlibrary.utils.ArrayUtil;
import com.instabug.reactlibrary.utils.EventEmitterModule;
import com.instabug.reactlibrary.utils.MainThreadHandler;

import java.util.ArrayList;

import javax.annotation.Nonnull;

public class RNInstabugBugReportingModule extends EventEmitterModule {
    public RNInstabugBugReportingModule(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @Nonnull
    @Override
    public String getName() {
        return "IBGBugReporting";
    }

    @ReactMethod
    public void addListener(String event) {
        super.addListener(event);
    }

    @ReactMethod
    public void removeListeners(Integer count) {
        super.removeListeners(count);
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
                    final ExtendedBugReport.State parsedState = ArgsRegistry.extendedBugReportStates.get(extendedBugReportMode);
                    if (parsedState == null) return;
                    BugReporting.setExtendedBugReportState(parsedState);
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
                    final InstabugVideoRecordingButtonPosition parsedPosition = ArgsRegistry.recordButtonPositions.get(corner);
                    if (parsedPosition == null) return;
                    BugReporting.setVideoRecordingFloatingButtonPosition(parsedPosition);
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
     * Sets the event used to invoke Instabug SDK
     *
     * @param invocationEventValues the invocation event value
     * @see InstabugInvocationEvent
     */
    @ReactMethod
    public void setInvocationEvents(final ReadableArray invocationEventValues) {
        MainThreadHandler.runOnMainThread(new Runnable() {
            @Override
            public void run() {
                try {
                    final ArrayList<String> keys = ArrayUtil.parseReadableArrayOfStrings(invocationEventValues);
                    final ArrayList<InstabugInvocationEvent> parsedInvocationEvents = ArgsRegistry.invocationEvents.getAll(keys);
                    BugReporting.setInvocationEvents(parsedInvocationEvents.toArray(new InstabugInvocationEvent[0]));
                } catch (Exception e) {
                    e.printStackTrace();
                }
            }
        });
    }

    /**
     * Sets the options for the features in the SDK
     *
     * @param optionValues the invocation option value
     */
    @ReactMethod
    public void setOptions(final ReadableArray optionValues) {
        MainThreadHandler.runOnMainThread(new Runnable() {
            @SuppressLint("WrongConstant")
            @Override
            public void run() {
                try {
                    final ArrayList<String> keys = ArrayUtil.parseReadableArrayOfStrings(optionValues);
                    final ArrayList<Integer> options = ArgsRegistry.invocationOptions.getAll(keys);

                    for (int i = 0; i < options.size(); i++) {
                        BugReporting.setOptions(options.get(i));
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
                            sendEvent(Constants.IBG_PRE_INVOCATION_HANDLER, null);
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
                final InstabugFloatingButtonEdge parsedEdge = ArgsRegistry.floatingButtonEdges
                        .getOrDefault(floatingButtonEdge, InstabugFloatingButtonEdge.RIGHT);
                BugReporting.setFloatingButtonOffset(floatingButtonOffset);
                BugReporting.setFloatingButtonEdge(parsedEdge);
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
    public void setOnDismissHandler(final Callback handler) {
        MainThreadHandler.runOnMainThread(new Runnable() {
            @Override
            public void run() {
                try {
                    BugReporting.setOnDismissCallback(new OnSdkDismissCallback() {
                        @Override
                        public void call(DismissType dismissType, ReportType reportType) {
                            final String dismissKey = ArgsRegistry.dismissTypes.getKey(dismissType);
                            final String reportKey = ArgsRegistry.sdkDismissReportTypes.getKey(reportType);
                            final WritableMap params = Arguments.createMap();

                            params.putString("dismissType", dismissKey);
                            params.putString("reportType", reportKey);

                            sendEvent(Constants.IBG_POST_INVOCATION_HANDLER, params);
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
    @ReactMethod
    public void setReportTypes(final ReadableArray types) {
        MainThreadHandler.runOnMainThread(new Runnable() {
            @SuppressLint("WrongConstant")
            @Override
            public void run() {
                try {
                    final ArrayList<String> keys = ArrayUtil.parseReadableArrayOfStrings(types);
                    final ArrayList<Integer> types = ArgsRegistry.reportTypes.getAll(keys);

                    final int[] typesInts = new int[types.size()];
                    for (int i = 0; i < types.size(); i++) {
                        typesInts[i] = types.get(i);
                    }

                    BugReporting.setReportTypes(typesInts);
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
                final Integer parsedReportType = ArgsRegistry.reportTypes.get(reportType);
                if (parsedReportType == null) return;
                BugReporting.show(parsedReportType);
                setOptions(options);
            }
        });
    }

    /**
    * Adds a disclaimer text within the bug reporting form, which can include hyperlinked text.
    * @param text String text.
    */
    @ReactMethod
    public void setDisclaimerText(final String text){
        MainThreadHandler.runOnMainThread(new Runnable() {
            @Override
            public void run() {
                BugReporting.setDisclaimerText(text);
            }
        });
    }

    /**
    * Sets a minimum number of characters as a requirement for the comments field in the different report types.
    * @param limit int number of characters.
    * @param reportTypes (Optional) Array of reportType. If it's not passed, the limit will apply to all report types.
    */
    @ReactMethod
    public void setCommentMinimumCharacterCount(final int limit, final ReadableArray reportTypes){
        MainThreadHandler.runOnMainThread(new Runnable() {
            @SuppressLint("WrongConstant")
            @Override
            public void run() {
                try {
                    final ArrayList<String> keys = ArrayUtil.parseReadableArrayOfStrings(reportTypes);
                    final ArrayList<Integer> types = ArgsRegistry.reportTypes.getAll(keys);

                    final int[] typesInts = new int[types.size()];
                    for (int i = 0; i < types.size(); i++) {
                        typesInts[i] = types.get(i);
                    }

                    BugReporting.setCommentMinimumCharacterCount(limit, typesInts);
                } catch (Exception e) {
                    e.printStackTrace();
                }
            }
        });
    }
}
