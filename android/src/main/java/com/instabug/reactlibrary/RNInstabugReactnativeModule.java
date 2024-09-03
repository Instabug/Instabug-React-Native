package com.instabug.reactlibrary;

import static com.instabug.reactlibrary.utils.InstabugUtil.getMethod;

import android.annotation.SuppressLint;
import android.app.Application;
import android.graphics.Bitmap;
import android.net.Uri;
import android.util.Log;
import android.view.View;

import androidx.annotation.NonNull;
import androidx.annotation.UiThread;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableArray;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.bridge.WritableArray;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.bridge.WritableNativeArray;
import com.facebook.react.bridge.WritableNativeMap;
import com.facebook.react.uimanager.UIManagerModule;
import com.instabug.apm.APM;
import com.instabug.apm.InternalAPM;
import com.instabug.apm.sanitization.OnCompleteCallback;
import com.instabug.apm.sanitization.VoidSanitizer;
import com.instabug.library.Feature;
import com.instabug.library.Instabug;
import com.instabug.library.InstabugColorTheme;
import com.instabug.library.InstabugCustomTextPlaceHolder;
import com.instabug.library.IssueType;
import com.instabug.library.LogLevel;
import com.instabug.library.ReproConfigurations;
import com.instabug.library.core.InstabugCore;
import com.instabug.library.featuresflags.model.IBGFeatureFlag;
import com.instabug.library.internal.module.InstabugLocale;
import com.instabug.library.invocation.InstabugInvocationEvent;
import com.instabug.library.logging.InstabugLog;
import com.instabug.library.logging.listeners.networklogs.NetworkLogListener;
import com.instabug.library.logging.listeners.networklogs.NetworkLogSnapshot;
import com.instabug.library.model.NetworkLog;
import com.instabug.library.model.Report;
import com.instabug.library.ui.onboarding.WelcomeMessage;
import com.instabug.library.util.InstabugSDKLogger;
import com.instabug.library.util.threading.PoolProvider;
import com.instabug.reactlibrary.utils.ArrayUtil;
import com.instabug.reactlibrary.utils.EventEmitterModule;
import com.instabug.reactlibrary.utils.MainThreadHandler;

import com.instabug.reactlibrary.utils.RNTouchedViewExtractor;

import org.json.JSONException;
import org.json.JSONObject;
import org.json.JSONTokener;

import java.io.File;
import java.lang.reflect.Method;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Locale;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.CountDownLatch;
import java.util.concurrent.Executor;
import java.util.concurrent.Executors;

import javax.annotation.Nullable;


/**
 * The type Rn instabug reactnative module.
 */
public class RNInstabugReactnativeModule extends EventEmitterModule {

    private static final String TAG = "IBG-RN-Core";

    private final InstabugCustomTextPlaceHolder placeHolders;
    private static Report currentReport;
    private final ReactApplicationContext reactContext;

    /**
     * Instantiates a new Rn Instabug ReactNative module.
     *
     * @param reactContext the react context
     */
    public RNInstabugReactnativeModule(ReactApplicationContext reactContext) {
        super(reactContext);

        this.reactContext = reactContext;

        //init placeHolders
        placeHolders = new InstabugCustomTextPlaceHolder();
    }

