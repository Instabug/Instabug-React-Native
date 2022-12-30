package com.instabug.reactlibrary;

import android.annotation.SuppressLint;
import android.app.Application;
import android.graphics.Bitmap;
import android.net.Uri;
import android.os.Handler;
import android.os.Looper;
import android.util.Log;
import android.view.View;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableArray;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.bridge.WritableArray;
import com.facebook.react.bridge.WritableNativeArray;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.bridge.WritableNativeMap;
import com.facebook.react.bridge.Callback;

import com.facebook.react.modules.core.DeviceEventManagerModule;
import com.facebook.react.uimanager.NativeViewHierarchyManager;
import com.facebook.react.uimanager.UIBlock;
import com.facebook.react.uimanager.UIManagerModule;
import com.instabug.apm.APM;
import com.instabug.bug.BugReporting;
import com.instabug.bug.instabugdisclaimer.Internal;
import com.instabug.bug.invocation.Option;
import com.instabug.chat.Replies;
import com.instabug.crash.CrashReporting;
import com.instabug.featuresrequest.FeatureRequests;
import com.instabug.featuresrequest.ActionType;
import com.instabug.library.Feature;
import com.instabug.library.Instabug;
import com.instabug.library.InstabugState;
import com.instabug.library.OnSdkDismissCallback;
import com.instabug.library.Platform;
import com.instabug.library.LogLevel;
import com.instabug.library.extendedbugreport.ExtendedBugReport;
import com.instabug.library.internal.module.InstabugLocale;
import com.instabug.library.invocation.InstabugInvocationEvent;
import com.instabug.library.InstabugColorTheme;
import com.instabug.library.invocation.OnInvokeCallback;
import com.instabug.library.invocation.util.InstabugFloatingButtonEdge;
import com.instabug.library.invocation.util.InstabugVideoRecordingButtonPosition;
import com.instabug.library.logging.InstabugLog;
import com.instabug.library.ui.onboarding.WelcomeMessage;
import com.instabug.library.InstabugCustomTextPlaceHolder;
import com.instabug.library.model.Report;
import com.instabug.library.model.NetworkLog;
import com.instabug.library.visualusersteps.State;

import com.instabug.reactlibrary.utils.ArrayUtil;
import com.instabug.reactlibrary.utils.InstabugUtil;
import com.instabug.reactlibrary.utils.MainThreadHandler;
import com.instabug.reactlibrary.utils.ReportUtil;
import com.instabug.survey.callbacks.*;
import com.instabug.survey.Survey;
import com.instabug.survey.Surveys;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;
import org.json.JSONTokener;

import java.io.File;
import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Locale;
import java.util.Map;

import static com.instabug.reactlibrary.utils.InstabugUtil.getMethod;


/**
 * The type Rn instabug reactnative module.
 */
public class RNInstabugReactnativeModule extends ReactContextBaseJavaModule {

    private static final String TAG = RNInstabugReactnativeModule.class.getSimpleName();

    private InstabugCustomTextPlaceHolder placeHolders;
    private static Report currentReport;

    /**
     * Instantiates a new Rn Instabug ReactNative module.
     *
     * @param reactContext the react context
     */
    public RNInstabugReactnativeModule(ReactApplicationContext reactContext) {
        super(reactContext);
        //init placHolders
        placeHolders = new InstabugCustomTextPlaceHolder();
    }

    @Override
    public String getName() {
        return "Instabug";
    }
    
    /** 
     * Enables or disables Instabug functionality.
     * @param isEnabled A boolean to enable/disable Instabug.
     */
    @ReactMethod
    public void setEnabled(final boolean isEnabled) {
        MainThreadHandler.runOnMainThread(new Runnable() {
            @Override
            public void run() {
                try {
                    if(isEnabled)
                        Instabug.enable();
                    else
                        Instabug.disable();
                } catch (Exception e) {
                    e.printStackTrace();
                }
            }
        });
    } 

    /**
     * Initializes the SDK.
     * @param token The token that identifies the app. You can find it on your dashboard.
     * @param invocationEventValues The events that invoke the SDK's UI.
     */
    @ReactMethod
    public void init(final String token, final ReadableArray invocationEventValues, final String logLevel) {
        MainThreadHandler.runOnMainThread(new Runnable() {
            @Override
            public void run() {
                try {
                    final ArrayList<String> keys = ArrayUtil.parseReadableArrayOfStrings(invocationEventValues);
                    final ArrayList<InstabugInvocationEvent> parsedInvocationEvents = ArgsRegistry.invocationEvents.getAll(keys);
                    final int parsedLogLevel = ArgsRegistry.sdkLogLevels.getOrDefault(logLevel, LogLevel.ERROR);

                    setCurrentPlatform();
                    setBaseUrlForDeprecationLogs();

                    new Instabug.Builder(getCurrentActivity().getApplication(), token)
                            .setInvocationEvents(parsedInvocationEvents.toArray(new InstabugInvocationEvent[0]))
                            .setSdkDebugLogsLevel(parsedLogLevel)
                            .build();

                    // Temporarily disabling APM hot launches
                    APM.setHotAppLaunchEnabled(false);
                } catch (Exception e) {
                    e.printStackTrace();
                }
            }
        });
    }