    @Override
    public String getName() {
        return "Instabug";
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
     * Enables or disables Instabug functionality.
     *
     * @param isEnabled A boolean to enable/disable Instabug.
     */
    @ReactMethod
    public void setEnabled(final boolean isEnabled) {
        MainThreadHandler.runOnMainThread(new Runnable() {
            @Override
            public void run() {
                try {
                    if (isEnabled)
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
     *
     * @param token                 The token that identifies the app. You can find it on your dashboard.
     * @param invocationEventValues The events that invoke the SDK's UI.
     * @param logLevel              The level of detail in logs that you want to print.
     * @param codePushVersion       The Code Push version to be used for all reports.
     */
    @ReactMethod
    public void init(
            final String token,
            final ReadableArray invocationEventValues,
            final String logLevel,
            final boolean useNativeNetworkInterception,
            @Nullable final String codePushVersion
    ) {
        MainThreadHandler.runOnMainThread(new Runnable() {
            @Override
            public void run() {
                final RNTouchedViewExtractor rnTouchedViewExtractor = new RNTouchedViewExtractor();
                InstabugCore.setTouchedViewExtractorExtension(rnTouchedViewExtractor);
                final ArrayList<String> keys = ArrayUtil.parseReadableArrayOfStrings(invocationEventValues);
                final ArrayList<InstabugInvocationEvent> parsedInvocationEvents = ArgsRegistry.invocationEvents.getAll(keys);
                final InstabugInvocationEvent[] invocationEvents = parsedInvocationEvents.toArray(new InstabugInvocationEvent[0]);
                final int parsedLogLevel = ArgsRegistry.sdkLogLevels.getOrDefault(logLevel, LogLevel.ERROR);

                final Application application = (Application) reactContext.getApplicationContext();

                RNInstabug.Builder builder = new RNInstabug.Builder(application, token)
                        .setInvocationEvents(invocationEvents)
                        .setLogLevel(parsedLogLevel);

                if (codePushVersion != null) {
                    if (Instabug.isBuilt()) {
                        Instabug.setCodePushVersion(codePushVersion);
                    } else {
                        builder.setCodePushVersion(codePushVersion);
                    }
                }
                builder.build();
            }
        });
    }

    @ReactMethod
    public void setCodePushVersion(@Nullable final String version) {
        MainThreadHandler.runOnMainThread(new Runnable() {
            @Override
            public void run() {
                try {
                    Instabug.setCodePushVersion(version);
                } catch (Exception e) {
                    e.printStackTrace();
                }
            }
        });
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
    public void getTags(final Promise promise) {
        MainThreadHandler.runOnMainThread(new Runnable() {
            @Override
            public void run() {
                WritableArray tagsArray = Arguments.createArray();
                try {
                    ArrayList<String> tags = Instabug.getTags();
                    for (int i = 0; i < tags.size(); i++) {
                        tagsArray.pushString(tags.get(i));
                    }
                } catch (Exception e) {
                    e.printStackTrace();
                }
                promise.resolve(tagsArray);
            }
        });
    }

    /**
     * Set the user identity.
     * Instabug will pre-fill the user email in reports.
     *
     * @param userEmail User's default email
     * @param userName  Username.
     * @param userId    User's ID
     */
    @ReactMethod
    public void identifyUser(
            final String userEmail,
            final String userName,
            @Nullable final String userId
    ) {
        MainThreadHandler.runOnMainThread(new Runnable() {
            @Override
            public void run() {
                try {
                    // The arguments get re-ordered here to match the API signature.
                    Instabug.identifyUser(userName, userEmail, userId);
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
    public void getUserAttribute(final String key, final Promise promise) {
        MainThreadHandler.runOnMainThread(new Runnable() {
            @Override
            public void run() {
                String userAttribute = "";
                try {
                    userAttribute = Instabug.getUserAttribute(key);
                } catch (Exception e) {
                    e.printStackTrace();
                }
                promise.resolve(userAttribute);
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
    public void getAllUserAttributes(final Promise promise) {
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
                promise.resolve(writableMap);
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
                        sendEvent("IBGpreSendingHandler", reportParam);
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

    private WritableMap convertFromHashMapToWriteableMap(HashMap hashMap) {
        WritableMap writableMap = new WritableNativeMap();
        for (int i = 0; i < hashMap.size(); i++) {
            Object key = hashMap.keySet().toArray()[i];
            Object value = hashMap.get(key);
            writableMap.putString((String) key, (String) value);
        }
        return writableMap;
    }

    private static JSONObject objectToJSONObject(Object object) {
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

        for (int i = 0; i < arrayList.size(); i++) {
            Object object = arrayList.get(i);

            if (object instanceof String) {
                writableArray.pushString((String) object);
            } else {
                JSONObject jsonObject = objectToJSONObject(object);
                writableArray.pushMap((WritableMap) jsonObject);
            }
        }

        return writableArray;

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

    @ReactMethod
    public void setReproStepsConfig(final String bugMode, final String crashMode, final String sessionReplayMode) {
        MainThreadHandler.runOnMainThread(new Runnable() {
            @Override
            public void run() {
                try {
                    final Integer resolvedBugMode = ArgsRegistry.reproModes.get(bugMode);
                    final Integer resolvedCrashMode = ArgsRegistry.reproModes.get(crashMode);
                    final Integer resolvedSessionReplayMode = ArgsRegistry.reproModes.get(sessionReplayMode);

                    final ReproConfigurations config = new ReproConfigurations.Builder()
                            .setIssueMode(IssueType.Bug, resolvedBugMode)
                            .setIssueMode(IssueType.Crash, resolvedCrashMode)
                            .setIssueMode(IssueType.SessionReplay, resolvedSessionReplayMode)
                            .build();

                    Instabug.setReproConfigurations(config);
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
     *                           live, or beta.
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
     *                           live, beta or disabled.
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

    @ReactMethod
    public void show() {
        MainThreadHandler.runOnMainThread(new Runnable() {
            @Override
            public void run() {
                Instabug.show();
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

    @ReactMethod
    public void networkLogAndroid(final String url,
                                  final String requestBody,
                                  final String responseBody,
                                  final String method,
                                  final double responseCode,
                                  final String requestHeaders,
                                  final String responseHeaders,
                                  final double duration) {
        try {
            final String date = String.valueOf(System.currentTimeMillis());

            NetworkLog networkLog = new NetworkLog();
            networkLog.setDate(date);
            networkLog.setUrl(url);
            networkLog.setMethod(method);
            networkLog.setResponseCode((int) responseCode);
            networkLog.setTotalDuration((long) duration);

            try {
                networkLog.setRequest(requestBody);
                networkLog.setResponse(responseBody);
                networkLog.setRequestHeaders(requestHeaders);
                networkLog.setResponseHeaders(responseHeaders);
            } catch (OutOfMemoryError | Exception exception) {
                Log.d(TAG, "Error: " + exception.getMessage() + "while trying to set network log contents (request body, response body, request headers, and response headers).");
            }

            networkLog.insert();
        } catch (OutOfMemoryError | Exception exception) {
            Log.d(TAG, "Error: " + exception.getMessage() + "while trying to insert a network log");
        }
    }

    @UiThread
    @Nullable
    private View resolveReactView(final int reactTag) {
        final ReactApplicationContext reactContext = getReactApplicationContext();
        final UIManagerModule uiManagerModule = reactContext.getNativeModule(UIManagerModule.class);

        if (uiManagerModule == null) {
            return null;
        }

        return uiManagerModule.resolveView(reactTag);
    }


    @ReactMethod
    public void addPrivateView(final int reactTag) {
        MainThreadHandler.runOnMainThread(new Runnable() {
            @Override
            public void run() {
                try {
                    final View view = resolveReactView(reactTag);

                    Instabug.addPrivateViews(view);
                } catch (Exception e) {
                    e.printStackTrace();
                }
            }
        });
    }

    @ReactMethod
    public void removePrivateView(final int reactTag) {
        MainThreadHandler.runOnMainThread(new Runnable() {
            @Override
            public void run() {
                try {
                    final View view = resolveReactView(reactTag);

                    Instabug.removePrivateViews(view);
                } catch (Exception e) {
                    e.printStackTrace();
                }
            }
        });
    }

    /**
     * Reports that the screen name been changed (Current View).
     *
     * @param screenName string containing the screen name
     */
    @ReactMethod
    public void reportCurrentViewChange(final String screenName) {
        MainThreadHandler.runOnMainThread(new Runnable() {
            @Override
            public void run() {
                try {
                    Method method = getMethod(Class.forName("com.instabug.library.Instabug"), "reportCurrentViewChange", String.class);
                    if (method != null) {
                        method.invoke(null, screenName);
                    }
                } catch (Exception e) {
                    e.printStackTrace();
                }
            }
        });
    }

    /**
     * Reports that the screen has been changed (Repro Steps) the screen sent to this method will be the 'current view' on the dashboard
     *
     * @param screenName string containing the screen name
     */
    @ReactMethod
    public void reportScreenChange(final String screenName) {
        MainThreadHandler.runOnMainThread(new Runnable() {
            @Override
            public void run() {
                try {
                    Method method = getMethod(Class.forName("com.instabug.library.Instabug"), "reportScreenChange", Bitmap.class, String.class);
                    if (method != null) {
                        method.invoke(null, null, screenName);
                    }
                } catch (Exception e) {
                    e.printStackTrace();
                }
            }
        });
    }

    /**
     * @deprecated see {@link #addFeatureFlags(ReadableArray)}
     */
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

    /**
     * @deprecated see {@link #removeFeatureFlags(ReadableArray)}
     */
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

    /**
     * @deprecated see {@link #removeAllFeatureFlags()}
     */
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

    @ReactMethod
    public void addFeatureFlags(final ReadableMap featureFlagsMap) {
        MainThreadHandler.runOnMainThread(new Runnable() {
            @Override
            public void run() {
                try {
                    Iterator<Map.Entry<String, Object>> iterator = featureFlagsMap.getEntryIterator();
                    ArrayList<IBGFeatureFlag> featureFlags = new ArrayList<>();
                    while (iterator.hasNext()) {
                        Map.Entry<String, Object> item = iterator.next();
                        String variant = (String) item.getValue();
                        String name = item.getKey();
                        featureFlags.add(new IBGFeatureFlag(name, variant.isEmpty() ? null : variant));
                    }
                    if (!featureFlags.isEmpty()) {
                        Instabug.addFeatureFlags(featureFlags);
                    }
                } catch (Exception e) {
                    e.printStackTrace();
                }
            }
        });
    }

    @ReactMethod
    public void removeFeatureFlags(final ReadableArray featureFlags) {
        MainThreadHandler.runOnMainThread(new Runnable() {
            @Override
            public void run() {
                try {
                    ArrayList<String> stringArray = ArrayUtil.parseReadableArrayOfStrings(featureFlags);
                    Instabug.removeFeatureFlag(stringArray);
                } catch (Exception e) {
                    e.printStackTrace();
                }
            }
        });
    }

    @ReactMethod
    public void removeAllFeatureFlags() {
        MainThreadHandler.runOnMainThread(new Runnable() {
            @Override
            public void run() {
                try {
                    Instabug.removeAllFeatureFlags();
                } catch (Exception e) {
                    e.printStackTrace();
                }
            }
        });
    }

    @ReactMethod
    public void willRedirectToStore() {
        MainThreadHandler.runOnMainThread(new Runnable() {
            @Override
            public void run() {
                try {
                    Instabug.willRedirectToStore();
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
     * <p>
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

    //    private volatile NetworkLogSnapshot networkSnapshot;
    //    private final Executor executor = Executors.newSingleThreadExecutor();
//    private CountDownLatch latch;

    private final ConcurrentHashMap<Integer, OnCompleteCallback<NetworkLogSnapshot>> callbackMap = new ConcurrentHashMap<Integer, OnCompleteCallback<NetworkLogSnapshot>>();

    @ReactMethod
    public void registerNetworkLogsListener() {
        MainThreadHandler.runOnMainThread(new Runnable() {
            @Override
            public void run() {

                InternalAPM._registerNetworkLogSanitizer(new VoidSanitizer<NetworkLogSnapshot>() {
                    @Override
                    public void sanitize(NetworkLogSnapshot networkLogSnapshot, @NonNull OnCompleteCallback<NetworkLogSnapshot> onCompleteCallback) {
                        Log.w("Andrew", String.format("snapshot %s callback %s", networkLogSnapshot.getUrl(), onCompleteCallback != null));

                        final int id = networkLogSnapshot.hashCode();
                        callbackMap.put(id, onCompleteCallback);
                        WritableMap networkSnapshotParams = Arguments.createMap();
                        networkSnapshotParams.putInt("id", id);
                        networkSnapshotParams.putString("url", networkLogSnapshot.getUrl());
                        networkSnapshotParams.putInt("responseCode", networkLogSnapshot.getResponseCode());
                        sendEvent("IBGNetworkLoggerHandler", networkSnapshotParams);
                    }
                });

//                NetworkLogListener networkLogListener = new NetworkLogListener() {
//                    @androidx.annotation.Nullable
//                    @Override
//                    public NetworkLogSnapshot onNetworkLogCaptured(@NonNull NetworkLogSnapshot networkLogSnapshot) {
//                        networkSnapshot = networkLogSnapshot;
//
//                        WritableMap networkSnapshotParams = Arguments.createMap();
//                        networkSnapshotParams.putString("url", networkLogSnapshot.getUrl());
////                        final Map<String, Object> requestHeaders = networkLogSnapshot.getRequestHeaders();
////                        if (requestHeaders != null) {
////                            reportParam.putMap("requestHeaders", convertFromMapToWriteableMap(requestHeaders));
////                        }
////                        reportParam.putString("requestBody", networkLogSnapshot.getRequestBody());
////                        final Map<String, Object> responseHeaders = networkLogSnapshot.getResponseHeaders();
////                        if (responseHeaders != null) {
////                            reportParam.putMap("responseHeaders", convertFromMapToWriteableMap(responseHeaders));
////                        }
////                        reportParam.putString("response", networkLogSnapshot.getResponse());
//                        networkSnapshotParams.putInt("responseCode", networkLogSnapshot.getResponseCode());
//                        sendEvent("IBGNetworkLoggerHandler", networkSnapshotParams);
//                        Log.w("APM_Andrew", " inside callback " + Thread.currentThread().getName());
//
//                        latch = new CountDownLatch(1);
//                        try {
//                            latch.await();
//                        } catch (InterruptedException e) {
//                            e.printStackTrace();
//                        }
//                        return networkSnapshot;
//                    }
//                };
//
//                APM.registerNetworkLogsListener(networkLogListener);
            }
        });
    }

    @SuppressLint("RestrictedApi")
    @ReactMethod
    protected void updateNetworkLogSnapshot(String jsonString) throws JSONException {
        JSONObject newJSONObject = new JSONObject(jsonString);

        final Integer ID = newJSONObject.optInt("id");
        final NetworkLogSnapshot modifiedSnapshot = new NetworkLogSnapshot(
                newJSONObject.optString("url"),
                null,
                null,
                null,
                null,
                newJSONObject.optInt("responseCode")
        );

        PoolProvider.postOrderedIOTask("network_log_thread_executor", new Runnable() {
            @Override
            public void run() {
                final OnCompleteCallback<NetworkLogSnapshot> callback = callbackMap.get(ID);

                if (callback != null) {
                    callback.onComplete(modifiedSnapshot);
                }

                callbackMap.remove(ID);
            }
        });

    }
}