    private void setCurrentPlatform() {
        try {
            Method method = InstabugUtil.getMethod(Class.forName("com.instabug.library.Instabug"), "setCurrentPlatform", int.class);
            if (method != null) {
                Log.i("IB-CP-Bridge", "invoking setCurrentPlatform with platform: " + Platform.RN);
                method.invoke(null, Platform.RN);
            } else {
                Log.e("IB-CP-Bridge", "setCurrentPlatform was not found by reflection");
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    private void setBaseUrlForDeprecationLogs() {
        try {
            Method method = InstabugUtil.getMethod(Class.forName("com.instabug.library.util.InstabugDeprecationLogger"), "setBaseUrl", String.class);
            if (method != null) {
                method.invoke(null, "https://docs.instabug.com/docs/react-native-sdk-migration-guide");
            }
        } catch (ClassNotFoundException e) {
            e.printStackTrace();
        } catch (IllegalAccessException e) {
            e.printStackTrace();
        } catch (InvocationTargetException e) {
            e.printStackTrace();
        }
    }

    /**
     * Adds tag(s) to issues before sending them
     *
     * @param tags
     */
    @ReactMethod
    public void appendTags(final ReadableArray tags) {
        MainThreadHandler.runOnMainThread(new Runnable() {
            @Override
            public void run() {
                try {
                    Object[] objectArray = ArrayUtil.toArray(tags);
                    String[] stringArray = Arrays.copyOf(objectArray, objectArray.length, String[].class);
                    Instabug.addTags(stringArray);
                } catch (Exception e) {
                    e.printStackTrace();
                }
            }
        });

    }

    /**
     * Change Locale of Instabug UI elements(defaults to English)
     *
     * @param instabugLocale
     */
    @ReactMethod
    public void setLocale(final String instabugLocale) {
        MainThreadHandler.runOnMainThread(new Runnable() {
            @Override
            public void run() {
                try {
                    final InstabugLocale parsedLocale = ArgsRegistry.locales
                            .getOrDefault(instabugLocale, InstabugLocale.ENGLISH);
                    final Locale locale = new Locale(parsedLocale.getCode(), parsedLocale.getCountry());
                    Instabug.setLocale(locale);
                } catch (Exception e) {
                    e.printStackTrace();
                }
            }
        });
    }

    /**
     * Sets whether the extended bug report mode should be disabled,
     * enabled with required fields, or enabled with optional fields.
     *
     * @param extendedBugReportMode
     */
    @ReactMethod
    public void setExtendedBugReportMode(final String extendedBugReportMode) {
        MainThreadHandler.runOnMainThread(new Runnable() {
            @Override
            public void run() {
                try {
                    final ExtendedBugReport.State state = ArgsRegistry.extendedBugReportStates
                            .getOrDefault(extendedBugReportMode, ExtendedBugReport.State.DISABLED);
                    BugReporting.setExtendedBugReportState(state);
                } catch (Exception e) {
                    e.printStackTrace();
                }
            }
        });
    }

    /**
     * The file at filePath will be uploaded along upcoming reports with the name
     * fileNameWithExtension
     *
     * @param fileUri               the file uri
     * @param fileNameWithExtension the file name with extension
     */
    @ReactMethod
    public void setFileAttachment(final String fileUri, final String fileNameWithExtension) {
        MainThreadHandler.runOnMainThread(new Runnable() {
            @Override
            public void run() {
                try {
                    File file = new File(fileUri);
                    if (file.exists()) {
                        Instabug.addFileAttachment(Uri.fromFile(file), fileNameWithExtension);
                    }
                } catch (Exception e) {
                    e.printStackTrace();
                }
            }
        });

    }

    /**
     * Adds specific user data that you need to be added to the reports
     *
     * @param userData
     */
    @ReactMethod
    public void setUserData(final String userData) {
        MainThreadHandler.runOnMainThread(new Runnable() {
            @Override
            public void run() {
                try {
                    Instabug.setUserData(userData);
                } catch (Exception e) {
                    e.printStackTrace();
                }
            }
        });
    }

    /**
     * Set the primary color that the SDK will use to tint certain UI elements in the SDK
     *
     * @param primaryColor The value of the primary color ,
     *                     whatever this color was parsed from a resource color or hex color
     *                     or RGB color values
     */
    @ReactMethod
    public void setPrimaryColor(final int primaryColor) {
        MainThreadHandler.runOnMainThread(new Runnable() {
            @Override
            public void run() {
                try {
                    Instabug.setPrimaryColor(primaryColor);
                } catch (Exception e) {
                    e.printStackTrace();
                }
            }
        });
    }
    
    /**
     * Gets tags.
     *
     * @return all tags added
     * @see #resetTags()
     */
    @ReactMethod
    public void getTags(final Callback tagsCallback) {
        MainThreadHandler.runOnMainThread(new Runnable() {
            @Override
            public void run() {
                WritableArray tagsArray;
                try {
                    ArrayList<String> tags = Instabug.getTags();
                    tagsArray = Arguments.createArray();
                    for (int i = 0; i < tags.size(); i++) {
                        tagsArray.pushString(tags.get(i));
                    }
                    tagsCallback.invoke(tagsArray);

                } catch (Exception e) {
                    e.printStackTrace();
                }
            }
        });
    }

    /**
     * Set the user identity.
     * Instabug will pre-fill the user email in reports.
     *
     * @param userName  Username.
     * @param userEmail User's default email
     */
    @ReactMethod
    public void identifyUser(final String userEmail, final String userName) {
        MainThreadHandler.runOnMainThread(new Runnable() {
            @Override
            public void run() {
                try {
                    Instabug.identifyUser(userName, userEmail);
                } catch (Exception e) {
                    e.printStackTrace();
                }
            }
        });
    }

    /**
     * Reset ALL tags added
     */
    @ReactMethod
    public void resetTags() {
        MainThreadHandler.runOnMainThread(new Runnable() {
            @Override
            public void run() {
                try {
                    Instabug.resetTags();
                } catch (Exception e) {
                    e.printStackTrace();
                }
            }
        });
    }

    /**
     * Is enabled boolean.
     *
     * @return {@code true} if Instabug is enabled, {@code false} if it's disabled
     * @see #enable()
     * @see #disable()
     */
    @ReactMethod
    public boolean isEnabled() {
        boolean isEnabled = false;
        try {
            isEnabled = Instabug.isEnabled();
        } catch (Exception e) {
            e.printStackTrace();
        }
        return isEnabled;
    }


    /**
     * Enables all Instabug functionality
     */
    @ReactMethod
    public void enable() {
        MainThreadHandler.runOnMainThread(new Runnable() {
            @Override
            public void run() {
                try {
                    Instabug.enable();
                } catch (Exception e) {
                    e.printStackTrace();
                }
            }
        });
    }

    /**
     * Disables all Instabug functionality
     */
    @ReactMethod
    public void disable() {
        MainThreadHandler.runOnMainThread(new Runnable() {
            @Override
            public void run() {
                try {
                    Instabug.disable();
                } catch (Exception e) {
                    e.printStackTrace();
                }
            }
        });
    }

    /**
     * Shows the UI for feature requests list
     */
    @ReactMethod
    public void showFeatureRequests() {
        MainThreadHandler.runOnMainThread(new Runnable() {
            @Override
            public void run() {
                try {
                    FeatureRequests.show();
                } catch (Exception e) {
                    e.printStackTrace();
                }
            }
        });
    }

    /**
     * @return application token
     */
    @ReactMethod
    public String getAppToken() {
        String appToken = "";
        try {
            appToken = Instabug.getAppToken();
        } catch (Exception e) {
            e.printStackTrace();
        }

        return appToken;
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
                    final InstabugInvocationEvent invocationEvent = ArgsRegistry.invocationEvents
                            .getOrDefault(invocationEventValue, InstabugInvocationEvent.SHAKE);
                    BugReporting.setInvocationEvents(invocationEvent);
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
     * Sets the event used to invoke Instabug SDK
     *
     * @param invocationOptionValues the invocation event value
     * @see InstabugInvocationEvent
     */
    @ReactMethod
    public void setInvocationOptions(final ReadableArray invocationOptionValues) {
        MainThreadHandler.runOnMainThread(new Runnable() {
            @SuppressLint("WrongConstant")
            @Override
            public void run() {
                try {
                    final ArrayList<String> keys = ArrayUtil.parseReadableArrayOfStrings(invocationOptionValues);
                    final ArrayList<Integer> options = ArgsRegistry.invocationOptions.getAll(keys);

                    final int[] optionsInts = new int[options.size()];
                    for (int i = 0; i < options.size(); i++) {
                        optionsInts[i] = options.get(i);
                    }

                    BugReporting.setOptions(optionsInts);
                } catch (Exception e) {
                    e.printStackTrace();
                }
            }
        });
    }

    /**
     * Enable/Disable debug logs from Instabug SDK
     * Default state: disabled
     *
     * @param isDebugEnabled whether debug logs should be printed or not into LogCat
     */
    @ReactMethod
    public void setDebugEnabled(final boolean isDebugEnabled) {
        MainThreadHandler.runOnMainThread(new Runnable() {
            @Override
            public void run() {
                try {
                    Instabug.setDebugEnabled(isDebugEnabled);
                } catch (Exception e) {
                    e.printStackTrace();
                }
            }
        });
    }




    /**
     * Appends a log message to Instabug internal log
     * <p>
     * These logs are then sent along the next uploaded report.
     * All log messages are timestamped <br/>
     * Logs aren't cleared per single application run. If you wish to reset the logs,
     * use {@link #clearLogs()} ()}
     * </p>
     * Note: logs passed to this method are <b>NOT</b> printed to Logcat
     *
     * @param level   the level
     * @param message the message
     */
    @ReactMethod
    public void log(final String level, final String message) {
        MainThreadHandler.runOnMainThread(new Runnable() {
            @Override
            public void run() {
                try {
                    switch (level) {
                        case "v":
                            InstabugLog.v(message);
                            break;
                        case "i":
                            InstabugLog.i(message);
                            break;
                        case "d":
                            InstabugLog.d(message);
                            break;
                        case "e":
                            InstabugLog.e(message);
                            break;
                        case "w":
                            InstabugLog.w(message);
                            break;
                        case "wtf":
                            InstabugLog.wtf(message);
                            break;
                        default:
                            InstabugLog.d(message);
                    }
                } catch (Exception e) {
                    e.printStackTrace();
                }
            }
        });

    }

    @ReactMethod
    public void logVerbose(final String message) {
        MainThreadHandler.runOnMainThread(new Runnable() {
            @Override
            public void run() {
                try {
                    InstabugLog.v(message);
                } catch (Exception e) {
                    e.printStackTrace();
                }
            }
        });
    }

    @ReactMethod
    public void logDebug(final String message) {
        MainThreadHandler.runOnMainThread(new Runnable() {
            @Override
            public void run() {
                try {
                    InstabugLog.d(message);
                } catch (Exception e) {
                    e.printStackTrace();
                }
            }
        });
    }

    @ReactMethod
    public void logInfo(final String message) {
        MainThreadHandler.runOnMainThread(new Runnable() {
            @Override
            public void run() {
                try {
                    InstabugLog.i(message);
                } catch (Exception e) {
                    e.printStackTrace();
                }
            }
        });
    }

    @ReactMethod
    public void logError(final String message) {
        MainThreadHandler.runOnMainThread(new Runnable() {
            @Override
            public void run() {
                try {
                    InstabugLog.e(message);
                } catch (Exception e) {
                    e.printStackTrace();
                }
            }
        });
    }

    @ReactMethod
    public void logWarn(final String message) {
        MainThreadHandler.runOnMainThread(new Runnable() {
            @Override
            public void run() {
                try {
                    InstabugLog.w(message);
                } catch (Exception e) {
                    e.printStackTrace();
                }
            }
        });
    }

    /**
     * Clears Instabug internal log
     */
    @ReactMethod
    public void clearLogs() {
        MainThreadHandler.runOnMainThread(new Runnable() {
            @Override
            public void run() {
                try {
                    InstabugLog.clearLogs();
                } catch (Exception e) {
                    e.printStackTrace();
                }
            }
        });
    }

    /**
     * Returns true if the survey with a specific token was answered before.
     * Will return false if the token does not exist or if the survey was not answered before.
     *
     * @param surveyToken          the attribute key as string
     * @param hasRespondedCallback A callback that gets invoked with the returned value of whether
     *                             the user has responded to the survey or not.
     * @return the desired value of whether the user has responded to the survey or not.
     */
    @ReactMethod
    public void hasRespondedToSurveyWithToken(final String surveyToken, final Callback hasRespondedCallback) {
        MainThreadHandler.runOnMainThread(new Runnable() {
            @Override
            public void run() {
                boolean hasResponded;
                try {
                    hasResponded = Surveys.hasRespondToSurvey(surveyToken);
                    hasRespondedCallback.invoke(hasResponded);
                } catch (Exception e) {
                    e.printStackTrace();
                }
            }
        });
    }

    /**
     * Shows survey with a specific token.
     * Does nothing if there are no available surveys with that specific token.
     * Answered and cancelled surveys won't show up again.
     *
     * @param surveyToken A String with a survey token.
     */
    @ReactMethod
    public void showSurveyWithToken(final String surveyToken) {
        MainThreadHandler.runOnMainThread(new Runnable() {
            @Override
            public void run() {
                try {
                    Surveys.showSurvey(surveyToken);
                } catch (Exception e) {
                    e.printStackTrace();
                }
            }
        });
    }

    /**
     * Sets user attribute to overwrite it's value or create a new one if it doesn't exist.
     *
     * @param key   the attribute
     * @param value the value
     */
    @ReactMethod
    public void setUserAttribute(final String key, final String value) {
        MainThreadHandler.runOnMainThread(new Runnable() {
            @Override
            public void run() {
                try {
                    Instabug.setUserAttribute(key, value);
                } catch (Exception e) {
                    e.printStackTrace();
                }
            }
        });
    }

    /**
     * Gets specific user attribute.
     *
     * @param key the attribute key as string
     * @return the desired user attribute
     */
    @ReactMethod
    public void getUserAttribute(final String key, final Callback userAttributeCallback) {
        MainThreadHandler.runOnMainThread(new Runnable() {
            @Override
            public void run() {
                String userAttribute;
                try {
                    userAttribute = Instabug.getUserAttribute(key);
                    userAttributeCallback.invoke(userAttribute);
                } catch (Exception e) {
                    e.printStackTrace();
                }
            }
        });
    }

    /**
     * Removes user attribute if exists.
     *
     * @param key the attribute key as string
     * @see #setUserAttribute(String, String)
     */
    @ReactMethod
    public void removeUserAttribute(final String key) {
        MainThreadHandler.runOnMainThread(new Runnable() {
            @Override
            public void run() {
                try {
                    Instabug.removeUserAttribute(key);
                } catch (Exception e) {
                    e.printStackTrace();
                }
            }
        });
    }

    /**
     * Gets all saved user attributes.
     *
     * @return all user attributes as HashMap<String, String>
     */
    @ReactMethod
    public void getAllUserAttributes(final Callback userAttributesCallback) {
        MainThreadHandler.runOnMainThread(new Runnable() {
            @Override
            public void run() {
                WritableMap writableMap = Arguments.createMap();
                try {
                    HashMap<String, String> map = Instabug.getAllUserAttributes();
                    for (HashMap.Entry<String, String> entry : map.entrySet()) {
                        writableMap.putString(entry.getKey(), entry.getValue());
                    }
                } catch (Exception e) {
                    e.printStackTrace();
                }
                userAttributesCallback.invoke(writableMap);
            }
        });
    }

    /**
     * Clears all user attributes if exists.
     */
    @ReactMethod
    public void clearAllUserAttributes() {
        MainThreadHandler.runOnMainThread(new Runnable() {
            @Override
            public void run() {
                try {
                    Instabug.clearAllUserAttributes();
                } catch (Exception e) {
                    e.printStackTrace();
                }
            }
        });
    }

    /**
     * Sets InstabugSDK theme color.
     *
     * @param theme which is a constant String "light" or "dark"
     */
    @ReactMethod
    public void setColorTheme(final String theme) {
        MainThreadHandler.runOnMainThread(new Runnable() {
            @Override
            public void run() {
                try {
                    final InstabugColorTheme colorTheme = ArgsRegistry.colorThemes
                            .getOrDefault(theme, InstabugColorTheme.InstabugColorThemeLight);
                    Instabug.setColorTheme(colorTheme);
                } catch (Exception e) {
                    e.printStackTrace();
                }
            }
        });
    }
    
    /**
     * Overrides any of the strings shown in the SDK with custom ones.
     * Allows you to customize any of the strings shown to users in the SDK.
     *
     * @param string String value to override the default one.
     * @param key    Key of string to override.
     */
    @ReactMethod
    public void setString(final String string, final String key) {
        MainThreadHandler.runOnMainThread(new Runnable() {
            @Override
            public void run() {
                try {
                    final InstabugCustomTextPlaceHolder.Key parsedKey = ArgsRegistry.placeholders.get(key);
                    placeHolders.set(parsedKey, string);
                    Instabug.setCustomTextPlaceHolders(placeHolders);
                } catch (java.lang.Exception exception) {
                    exception.printStackTrace();
                }
            }
        });
    }

    /**
     * Sets the default value of the user's email to null and show email field and remove user
     * name from all reports
     * It also reset the chats on device and removes user attributes, user data and completed
     * surveys.
     */
    @ReactMethod
    public void logOut() {
        MainThreadHandler.runOnMainThread(new Runnable() {
            @Override
            public void run() {
                try {
                    Instabug.logoutUser();
                } catch (java.lang.Exception exception) {
                    exception.printStackTrace();
                }
            }
        });
    }

    /**
     * Logs a user event that happens through the lifecycle of the application.
     * Logged user events are going to be sent with each report, as well as at the end of a session.
     *
     * @param name Event name.
     */
    @ReactMethod
    public void logUserEvent(final String name) {
        MainThreadHandler.runOnMainThread(new Runnable() {
            @Override
            public void run() {
                try {
                    Instabug.logUserEvent(name);
                } catch (java.lang.Exception exception) {
                    exception.printStackTrace();
                }
            }
        });
    }

    /**
     * Sets a block of code to be executed just before the SDK's UI is presented.
     * This block is executed on the UI thread. Could be used for performing any
     * UI changes before the SDK's UI is shown.
     *
     * @param preInvocationHandler - A callback that gets executed before
     *                             invoking the SDK
     */
    @ReactMethod
    public void setPreInvocationHandler(final Callback preInvocationHandler) {
        MainThreadHandler.runOnMainThread(new Runnable() {
            @Override
            public void run() {
                try {
                    BugReporting.setOnInvokeCallback(new OnInvokeCallback() {
                        @Override
                        public void onInvoke() {
                            sendEvent(getReactApplicationContext(), "IBGpreInvocationHandler", null);
                        }
                    });
                } catch (java.lang.Exception exception) {
                    exception.printStackTrace();
                }
            }
        });
    }

    /**
     * Sets a block of code to be executed before sending each report.
     * This block is executed in the background before sending each report. Could
     * be used for attaching logs and extra data to reports.
     *
     * @param preSendingHandler - A callback that gets executed before
     *                          sending each bug
     *                          report.
     */
    @ReactMethod
    public void setPreSendingHandler(final Callback preSendingHandler) {
        MainThreadHandler.runOnMainThread(new Runnable() {
            @Override
            public void run() {
                Instabug.onReportSubmitHandler(new Report.OnReportCreatedListener() {
                    @Override
                    public void onReportCreated(Report report) {
                        WritableMap reportParam = Arguments.createMap();
                        reportParam.putArray("tagsArray", convertArrayListToWritableArray(report.getTags()));
                        reportParam.putArray("consoleLogs", convertArrayListToWritableArray(report.getConsoleLog()));
                        reportParam.putString("userData", report.getUserData());
                        reportParam.putMap("userAttributes", convertFromHashMapToWriteableMap(report.getUserAttributes()));
                        reportParam.putMap("fileAttachments", convertFromHashMapToWriteableMap(report.getFileAttachments()));
                        sendEvent(getReactApplicationContext(), "IBGpreSendingHandler", reportParam);
                        currentReport = report;
                    }
                });
            }
        });
    }

    protected static void clearCurrentReport() {
        currentReport = null;
    }

    @ReactMethod
    public void appendTagToReport(String tag) {
        if (currentReport != null) {
            currentReport.addTag(tag);
        }
    }

    @ReactMethod
    public void appendConsoleLogToReport(String consoleLog) {
        if (currentReport != null) {
            currentReport.appendToConsoleLogs(consoleLog);
        }
    }

    @ReactMethod
    public void setUserAttributeToReport(String key, String value) {
        if (currentReport != null) {
            currentReport.setUserAttribute(key, value);
        }
    }

    @ReactMethod
    public void logDebugToReport(String log) {
        if (currentReport != null) {
            currentReport.logDebug(log);
        }
    }

    @ReactMethod
    public void logVerboseToReport(String log) {
        if (currentReport != null) {
            currentReport.logVerbose(log);
        }
    }

    @ReactMethod
    public void logWarnToReport(String log) {
        if (currentReport != null) {
            currentReport.logWarn(log);
        }
    }

    @ReactMethod
    public void logErrorToReport(String log) {
        if (currentReport != null) {
            currentReport.logError(log);
        }
    }

    @ReactMethod
    public void logInfoToReport(String log) {
        if (currentReport != null) {
            currentReport.logInfo(log);
        }
    }

    @ReactMethod
    public void addFileAttachmentWithURLToReport(String urlString, String fileName) {
        if (currentReport != null) {
            Uri uri = Uri.parse(urlString);
            currentReport.addFileAttachment(uri, fileName);
        }
    }

    @ReactMethod
    public void addFileAttachmentWithDataToReport(String data, String fileName) {
        if (currentReport != null) {
            currentReport.addFileAttachment(data.getBytes(), fileName);
        }
    }

    
    @ReactMethod
    public void getReport(Promise promise) {
        try {
            Method method = getMethod(Class.forName("com.instabug.library.Instabug"), "getReport");
            if (method != null) {
                Report report = (Report) method.invoke(null);
                WritableMap reportParam = Arguments.createMap();
                reportParam.putArray("tagsArray", convertArrayListToWritableArray(report.getTags()));
                reportParam.putArray("consoleLogs", ReportUtil.parseConsoleLogs(report.getConsoleLog()));
                reportParam.putString("userData", report.getUserData());
                reportParam.putMap("userAttributes", convertFromHashMapToWriteableMap(report.getUserAttributes()));
                reportParam.putMap("fileAttachments", convertFromHashMapToWriteableMap(report.getFileAttachments()));
                promise.resolve(reportParam);
                currentReport = report;
            }

        } catch (ClassNotFoundException e) {
            promise.reject(e);
        } catch (IllegalAccessException e) {
            promise.reject(e);
        } catch (InvocationTargetException e) {
            promise.reject(e);
        }
    }


    private WritableMap convertFromHashMapToWriteableMap(HashMap hashMap) {
        WritableMap writableMap = new WritableNativeMap();
        for(int i = 0; i < hashMap.size(); i++) {
            Object key = hashMap.keySet().toArray()[i];
            Object value = hashMap.get(key);
            writableMap.putString((String) key,(String) value);
        }
        return writableMap;
    }

    private static JSONObject objectToJSONObject(Object object){
        Object json = null;
        JSONObject jsonObject = null;
        try {
            json = new JSONTokener(object.toString()).nextValue();
        } catch (JSONException e) {
            e.printStackTrace();
        }
        if (json instanceof JSONObject) {
            jsonObject = (JSONObject) json;
        }
        return jsonObject;
    }

    private WritableArray convertArrayListToWritableArray(List arrayList) {
        WritableArray writableArray = new WritableNativeArray();

        for(int i = 0; i < arrayList.size(); i++) {
            Object object = arrayList.get(i);

            if(object instanceof String) {
                writableArray.pushString((String) object);
            }
            else {
                JSONObject jsonObject = objectToJSONObject(object);
                writableArray.pushMap((WritableMap) jsonObject);
            }
        }

        return writableArray;

    }

    /**
     * Sets a block of code to be executed right after the SDK's UI is dismissed.
     * This block is executed on the UI thread. Could be used for performing any
     * UI changes after the SDK's UI is dismissed.
     *
     * @param postInvocationHandler - A callback to get executed after
     *                              dismissing the SDK.
     */
    @ReactMethod
    public void setPostInvocationHandler(final Callback postInvocationHandler) {
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
                            sendEvent(getReactApplicationContext(), "IBGpostInvocationHandler", params);
                        }
                    });
                } catch (java.lang.Exception exception) {
                    exception.printStackTrace();
                }
            }
        });
    }

    /**
     * Show any valid survey if exist
     *
     * @return true if a valid survey was shown otherwise false
     */
    @ReactMethod
    public void showSurveysIfAvailable() {
        MainThreadHandler.runOnMainThread(new Runnable() {
            @Override
            public void run() {
                try {
                    Surveys.showSurveyIfAvailable();
                } catch (java.lang.Exception exception) {
                    exception.printStackTrace();
                }
            }
        });
    }

    /**
     * Sets the runnable that gets executed just before showing any valid survey<br/>
     * WARNING: This runs on your application's main UI thread. Please do not include
     * any blocking operations to avoid ANRs.
     *
     * @param willShowSurveyHandler to run on the UI thread before showing any valid survey
     */
    @ReactMethod
    public void setWillShowSurveyHandler(final Callback willShowSurveyHandler) {
        MainThreadHandler.runOnMainThread(new Runnable() {
            @Override
            public void run() {
                Surveys.setOnShowCallback(new OnShowCallback() {
                    @Override
                    public void onShow() {
                        sendEvent(getReactApplicationContext(), "IBGWillShowSurvey", null);
                    }
                });
            }
        });
    }

    /**
     * Sets the runnable that gets executed just after showing any valid survey<br/>
     * WARNING: This runs on your application's main UI thread. Please do not include
     * any blocking operations to avoid ANRs.
     *
     * @param didDismissSurveyHandler to run on the UI thread after showing any valid survey
     */
    @ReactMethod
    public void setDidDismissSurveyHandler(final Callback didDismissSurveyHandler) {
        MainThreadHandler.runOnMainThread(new Runnable() {
            @Override
            public void run() {
                Surveys.setOnDismissCallback(new OnDismissCallback() {
                    @Override
                    public void onDismiss() {
                        sendEvent(getReactApplicationContext(), "IBGDidDismissSurvey", null);
                    }
                });
            }
        });
    }


    /**
     * Clears all Uris of the attached files.
     * The URIs which added via {@link Instabug#addFileAttachment} API not the physical files.
     */
    @ReactMethod
    public void clearFileAttachment() {
        MainThreadHandler.runOnMainThread(new Runnable() {
            @Override
            public void run() {
                try {
                    Instabug.clearFileAttachment();
                } catch (Exception e) {
                    e.printStackTrace();
                }
            }
        });
    }

 /**
     * Sets whether user steps tracking is visual, non visual or disabled.
     *
     * @param reproStepsMode A string to set user steps tracking to be
     *                       enabled, non visual or disabled.
     */
    @ReactMethod
    public void setReproStepsMode(final String reproStepsMode) {
        MainThreadHandler.runOnMainThread(new Runnable() {
            @Override
            public void run() {
                try {
                    final State parsedState = ArgsRegistry.reproStates.get(reproStepsMode);
                    Instabug.setReproStepsState(parsedState);
                } catch (Exception e) {
                    e.printStackTrace();
                }
            }
        });
    }

    /**
     * Shows the welcome message in a specific mode.
     *
     * @param welcomeMessageMode An enum to set the welcome message mode to
      *                          live, or beta.
     */
    @ReactMethod
    public void showWelcomeMessageWithMode(final String welcomeMessageMode) {
        MainThreadHandler.runOnMainThread(new Runnable() {
            @Override
            public void run() {
                try {
                    final WelcomeMessage.State parsedState = ArgsRegistry.welcomeMessageStates
                            .getOrDefault(welcomeMessageMode, WelcomeMessage.State.LIVE);
                    Instabug.showWelcomeMessage(parsedState);
                } catch (Exception e) {
                    e.printStackTrace();
                }
            }
        });
    }

    /**
     * Sets the welcome message mode to live, beta or disabled.
     *
     * @param welcomeMessageMode An enum to set the welcome message mode to
      *                          live, beta or disabled.
     */
    @ReactMethod
    public void setWelcomeMessageMode(final String welcomeMessageMode) {
        MainThreadHandler.runOnMainThread(new Runnable() {
            @Override
            public void run() {
                try {
                    final WelcomeMessage.State parsedState = ArgsRegistry.welcomeMessageStates
                            .getOrDefault(welcomeMessageMode, WelcomeMessage.State.LIVE);
                    Instabug.setWelcomeMessageState(parsedState);
                } catch (Exception e) {
                    e.printStackTrace();
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

    @ReactMethod
    public void setOnNewReplyReceivedCallback(final Callback onNewReplyReceivedCallback) {
        MainThreadHandler.runOnMainThread(new Runnable() {
            @Override
            public void run() {
                try {
                    Runnable onNewReplyReceivedRunnable = new Runnable() {
                        @Override
                        public void run() {
                            sendEvent(getReactApplicationContext(), "IBGOnNewReplyReceivedCallback", null);
                        }
                    };
                    Replies.setOnNewReplyReceivedCallback(onNewReplyReceivedRunnable);
                } catch (java.lang.Exception exception) {
                    exception.printStackTrace();
                }
            }
        });
    }

    /**
     * Returns an array containing the available surveys.
     * @param availableSurveysCallback - Callback with the returned value of the available surveys
     *
     */
    @ReactMethod
    public void getAvailableSurveys(final Callback availableSurveysCallback) {
        MainThreadHandler.runOnMainThread(new Runnable() {
            @Override
            public void run() {
                try {
                    List<Survey> availableSurveys = Surveys.getAvailableSurveys();
                    JSONArray surveysArray = toJson(availableSurveys);
                    WritableArray array = convertJsonToArray(surveysArray);
                    availableSurveysCallback.invoke(array);
                } catch (Exception e) {
                    e.printStackTrace();
                }
            }
        });
    }

    @ReactMethod
    public void show() {
        MainThreadHandler.runOnMainThread(new Runnable() {
            @Override
            public void run() {
                Instabug.show();
            }
        });
    }

    @ReactMethod
    public void setBugReportingEnabled(final boolean isEnabled) {
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

    @ReactMethod
    public void setRepliesEnabled(final boolean isEnabled) {
        MainThreadHandler.runOnMainThread(new Runnable() {
            @Override
            public void run() {
                try {
                    if (isEnabled) {
                        Replies.setState(Feature.State.ENABLED);
                    } else {
                        Replies.setState(Feature.State.DISABLED);
                    }
                } catch (Exception e) {
                    e.printStackTrace();
                }
            }
        });
    }

    @ReactMethod
    public void hasChats(final Callback callback) {
        MainThreadHandler.runOnMainThread(new Runnable() {
            @Override
            public void run() {
                boolean hasChats = Replies.hasChats();
                callback.invoke(hasChats);
            }
        });
    }

    @ReactMethod
    public void showReplies() {
        MainThreadHandler.runOnMainThread(new Runnable() {
            @Override
            public void run() {
                Replies.show();
            }
        });
    }

    @ReactMethod
    public void callPrivateApi(String apiName, String param) {
        try {
            if (param == null) {
                Method m = Internal.class.getDeclaredMethod(apiName);
                m.setAccessible(true);
                m.invoke(null);
            } else {
                Method m = Internal.class.getDeclaredMethod(apiName, param.getClass());
                m.setAccessible(true);
                m.invoke(null, param);
            }

        } catch (Exception e) {
            e.printStackTrace();
        }
    }



    private static WritableMap convertJsonToMap(JSONObject jsonObject) throws JSONException {
        WritableMap map = new WritableNativeMap();

        Iterator<String> iterator = jsonObject.keys();
        while (iterator.hasNext()) {
            String key = iterator.next();
            Object value = jsonObject.get(key);
            if (value instanceof JSONObject) {
                map.putMap(key, convertJsonToMap((JSONObject) value));
            } else if (value instanceof  JSONArray) {
                map.putArray(key, convertJsonToArray((JSONArray) value));
            } else if (value instanceof  Boolean) {
                map.putBoolean(key, (Boolean) value);
            } else if (value instanceof  Integer) {
                map.putInt(key, (Integer) value);
            } else if (value instanceof  Double) {
                map.putDouble(key, (Double) value);
            } else if (value instanceof String)  {
                map.putString(key, (String) value);
            } else {
                map.putString(key, value.toString());
            }
        }
        return map;
    }

    private static WritableArray convertJsonToArray(JSONArray jsonArray) throws JSONException {
        WritableArray array = Arguments.createArray();

        for (int i = 0; i < jsonArray.length(); i++) {
            Object value = jsonArray.get(i);
            if (value instanceof JSONObject) {
                array.pushMap(convertJsonToMap((JSONObject) value));
            } else if (value instanceof  JSONArray) {
                array.pushArray(convertJsonToArray((JSONArray) value));
            } else if (value instanceof  Boolean) {
                array.pushBoolean((Boolean) value);
            } else if (value instanceof  Integer) {
                array.pushInt((Integer) value);
            } else if (value instanceof  Double) {
                array.pushDouble((Double) value);
            } else if (value instanceof String)  {
                array.pushString((String) value);
            }
        }
        return array;
    }

    /**
     * Convenience method to convert from a list of Surveys to a JSON array
     *
     * @param list
     *        List of Surveys to be converted to JSON array
     */
    public static JSONArray toJson(List<Survey> list) {
        JSONArray jsonArray = new JSONArray();
        try{
            for (Survey obj : list) {
                JSONObject object = new JSONObject();
                object.put("title", obj.getTitle());
                jsonArray.put(object);
            }
        } catch (JSONException e) {
            e.printStackTrace();
        }
        return jsonArray;
    }

    /**
     * Set Surveys auto-showing state, default state auto-showing enabled
     *
     * @param autoShowingSurveysEnabled whether Surveys should be auto-showing or not
     */
    @ReactMethod
    public void setAutoShowingSurveysEnabled(final boolean autoShowingSurveysEnabled) {
        MainThreadHandler.runOnMainThread(new Runnable() {
            @Override
            public void run() {
                try {
                    Surveys.setAutoShowingEnabled(autoShowingSurveysEnabled);
                } catch (Exception e) {
                    e.printStackTrace();
                }
            }
        });
    }

    /**
     * Enable/disable session profiler
     *
     * @param sessionProfilerEnabled desired state of the session profiler feature
     */
    @ReactMethod
    public void setSessionProfilerEnabled(final boolean sessionProfilerEnabled) {
        MainThreadHandler.runOnMainThread(new Runnable() {
            @Override
            public void run() {
                try {
                    if (sessionProfilerEnabled) {
                        Instabug.setSessionProfilerState(Feature.State.ENABLED);
                    } else {
                        Instabug.setSessionProfilerState(Feature.State.DISABLED);
                    }
                } catch (Exception e) {
                    e.printStackTrace();
                }
            }
        });
    }

    /**
     * Sets whether email field is required or not when submitting
     * new-feature-request/new-comment-on-feature
     *
     * @param isEmailRequired set true to make email field required
     * @param actionTypes Bitwise-or of actions
     */
    @SuppressLint("WrongConstant")
    @ReactMethod
    public void setEmailFieldRequiredForFeatureRequests(final boolean isEmailRequired, final ReadableArray actionTypes) {
        MainThreadHandler.runOnMainThread(new Runnable() {
            @Override
            public void run() {
                try {
                    final ArrayList<String> keys = ArrayUtil.parseReadableArrayOfStrings(actionTypes);
                    final ArrayList<Integer> types = ArgsRegistry.actionTypes.getAll(keys);

                    final int[] typesInts = new int[types.size()];
                    for (int i = 0; i < types.size(); i++) {
                        typesInts[i] = types.get(i);
                    }

                    FeatureRequests.setEmailFieldRequired(isEmailRequired, typesInts);
                } catch (Exception e) {
                    e.printStackTrace();
                }
            }
        });
    }

    /**
     * Extracts HTTP connection properties. Request method, Headers, Date, Url and Response code
     *
     * @param jsonObject the JSON object containing all HTTP connection properties
     * @throws JSONException
     */
    @ReactMethod
    public void networkLog(String jsonObject) throws JSONException {
        NetworkLog networkLog = new NetworkLog();
        String date = System.currentTimeMillis()+"";
        networkLog.setDate(date);
        JSONObject newJSONObject = new JSONObject(jsonObject);
        networkLog.setUrl(newJSONObject.getString("url"));
        networkLog.setRequest(newJSONObject.getString("requestBody"));
        networkLog.setResponse(newJSONObject.getString("responseBody"));
        networkLog.setMethod(newJSONObject.getString("method"));
        networkLog.setResponseCode(newJSONObject.getInt("responseCode"));
        networkLog.setRequestHeaders(newJSONObject.getString("requestHeaders"));
        networkLog.setResponseHeaders(newJSONObject.getString("responseHeaders"));
        networkLog.setTotalDuration(newJSONObject.getLong("duration"));
        networkLog.insert();
    }


    @ReactMethod
    public void addPrivateView(final int reactTag) {
        MainThreadHandler.runOnMainThread(new Runnable() {
            @Override
            public void run() {
                UIManagerModule uiManagerModule = getReactApplicationContext().getNativeModule(UIManagerModule.class);
                uiManagerModule.prependUIBlock(new UIBlock() {
                    @Override
                    public void execute(NativeViewHierarchyManager nativeViewHierarchyManager) {
                        try {
                            final View view = nativeViewHierarchyManager.resolveView(reactTag);
                            Instabug.addPrivateViews(view);
                        } catch(Exception e) {
                            e.printStackTrace();
                        }
                    }
                });
            }
        });
    }

    @ReactMethod
    public void removePrivateView(final int reactTag) {
        MainThreadHandler.runOnMainThread(new Runnable() {
            @Override
            public void run() {
                UIManagerModule uiManagerModule = getReactApplicationContext().getNativeModule(UIManagerModule.class);
                uiManagerModule.prependUIBlock(new UIBlock() {
                    @Override
                    public void execute(NativeViewHierarchyManager nativeViewHierarchyManager) {
                        try {
                            final View view = nativeViewHierarchyManager.resolveView(reactTag);
                            Instabug.removePrivateViews(view);
                        } catch(Exception e) {
                            e.printStackTrace();
                        }
                    }
                });
            }
        });
    }

    /**
     * Reports that the screen has been changed (Repro Steps) the screen sent to this method will be the 'current view' on the dashboard
     *
     * @param screenName string containing the screen name
     *
     */
    @ReactMethod
    public void reportScreenChange(final String screenName) {
        MainThreadHandler.runOnMainThread(new Runnable() {
            @Override
            public void run() {
                try {
                    Method method = getMethod(Class.forName("com.instabug.library.Instabug"), "reportScreenChange", Bitmap.class, String.class);
                    if (method != null) {
                        method.invoke(null , null, screenName);
                    }
                } catch (Exception e) {
                    e.printStackTrace();
                }
            }
        });
    }

    private void sendEvent(ReactApplicationContext reactContext,
                           String eventName,
                           WritableMap params) {
        reactContext
                .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                .emit(eventName, params);
    }

    @ReactMethod
    public void addExperiments(final ReadableArray experiments) {
        MainThreadHandler.runOnMainThread(new Runnable() {
            @Override
            public void run() {
                try {
                    Object[] objectArray = ArrayUtil.toArray(experiments);
                    String[] stringArray = Arrays.copyOf(objectArray, objectArray.length, String[].class);
                    Instabug.addExperiments(Arrays.asList(stringArray));
                } catch (Exception e) {
                    e.printStackTrace();
                }
            }
        });
    }

    @ReactMethod
    public void removeExperiments(final ReadableArray experiments) {
        MainThreadHandler.runOnMainThread(new Runnable() {
            @Override
            public void run() {
                try {
                    Object[] objectArray = ArrayUtil.toArray(experiments);
                    String[] stringArray = Arrays.copyOf(objectArray, objectArray.length, String[].class);
                    Instabug.removeExperiments(Arrays.asList(stringArray));
                } catch (Exception e) {
                    e.printStackTrace();
                }
            }
        });
    }

    @ReactMethod
    public void clearAllExperiments() {
        MainThreadHandler.runOnMainThread(new Runnable() {
            @Override
            public void run() {
                try {
                    Instabug.clearAllExperiments();
                } catch (Exception e) {
                    e.printStackTrace();
                }
            }
        });
    }

    /**
     * Map between the exported JS constant and the arg key in {@link ArgsRegistry}.
     * The constant name and the arg key should match to be able to resolve the
     * constant with its actual value from the {@link ArgsRegistry} maps.
     *
     * This is a workaround, because RN cannot resolve enums in the constants map.
     */
    @Override
    public Map<String, Object> getConstants() {
        final Map<String, Object> args = ArgsRegistry.getAll();
        final Map<String, Object> constants = new HashMap<>();

        for (String key : args.keySet()) {
            constants.put(key, key);
        }

        return constants;
    }
}